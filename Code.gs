/**
 * Attendance system backend (Google Apps Script)
 * Database: Google Sheets bound to this script.
 *
 * Sheets:
 *   Users: [id, name, email, passwordHash, createdAt, role,
 *           phone, birthDate, gender, idNumber,
 *           address, hireDate, emergencyContact,
 *           bankName, bankBranch, bankAccount]
 *   Attendance: [id, userId, type, timestamp, date]
 *   Shifts:     [id, userId, userName, date, startTime, endTime, note, createdAt]
 *
 * type values:   clock_in | clock_out | break_start | break_end
 * role values:   admin | employee | parttime
 * gender values: male | female | other
 */

var USER_COLUMNS = [
  "id", "name", "email", "passwordHash", "createdAt", "role",
  "phone", "birthDate", "gender", "idNumber",
  "address", "hireDate", "emergencyContact",
  "bankName", "bankBranch", "bankAccount"
];

var TIMEZONE = "Asia/Ho_Chi_Minh"; // Vietnam timezone
var USERS_SHEET = "Users";
var ATT_SHEET = "Attendance";
var SHIFTS_SHEET = "Shifts";
var PATTERNS_SHEET = "ShiftPatterns";

// Default 3 shift patterns inserted when the sheet is first created.
// Each pattern has a stable id (P1/P2/P3) so it can be referenced.
var DEFAULT_PATTERNS = [
  ["P1", "Ca sáng / 早番", "08:00", "17:00", "#2563eb"],
  ["P2", "Ca chiều / 遅番", "13:00", "22:00", "#d97706"],
  ["P3", "Ca đêm / 夜勤",   "22:00", "06:00", "#7c3aed"],
];

// ----------------------------------------------------------------
// Web App entry point
// ----------------------------------------------------------------
function doPost(e) {
  var body = {};
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse({ success: false, message: "Invalid JSON" });
  }

  var action = body.action;
  var result;
  try {
    switch (action) {
      case "register":
        result = registerUser(body);
        break;
      case "login":
        result = loginUser(body);
        break;
      case "listUsers":
        result = listUsers(body);
        break;
      case "record":
        result = recordAttendance(body);
        break;
      case "getStatus":
        result = getStatus(body);
        break;
      case "registerShift":
        result = registerShift(body);
        break;
      case "listShifts":
        result = listShifts(body);
        break;
      case "deleteShift":
        result = deleteShift(body);
        break;
      case "getPatterns":
        result = getPatterns(body);
        break;
      case "savePatterns":
        result = savePatterns(body);
        break;
      default:
        result = { success: false, message: "Unknown action: " + action };
    }
  } catch (err) {
    result = { success: false, message: String(err) };
  }
  return jsonResponse(result);
}

function doGet() {
  return jsonResponse({ success: true, message: "Attendance API is running." });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

// ----------------------------------------------------------------
// Sheet helpers
// ----------------------------------------------------------------
function getSheet(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  var freshlyCreated = false;
  if (!sheet) {
    sheet = ss.insertSheet(name);
    freshlyCreated = true;
    if (name === USERS_SHEET) {
      sheet.appendRow(USER_COLUMNS);
      sheet.getRange(1, 1, 1, USER_COLUMNS.length).setFontWeight("bold");
    } else if (name === ATT_SHEET) {
      sheet.appendRow(["id", "userId", "type", "timestamp", "date"]);
    } else if (name === SHIFTS_SHEET) {
      sheet.appendRow(["id", "userId", "userName", "date", "startTime", "endTime", "note", "createdAt"]);
    } else if (name === PATTERNS_SHEET) {
      sheet.appendRow(["id", "name", "startTime", "endTime", "color"]);
    }
  }
  // Force text format BEFORE writing any time/date data so Sheets does not
  // auto-convert "22:00" / "06:00" etc. into Date values internally.
  if (sheet.getMaxColumns() > 0) {
    sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).setNumberFormat("@");
  }
  if (name === PATTERNS_SHEET) {
    // Insert default rows after text format is applied so the time strings
    // ("22:00" / "06:00" for the night shift) remain as plain text.
    if (freshlyCreated) {
      for (var p = 0; p < DEFAULT_PATTERNS.length; p++) {
        sheet.appendRow(DEFAULT_PATTERNS[p]);
      }
    } else if (sheet.getLastRow() < 4) {
      // Re-seed any missing default pattern rows.
      var existingIds = {};
      if (sheet.getLastRow() >= 2) {
        var ids = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();
        ids.forEach(function (r) { existingIds[String(r[0])] = true; });
      }
      DEFAULT_PATTERNS.forEach(function (p) {
        if (!existingIds[p[0]]) sheet.appendRow(p);
      });
    }
    // Self-heal: if any time cell is a Date (legacy data from before the
    // text-format fix), rewrite it as plain text in spreadsheet local time.
    healPatternTimes(sheet);
  }
  if (name === USERS_SHEET) {
    ensureUserColumns(sheet);
  }
  return sheet;
}

// Returns the spreadsheet's configured timezone (used for round-tripping
// time-only Date values that Sheets created from a text input).
function getSpreadsheetTz() {
  return SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone();
}

// Convert any Date-typed cells in the pattern sheet's time columns back to
// plain text strings so the values match exactly what registerShift saves.
function healPatternTimes(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  var range = sheet.getRange(2, 3, lastRow - 1, 2); // C: startTime, D: endTime
  var values = range.getValues();
  var changed = false;
  var tz = getSpreadsheetTz();
  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < 2; j++) {
      if (values[i][j] instanceof Date) {
        values[i][j] = Utilities.formatDate(values[i][j], tz, "HH:mm");
        changed = true;
      }
    }
  }
  if (changed) range.setValues(values);
}

// Auto-migrate existing Users sheets that are missing newer columns.
// Adds any missing columns from USER_COLUMNS while preserving existing data.
// When the legacy "role" column is added, promotes the first user to admin.
function ensureUserColumns(sheet) {
  var lastCol = sheet.getLastColumn();
  var lastRow = sheet.getLastRow();
  if (lastCol < 1) {
    sheet.appendRow(USER_COLUMNS);
    return;
  }
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

  for (var i = 0; i < USER_COLUMNS.length; i++) {
    var col = USER_COLUMNS[i];
    if (headers.indexOf(col) !== -1) continue;

    var newColIdx = sheet.getLastColumn() + 1;
    sheet.getRange(1, newColIdx).setValue(col);

    if (col === "role" && lastRow > 1) {
      // Legacy migration: promote the first existing user to admin.
      sheet.getRange(2, newColIdx).setValue("admin");
      if (lastRow > 2) {
        var values = [];
        for (var j = 0; j < lastRow - 2; j++) values.push(["employee"]);
        sheet.getRange(3, newColIdx, values.length, 1).setValues(values);
      }
    }

    headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  }
}

function findUserById(userId) {
  var sheet = getSheet(USERS_SHEET);
  var users = getAllRows(sheet);
  for (var i = 0; i < users.length; i++) {
    if (String(users[i].id) === String(userId)) {
      var u = users[i];
      if (!u.role) u.role = "user";
      return u;
    }
  }
  return null;
}

function normalizeDate(v) {
  if (v instanceof Date) {
    return Utilities.formatDate(v, TIMEZONE, "yyyy-MM-dd");
  }
  return String(v);
}

function normalizeTimestamp(v) {
  if (v instanceof Date) {
    return Utilities.formatDate(v, TIMEZONE, "yyyy-MM-dd'T'HH:mm:ssXXX");
  }
  return String(v);
}

function normalizeTime(v) {
  if (v instanceof Date) {
    // Use the spreadsheet's own timezone — a value Sheets parsed from a
    // text input like "22:00" was stored relative to that timezone, so
    // formatting back with the same TZ round-trips correctly.
    return Utilities.formatDate(v, getSpreadsheetTz(), "HH:mm");
  }
  var s = String(v);
  if (s.length >= 5 && s.charAt(2) === ":") return s.substring(0, 5);
  return s;
}

function getAllRows(sheet) {
  var values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];
  var headers = values[0];
  var rows = [];
  for (var i = 1; i < values.length; i++) {
    var row = {};
    for (var j = 0; j < headers.length; j++) {
      row[headers[j]] = values[i][j];
    }
    row._rowIndex = i + 1; // 1-based sheet row
    rows.push(row);
  }
  return rows;
}

function uuid() {
  return Utilities.getUuid();
}

function hashPassword(password) {
  var raw = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    password,
    Utilities.Charset.UTF_8
  );
  return raw
    .map(function (b) {
      var v = (b < 0 ? b + 256 : b).toString(16);
      return v.length === 1 ? "0" + v : v;
    })
    .join("");
}

function todayStr() {
  return Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd");
}

function nowIso() {
  // Store as ISO string in Vietnam timezone for clarity
  return Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd'T'HH:mm:ssXXX");
}

// ----------------------------------------------------------------
// User: register
// ----------------------------------------------------------------
function registerUser(body) {
  var name = (body.name || "").toString().trim();
  var email = (body.email || "").toString().trim().toLowerCase();
  var password = (body.password || "").toString();
  var role = (body.role || "").toString().trim();

  if (!name) return { success: false, message: "Name required" };
  if (password && password.length < 6) {
    return { success: false, message: "Password too short" };
  }

  var validRoles = ["admin", "employee", "parttime"];
  if (!role || validRoles.indexOf(role) === -1) role = "employee";

  var validGenders = ["male", "female", "other", ""];
  var gender = (body.gender || "").toString().trim();
  if (validGenders.indexOf(gender) === -1) gender = "";

  var sheet = getSheet(USERS_SHEET);
  var users = getAllRows(sheet);
  if (email) {
    for (var i = 0; i < users.length; i++) {
      if (String(users[i].email).toLowerCase() === email) {
        return { success: false, code: "EMAIL_EXISTS", message: "Email already registered" };
      }
    }
  }

  var id = uuid();
  var passwordHash = password ? hashPassword(password) : "";

  // Build row in USER_COLUMNS order so it survives any future column reordering.
  var data = {
    id: id,
    name: name,
    email: email,
    passwordHash: passwordHash,
    createdAt: nowIso(),
    role: role,
    phone: (body.phone || "").toString().trim(),
    birthDate: (body.birthDate || "").toString().trim(),
    gender: gender,
    idNumber: (body.idNumber || "").toString().trim(),
    address: (body.address || "").toString().trim(),
    hireDate: (body.hireDate || "").toString().trim(),
    emergencyContact: (body.emergencyContact || "").toString().trim(),
    bankName: (body.bankName || "").toString().trim(),
    bankBranch: (body.bankBranch || "").toString().trim(),
    bankAccount: (body.bankAccount || "").toString().trim(),
  };
  var row = USER_COLUMNS.map(function (c) { return data[c] || ""; });
  sheet.appendRow(row);

  return {
    success: true,
    user: { id: id, name: name, email: email, role: role },
  };
}

// List all registered users (for the kiosk user picker).
function listUsers(body) {
  var sheet = getSheet(USERS_SHEET);
  var users = getAllRows(sheet);
  users.sort(function (a, b) {
    var na = String(a.name || "").toLowerCase();
    var nb = String(b.name || "").toLowerCase();
    return na < nb ? -1 : na > nb ? 1 : 0;
  });
  return {
    success: true,
    users: users.map(function (u) {
      return { id: u.id, name: u.name, email: u.email };
    }),
  };
}

// ----------------------------------------------------------------
// User: login
// ----------------------------------------------------------------
function loginUser(body) {
  var email = (body.email || "").toString().trim().toLowerCase();
  var password = (body.password || "").toString();
  if (!email || !password) {
    return { success: false, message: "Missing fields" };
  }

  var sheet = getSheet(USERS_SHEET);
  var users = getAllRows(sheet);
  var hash = hashPassword(password);

  for (var i = 0; i < users.length; i++) {
    if (
      String(users[i].email).toLowerCase() === email &&
      String(users[i].passwordHash) === hash
    ) {
      return {
        success: true,
        user: {
          id: users[i].id,
          name: users[i].name,
          email: users[i].email,
          role: users[i].role || "user",
        },
      };
    }
  }
  return { success: false, message: "Invalid credentials" };
}

// ----------------------------------------------------------------
// Attendance: record + status
// ----------------------------------------------------------------
function getTodayLogs(userId) {
  var sheet = getSheet(ATT_SHEET);
  var rows = getAllRows(sheet);
  var today = todayStr();
  return rows
    .filter(function (r) {
      return (
        String(r.userId) === String(userId) &&
        normalizeDate(r.date) === today
      );
    })
    .sort(function (a, b) {
      return new Date(normalizeTimestamp(a.timestamp)) - new Date(normalizeTimestamp(b.timestamp));
    });
}

function deriveStatus(todayLogs) {
  // Returns: out | in | break | finished
  if (!todayLogs.length) return "out";
  var last = todayLogs[todayLogs.length - 1];
  switch (last.type) {
    case "clock_in":
    case "break_end":
      return "in";
    case "break_start":
      return "break";
    case "clock_out":
      return "finished";
    default:
      return "out";
  }
}

function isAllowedTransition(currentStatus, type) {
  switch (type) {
    case "clock_in":
      return currentStatus === "out";
    case "clock_out":
      return currentStatus === "in";
    case "break_start":
      return currentStatus === "in";
    case "break_end":
      return currentStatus === "break";
  }
  return false;
}

function recordAttendance(body) {
  var userId = (body.userId || "").toString();
  var type = (body.type || "").toString();
  if (!userId || !type) {
    return { success: false, message: "Missing fields" };
  }
  var allowed = ["clock_in", "clock_out", "break_start", "break_end"];
  if (allowed.indexOf(type) === -1) {
    return { success: false, message: "Invalid type" };
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var todayLogs = getTodayLogs(userId);
    var status = deriveStatus(todayLogs);
    if (!isAllowedTransition(status, type)) {
      return {
        success: false,
        code: "INVALID_STATE",
        message: "Invalid transition: " + status + " -> " + type,
        status: status,
        todayLog: todayLogs.map(stripRow),
      };
    }

    var sheet = getSheet(ATT_SHEET);
    sheet.appendRow([uuid(), userId, type, nowIso(), todayStr()]);

    var refreshed = getTodayLogs(userId);
    return {
      success: true,
      status: deriveStatus(refreshed),
      todayLog: refreshed.map(stripRow),
    };
  } finally {
    lock.releaseLock();
  }
}

function getStatus(body) {
  var userId = (body.userId || "").toString();
  if (!userId) return { success: false, message: "Missing userId" };
  var todayLogs = getTodayLogs(userId);
  return {
    success: true,
    status: deriveStatus(todayLogs),
    todayLog: todayLogs.map(stripRow),
  };
}

function stripRow(r) {
  return {
    id: r.id,
    userId: r.userId,
    type: r.type,
    timestamp: normalizeTimestamp(r.timestamp),
    date: normalizeDate(r.date),
  };
}

// ----------------------------------------------------------------
// Shifts: register / list / delete
// ----------------------------------------------------------------
function registerShift(body) {
  var userId = (body.userId || "").toString();
  var date = (body.date || "").toString();
  var startTime = (body.startTime || "").toString();
  var endTime = (body.endTime || "").toString();
  var note = (body.note || "").toString();

  if (!userId || !date || !startTime || !endTime) {
    return { success: false, message: "Missing fields" };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { success: false, message: "Invalid date" };
  }
  if (!/^\d{2}:\d{2}$/.test(startTime) || !/^\d{2}:\d{2}$/.test(endTime)) {
    return { success: false, message: "Invalid time" };
  }

  var user = findUserById(userId);
  if (!user) return { success: false, message: "User not found" };

  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var sheet = getSheet(SHIFTS_SHEET);
    sheet.appendRow([
      uuid(),
      userId,
      user.name,
      date,
      startTime,
      endTime,
      note,
      nowIso(),
    ]);
    return { success: true };
  } finally {
    lock.releaseLock();
  }
}

function listShifts(body) {
  // filterUserId is optional. If empty, returns all users' shifts.
  var filterUserId = (body.filterUserId || "").toString();
  var year = parseInt(body.year, 10);
  var month = parseInt(body.month, 10);
  var dateFrom = (body.dateFrom || "").toString(); // yyyy-MM-dd inclusive
  var dateTo = (body.dateTo || "").toString();     // yyyy-MM-dd inclusive

  var sheet = getSheet(SHIFTS_SHEET);
  var rows = getAllRows(sheet);

  var prefix = "";
  if (year && month) {
    var mm = month < 10 ? "0" + month : "" + month;
    prefix = year + "-" + mm;
  }

  var filtered = rows.filter(function (r) {
    var d = normalizeDate(r.date);
    if (prefix && d.indexOf(prefix) !== 0) return false;
    if (dateFrom && d < dateFrom) return false;
    if (dateTo && d > dateTo) return false;
    if (filterUserId && String(r.userId) !== filterUserId) return false;
    return true;
  });

  filtered.sort(function (a, b) {
    var da = normalizeDate(a.date);
    var db = normalizeDate(b.date);
    if (da !== db) return da < db ? -1 : 1;
    var sa = normalizeTime(a.startTime);
    var sb = normalizeTime(b.startTime);
    return sa < sb ? -1 : sa > sb ? 1 : 0;
  });

  return {
    success: true,
    shifts: filtered.map(function (r) {
      return {
        id: r.id,
        userId: r.userId,
        userName: r.userName,
        date: normalizeDate(r.date),
        startTime: normalizeTime(r.startTime),
        endTime: normalizeTime(r.endTime),
        note: r.note,
      };
    }),
  };
}

function deleteShift(body) {
  // Kiosk mode: any operator can delete any shift entry.
  var shiftId = (body.shiftId || "").toString();
  if (!shiftId) return { success: false, message: "Missing fields" };

  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var sheet = getSheet(SHIFTS_SHEET);
    var rows = getAllRows(sheet);
    for (var i = 0; i < rows.length; i++) {
      if (String(rows[i].id) === String(shiftId)) {
        sheet.deleteRow(rows[i]._rowIndex);
        return { success: true };
      }
    }
    return { success: false, message: "Shift not found" };
  } finally {
    lock.releaseLock();
  }
}

// ----------------------------------------------------------------
// Shift patterns: 3 fixed slots (P1, P2, P3)
// ----------------------------------------------------------------
function getPatterns(body) {
  var sheet = getSheet(PATTERNS_SHEET);
  var rows = getAllRows(sheet);
  var byId = {};
  rows.forEach(function (r) { byId[String(r.id)] = r; });

  var patterns = DEFAULT_PATTERNS.map(function (def) {
    var existing = byId[def[0]];
    return {
      id: def[0],
      name: existing ? existing.name : def[1],
      startTime: normalizeTime(existing ? existing.startTime : def[2]),
      endTime: normalizeTime(existing ? existing.endTime : def[3]),
      color: existing ? existing.color : def[4],
    };
  });
  return { success: true, patterns: patterns };
}

function savePatterns(body) {
  var input = body.patterns;
  if (!input || !input.length) {
    return { success: false, message: "Missing patterns" };
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var sheet = getSheet(PATTERNS_SHEET);
    var rows = getAllRows(sheet);
    var rowByPid = {};
    rows.forEach(function (r) { rowByPid[String(r.id)] = r; });

    // Build a lookup of submitted patterns keyed by id for safe matching.
    var byId = {};
    input.forEach(function (p) { if (p && p.id) byId[String(p.id)] = p; });

    DEFAULT_PATTERNS.forEach(function (def, i) {
      var pid = def[0];
      var p = byId[pid];
      if (!p) return;
      var name = (p.name || "").toString().trim() || def[1];
      var startTime = (p.startTime || "").toString().trim() || def[2];
      var endTime = (p.endTime || "").toString().trim() || def[3];
      var color = (p.color || "").toString().trim() || def[4];

      var rowData = [pid, name, startTime, endTime, color];
      var existing = rowByPid[pid];
      if (existing) {
        sheet.getRange(existing._rowIndex, 1, 1, rowData.length).setValues([rowData]);
      } else {
        sheet.appendRow(rowData);
      }
    });
    return { success: true };
  } finally {
    lock.releaseLock();
  }
}
