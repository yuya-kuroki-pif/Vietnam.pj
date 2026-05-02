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
  "bankName", "bankBranch", "bankAccount",
  "hourlyRate", "store"
];

var TIMEZONE = "Asia/Ho_Chi_Minh"; // Vietnam timezone
var USERS_SHEET = "Users";
var ATT_SHEET = "Attendance";
var SHIFTS_SHEET = "Shifts";
var PATTERNS_SHEET = "ShiftPatterns";
var PURCHASES_SHEET = "Purchases";
var PETTY_SHEET = "PettyCash";
var STORES_SHEET = "Stores";
var VENDORS_SHEET = "Vendors";
var DAILY_SALES_SHEET = "DailySales";
var MONTHLY_TARGETS_SHEET = "MonthlyTargets";

var PURCHASE_COLUMNS = [
  "id", "store", "date", "vendor", "productName", "specification",
  "category", "unitPrice", "quantity", "taxRate", "paymentMethod",
  "method", "note", "createdAt"
];

var PETTY_COLUMNS = [
  "id", "store", "date", "type", "category", "subCategory",
  "amount", "taxRate", "paymentMethod", "vendor", "taxCode", "note", "createdAt"
];

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
      case "listPurchases":
        result = listPurchases(body);
        break;
      case "registerPurchase":
        result = registerPurchase(body);
        break;
      case "deletePurchase":
        result = deletePurchase(body);
        break;
      case "listPettyCash":
        result = listPettyCash(body);
        break;
      case "registerPettyCash":
        result = registerPettyCash(body);
        break;
      case "deletePettyCash":
        result = deletePettyCash(body);
        break;
      case "listStores":
        result = listStores(body);
        break;
      case "listVendors":
        result = listVendors(body);
        break;
      case "listStoreMaster":
        result = listStoreMaster(body);
        break;
      case "registerStore":
        result = registerStore(body);
        break;
      case "deleteStore":
        result = deleteStore(body);
        break;
      case "listVendorMaster":
        result = listVendorMaster(body);
        break;
      case "registerVendor":
        result = registerVendor(body);
        break;
      case "deleteVendor":
        result = deleteVendor(body);
        break;
      case "listDailySales":
        result = listDailySales(body);
        break;
      case "upsertDailySales":
        result = upsertDailySales(body);
        break;
      case "deleteDailySales":
        result = deleteDailySales(body);
        break;
      case "getMonthlyTarget":
        result = getMonthlyTarget(body);
        break;
      case "upsertMonthlyTarget":
        result = upsertMonthlyTarget(body);
        break;
      case "updateMonthlyLaborCost":
        result = updateMonthlyLaborCost(body);
        break;
      case "getDashboard":
        result = getDashboard(body);
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
    } else if (name === PURCHASES_SHEET) {
      sheet.appendRow(PURCHASE_COLUMNS);
    } else if (name === PETTY_SHEET) {
      sheet.appendRow(PETTY_COLUMNS);
    } else if (name === STORES_SHEET) {
      sheet.appendRow(["id", "name", "address", "phone", "note", "createdAt"]);
    } else if (name === VENDORS_SHEET) {
      sheet.appendRow(["id", "name", "taxCode", "address", "phone", "note", "createdAt"]);
    } else if (name === DAILY_SALES_SHEET) {
      sheet.appendRow([
        "id", "store", "date", "foodSales", "drinkSales", "otherSales",
        "customers", "note", "createdAt"
      ]);
    } else if (name === MONTHLY_TARGETS_SHEET) {
      sheet.appendRow([
        "id", "store", "yearMonth",
        "foodSalesTarget", "drinkSalesTarget", "otherSalesTarget",
        "foodCostRatioTarget", "drinkCostRatioTarget", "laborCostRatioTarget",
        "monthlyLaborCost", "note", "createdAt"
      ]);
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
  if (name === PURCHASES_SHEET) {
    ensureColumns(sheet, PURCHASE_COLUMNS);
  }
  if (name === PETTY_SHEET) {
    ensureColumns(sheet, PETTY_COLUMNS);
  }
  return sheet;
}

// Generic column migration: add any header from `expected` that is missing.
// Existing data rows keep their values; the new column is appended at the right.
function ensureColumns(sheet, expected) {
  var lastCol = sheet.getLastColumn();
  if (lastCol < 1) {
    sheet.appendRow(expected);
    return;
  }
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  for (var i = 0; i < expected.length; i++) {
    if (headers.indexOf(expected[i]) !== -1) continue;
    var newColIdx = sheet.getLastColumn() + 1;
    sheet.getRange(1, newColIdx).setValue(expected[i]);
    headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  }
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
    hourlyRate: _toNum(body.hourlyRate),
    store: (body.store || "").toString().trim(),
  };
  var row = USER_COLUMNS.map(function (c) { return data[c] !== undefined && data[c] !== "" ? data[c] : ""; });
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

// ----------------------------------------------------------------
// Transactions: Purchases (仕入れ) and PettyCash (小口現金)
// ----------------------------------------------------------------
function _toNum(v) {
  if (v === null || v === undefined || v === "") return 0;
  var n = parseFloat(String(v).replace(/[^\d.\-]/g, ""));
  return isNaN(n) ? 0 : n;
}

function listPurchases(body) {
  var store = (body.store || "").toString();
  var dateFrom = (body.dateFrom || "").toString();
  var dateTo = (body.dateTo || "").toString();

  var sheet = getSheet(PURCHASES_SHEET);
  var rows = getAllRows(sheet);

  var filtered = rows.filter(function (r) {
    var d = normalizeDate(r.date);
    if (store && String(r.store) !== store) return false;
    if (dateFrom && d < dateFrom) return false;
    if (dateTo && d > dateTo) return false;
    return true;
  });

  filtered.sort(function (a, b) {
    var da = normalizeDate(a.date);
    var db = normalizeDate(b.date);
    return da < db ? 1 : da > db ? -1 : 0; // newest first
  });

  return {
    success: true,
    purchases: filtered.map(function (r) {
      return {
        id: r.id,
        store: r.store,
        date: normalizeDate(r.date),
        vendor: r.vendor,
        productName: r.productName,
        specification: r.specification,
        category: r.category,
        unitPrice: _toNum(r.unitPrice),
        quantity: _toNum(r.quantity),
        taxRate: _toNum(r.taxRate),
        paymentMethod: r.paymentMethod || "",
        method: r.method || "manual",
        note: r.note,
      };
    }),
  };
}

function registerPurchase(body) {
  var date = (body.date || "").toString();
  var store = (body.store || "").toString().trim();
  var vendor = (body.vendor || "").toString().trim();
  var productName = (body.productName || "").toString().trim();
  if (!date || !store || !productName) {
    return { success: false, message: "Missing required fields" };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { success: false, message: "Invalid date" };
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var sheet = getSheet(PURCHASES_SHEET);
    var data = {
      id: uuid(),
      store: store,
      date: date,
      vendor: vendor,
      productName: productName,
      specification: (body.specification || "").toString(),
      category: (body.category || "").toString(),
      unitPrice: _toNum(body.unitPrice),
      quantity: _toNum(body.quantity),
      taxRate: _toNum(body.taxRate),
      paymentMethod: (body.paymentMethod || "").toString(),
      method: (body.method || "manual").toString(),
      note: (body.note || "").toString(),
      createdAt: nowIso(),
    };
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = headers.map(function (h) { return data[h] !== undefined ? data[h] : ""; });
    sheet.appendRow(row);
    _ensureInMaster(STORES_SHEET, store);
    if (vendor) _ensureInMaster(VENDORS_SHEET, vendor);
    return { success: true };
  } finally {
    lock.releaseLock();
  }
}

function deletePurchase(body) {
  var id = (body.id || "").toString();
  if (!id) return { success: false, message: "Missing id" };
  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var sheet = getSheet(PURCHASES_SHEET);
    var rows = getAllRows(sheet);
    for (var i = 0; i < rows.length; i++) {
      if (String(rows[i].id) === id) {
        sheet.deleteRow(rows[i]._rowIndex);
        return { success: true };
      }
    }
    return { success: false, message: "Not found" };
  } finally {
    lock.releaseLock();
  }
}

function listPettyCash(body) {
  var store = (body.store || "").toString();
  var year = parseInt(body.year, 10);
  var month = parseInt(body.month, 10);

  var sheet = getSheet(PETTY_SHEET);
  var rows = getAllRows(sheet);

  var prefix = "";
  if (year && month) {
    var mm = month < 10 ? "0" + month : "" + month;
    prefix = year + "-" + mm;
  }

  var filtered = rows.filter(function (r) {
    var d = normalizeDate(r.date);
    if (store && String(r.store) !== store) return false;
    if (prefix && d.indexOf(prefix) !== 0) return false;
    return true;
  });

  filtered.sort(function (a, b) {
    var da = normalizeDate(a.date);
    var db = normalizeDate(b.date);
    return da < db ? -1 : da > db ? 1 : 0;
  });

  // Compute running balance
  var balance = 0;
  var items = filtered.map(function (r) {
    var amount = _toNum(r.amount);
    var type = String(r.type || "out");
    if (type === "in") balance += amount;
    else balance -= amount;
    return {
      id: r.id,
      store: r.store,
      date: normalizeDate(r.date),
      type: type,
      category: r.category,
      subCategory: r.subCategory,
      amount: amount,
      taxRate: _toNum(r.taxRate),
      paymentMethod: r.paymentMethod || "",
      vendor: r.vendor,
      taxCode: r.taxCode,
      note: r.note,
      balance: balance,
    };
  });

  return { success: true, items: items, balance: balance };
}

function registerPettyCash(body) {
  var date = (body.date || "").toString();
  var store = (body.store || "").toString().trim();
  var type = (body.type || "out").toString();
  var category = (body.category || "").toString().trim();
  var amount = _toNum(body.amount);

  if (!date || !store || !category) {
    return { success: false, message: "Missing required fields" };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { success: false, message: "Invalid date" };
  }
  if (type !== "in" && type !== "out") type = "out";

  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var sheet = getSheet(PETTY_SHEET);
    var vendorName = (body.vendor || "").toString();
    var data = {
      id: uuid(),
      store: store,
      date: date,
      type: type,
      category: category,
      subCategory: (body.subCategory || "").toString(),
      amount: amount,
      taxRate: _toNum(body.taxRate),
      paymentMethod: (body.paymentMethod || "").toString(),
      vendor: vendorName,
      taxCode: (body.taxCode || "").toString(),
      note: (body.note || "").toString(),
      createdAt: nowIso(),
    };
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = headers.map(function (h) { return data[h] !== undefined ? data[h] : ""; });
    sheet.appendRow(row);
    _ensureInMaster(STORES_SHEET, store);
    if (vendorName.trim()) _ensureInMaster(VENDORS_SHEET, vendorName.trim());
    return { success: true };
  } finally {
    lock.releaseLock();
  }
}

function deletePettyCash(body) {
  var id = (body.id || "").toString();
  if (!id) return { success: false, message: "Missing id" };
  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var sheet = getSheet(PETTY_SHEET);
    var rows = getAllRows(sheet);
    for (var i = 0; i < rows.length; i++) {
      if (String(rows[i].id) === id) {
        sheet.deleteRow(rows[i]._rowIndex);
        return { success: true };
      }
    }
    return { success: false, message: "Not found" };
  } finally {
    lock.releaseLock();
  }
}

// Returns store names from the master sheet (sorted alphabetically).
// Used by transaction screen to populate dropdowns/datalists.
function listStores(body) {
  var rows = getAllRows(getSheet(STORES_SHEET));
  var names = rows.map(function (r) { return String(r.name || "").trim(); })
                  .filter(function (n) { return n; });
  names.sort();
  return { success: true, stores: names };
}

function listVendors(body) {
  var rows = getAllRows(getSheet(VENDORS_SHEET));
  var names = rows.map(function (r) { return String(r.name || "").trim(); })
                  .filter(function (n) { return n; });
  names.sort();
  return { success: true, vendors: names };
}

// ----------------------------------------------------------------
// Master CRUD: Stores
// ----------------------------------------------------------------
function listStoreMaster(body) {
  var rows = getAllRows(getSheet(STORES_SHEET));
  rows.sort(function (a, b) {
    return String(a.name || "").localeCompare(String(b.name || ""));
  });
  return {
    success: true,
    stores: rows.map(function (r) {
      return {
        id: r.id,
        name: r.name,
        address: r.address,
        phone: r.phone,
        note: r.note,
      };
    }),
  };
}

function registerStore(body) {
  var name = (body.name || "").toString().trim();
  if (!name) return { success: false, message: "Name required" };

  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var sheet = getSheet(STORES_SHEET);
    var rows = getAllRows(sheet);
    var lower = name.toLowerCase();
    if (rows.some(function (r) { return String(r.name || "").trim().toLowerCase() === lower; })) {
      return { success: false, code: "DUPLICATE", message: "Store already exists" };
    }
    sheet.appendRow([
      uuid(),
      name,
      (body.address || "").toString(),
      (body.phone || "").toString(),
      (body.note || "").toString(),
      nowIso(),
    ]);
    return { success: true };
  } finally {
    lock.releaseLock();
  }
}

function deleteStore(body) {
  return _deleteFromSheet(STORES_SHEET, (body.id || "").toString());
}

// ----------------------------------------------------------------
// Master CRUD: Vendors
// ----------------------------------------------------------------
function listVendorMaster(body) {
  var rows = getAllRows(getSheet(VENDORS_SHEET));
  rows.sort(function (a, b) {
    return String(a.name || "").localeCompare(String(b.name || ""));
  });
  return {
    success: true,
    vendors: rows.map(function (r) {
      return {
        id: r.id,
        name: r.name,
        taxCode: r.taxCode,
        address: r.address,
        phone: r.phone,
        note: r.note,
      };
    }),
  };
}

function registerVendor(body) {
  var name = (body.name || "").toString().trim();
  if (!name) return { success: false, message: "Name required" };

  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var sheet = getSheet(VENDORS_SHEET);
    var rows = getAllRows(sheet);
    var lower = name.toLowerCase();
    if (rows.some(function (r) { return String(r.name || "").trim().toLowerCase() === lower; })) {
      return { success: false, code: "DUPLICATE", message: "Vendor already exists" };
    }
    sheet.appendRow([
      uuid(),
      name,
      (body.taxCode || "").toString(),
      (body.address || "").toString(),
      (body.phone || "").toString(),
      (body.note || "").toString(),
      nowIso(),
    ]);
    return { success: true };
  } finally {
    lock.releaseLock();
  }
}

function deleteVendor(body) {
  return _deleteFromSheet(VENDORS_SHEET, (body.id || "").toString());
}

function _deleteFromSheet(sheetName, id) {
  if (!id) return { success: false, message: "Missing id" };
  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var sheet = getSheet(sheetName);
    var rows = getAllRows(sheet);
    for (var i = 0; i < rows.length; i++) {
      if (String(rows[i].id) === id) {
        sheet.deleteRow(rows[i]._rowIndex);
        return { success: true };
      }
    }
    return { success: false, message: "Not found" };
  } finally {
    lock.releaseLock();
  }
}

// ----------------------------------------------------------------
// Dashboard: Daily sales + Monthly targets + aggregated KPIs
// ----------------------------------------------------------------
function listDailySales(body) {
  var store = (body.store || "").toString();
  var year = parseInt(body.year, 10);
  var month = parseInt(body.month, 10);
  if (!store || !year || !month) return { success: false, message: "Missing fields" };

  var prefix = year + "-" + (month < 10 ? "0" + month : "" + month);
  var rows = getAllRows(getSheet(DAILY_SALES_SHEET));
  var filtered = rows.filter(function (r) {
    return String(r.store) === store && normalizeDate(r.date).indexOf(prefix) === 0;
  });
  filtered.sort(function (a, b) {
    var da = normalizeDate(a.date), db = normalizeDate(b.date);
    return da < db ? 1 : da > db ? -1 : 0;
  });
  return {
    success: true,
    items: filtered.map(function (r) {
      return {
        id: r.id,
        store: r.store,
        date: normalizeDate(r.date),
        foodSales: _toNum(r.foodSales),
        drinkSales: _toNum(r.drinkSales),
        otherSales: _toNum(r.otherSales),
        customers: _toNum(r.customers),
        note: r.note,
      };
    }),
  };
}

// Upsert: if an entry for the same (store, date) exists, replace it.
function upsertDailySales(body) {
  var store = (body.store || "").toString().trim();
  var date = (body.date || "").toString();
  if (!store || !date) return { success: false, message: "Missing fields" };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { success: false, message: "Invalid date" };

  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var sheet = getSheet(DAILY_SALES_SHEET);
    var rows = getAllRows(sheet);
    var existing = null;
    for (var i = 0; i < rows.length; i++) {
      if (String(rows[i].store) === store && normalizeDate(rows[i].date) === date) {
        existing = rows[i];
        break;
      }
    }

    var data = {
      id: existing ? existing.id : uuid(),
      store: store,
      date: date,
      foodSales: _toNum(body.foodSales),
      drinkSales: _toNum(body.drinkSales),
      otherSales: _toNum(body.otherSales),
      customers: _toNum(body.customers),
      note: (body.note || "").toString(),
      createdAt: existing ? existing.createdAt : nowIso(),
    };
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = headers.map(function (h) { return data[h] !== undefined ? data[h] : ""; });
    if (existing) {
      sheet.getRange(existing._rowIndex, 1, 1, row.length).setValues([row]);
    } else {
      sheet.appendRow(row);
    }
    return { success: true };
  } finally {
    lock.releaseLock();
  }
}

function deleteDailySales(body) {
  return _deleteFromSheet(DAILY_SALES_SHEET, (body.id || "").toString());
}

function getMonthlyTarget(body) {
  var store = (body.store || "").toString();
  var yearMonth = (body.yearMonth || "").toString();
  if (!store || !yearMonth) return { success: false, message: "Missing fields" };

  var rows = getAllRows(getSheet(MONTHLY_TARGETS_SHEET));
  var found = null;
  for (var i = 0; i < rows.length; i++) {
    if (String(rows[i].store) === store && String(rows[i].yearMonth) === yearMonth) {
      found = rows[i];
      break;
    }
  }
  if (!found) {
    return { success: true, target: null };
  }
  return {
    success: true,
    target: {
      id: found.id,
      store: found.store,
      yearMonth: found.yearMonth,
      foodSalesTarget: _toNum(found.foodSalesTarget),
      drinkSalesTarget: _toNum(found.drinkSalesTarget),
      otherSalesTarget: _toNum(found.otherSalesTarget),
      foodCostRatioTarget: _toNum(found.foodCostRatioTarget),
      drinkCostRatioTarget: _toNum(found.drinkCostRatioTarget),
      laborCostRatioTarget: _toNum(found.laborCostRatioTarget),
      monthlyLaborCost: _toNum(found.monthlyLaborCost),
      note: found.note,
    },
  };
}

function upsertMonthlyTarget(body) {
  var store = (body.store || "").toString().trim();
  var yearMonth = (body.yearMonth || "").toString();
  if (!store || !yearMonth) return { success: false, message: "Missing fields" };
  if (!/^\d{4}-\d{2}$/.test(yearMonth)) return { success: false, message: "Invalid yearMonth" };

  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var sheet = getSheet(MONTHLY_TARGETS_SHEET);
    var rows = getAllRows(sheet);
    var existing = null;
    for (var i = 0; i < rows.length; i++) {
      if (String(rows[i].store) === store && String(rows[i].yearMonth) === yearMonth) {
        existing = rows[i];
        break;
      }
    }

    // Preserve existing monthlyLaborCost if the caller didn't include it —
    // the dashboard now edits this field via a dedicated endpoint, so the
    // monthly-target modal must not wipe it.
    var hasLaborInBody = Object.prototype.hasOwnProperty.call(body, "monthlyLaborCost") &&
                         body.monthlyLaborCost !== "" && body.monthlyLaborCost !== null &&
                         body.monthlyLaborCost !== undefined;
    var preservedLaborCost = hasLaborInBody
      ? _toNum(body.monthlyLaborCost)
      : (existing ? _toNum(existing.monthlyLaborCost) : 0);

    var data = {
      id: existing ? existing.id : uuid(),
      store: store,
      yearMonth: yearMonth,
      foodSalesTarget: _toNum(body.foodSalesTarget),
      drinkSalesTarget: _toNum(body.drinkSalesTarget),
      otherSalesTarget: _toNum(body.otherSalesTarget),
      foodCostRatioTarget: _toNum(body.foodCostRatioTarget),
      drinkCostRatioTarget: _toNum(body.drinkCostRatioTarget),
      laborCostRatioTarget: _toNum(body.laborCostRatioTarget),
      monthlyLaborCost: preservedLaborCost,
      note: (body.note || "").toString(),
      createdAt: existing ? existing.createdAt : nowIso(),
    };
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = headers.map(function (h) { return data[h] !== undefined ? data[h] : ""; });
    if (existing) {
      sheet.getRange(existing._rowIndex, 1, 1, row.length).setValues([row]);
    } else {
      sheet.appendRow(row);
    }
    return { success: true };
  } finally {
    lock.releaseLock();
  }
}

// Update only the monthlyLaborCost cell for a (store, yearMonth). Creates a
// minimal row if no MonthlyTargets entry exists yet for that combination.
function updateMonthlyLaborCost(body) {
  var store = (body.store || "").toString().trim();
  var yearMonth = (body.yearMonth || "").toString();
  var amount = _toNum(body.monthlyLaborCost);
  if (!store || !yearMonth) return { success: false, message: "Missing fields" };
  if (!/^\d{4}-\d{2}$/.test(yearMonth)) return { success: false, message: "Invalid yearMonth" };

  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var sheet = getSheet(MONTHLY_TARGETS_SHEET);
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var laborColIdx = headers.indexOf("monthlyLaborCost");
    if (laborColIdx < 0) return { success: false, message: "monthlyLaborCost column missing" };

    var rows = getAllRows(sheet);
    for (var i = 0; i < rows.length; i++) {
      if (String(rows[i].store) === store && String(rows[i].yearMonth) === yearMonth) {
        sheet.getRange(rows[i]._rowIndex, laborColIdx + 1).setValue(amount);
        return { success: true };
      }
    }
    // No row yet — append a minimal one
    var data = {
      id: uuid(),
      store: store,
      yearMonth: yearMonth,
      monthlyLaborCost: amount,
      createdAt: nowIso(),
    };
    var row = headers.map(function (h) { return data[h] !== undefined ? data[h] : ""; });
    sheet.appendRow(row);
    return { success: true };
  } finally {
    lock.releaseLock();
  }
}

// Aggregate dashboard KPIs for a (store, year, month).
// Reads DailySales, Purchases, MonthlyTargets and returns derived metrics.
function getDashboard(body) {
  var store = (body.store || "").toString();
  var year = parseInt(body.year, 10);
  var month = parseInt(body.month, 10);
  if (!store || !year || !month) return { success: false, message: "Missing fields" };

  var yearMonth = year + "-" + (month < 10 ? "0" + month : "" + month);

  // Sales (from DailySales)
  var dailyRows = getAllRows(getSheet(DAILY_SALES_SHEET));
  var monthlyDaily = dailyRows.filter(function (r) {
    return String(r.store) === store && normalizeDate(r.date).indexOf(yearMonth) === 0;
  });
  var foodSales = 0, drinkSales = 0, otherSales = 0, customers = 0;
  monthlyDaily.forEach(function (r) {
    foodSales += _toNum(r.foodSales);
    drinkSales += _toNum(r.drinkSales);
    otherSales += _toNum(r.otherSales);
    customers += _toNum(r.customers);
  });
  var totalSales = foodSales + drinkSales + otherSales;

  // Purchases (cost) for the same store + month, by category
  var purchaseRows = getAllRows(getSheet(PURCHASES_SHEET));
  var monthlyPurchases = purchaseRows.filter(function (r) {
    return String(r.store) === store && normalizeDate(r.date).indexOf(yearMonth) === 0;
  });
  var foodCost = 0, drinkCost = 0, otherCost = 0;
  monthlyPurchases.forEach(function (r) {
    var amt = _toNum(r.unitPrice) * _toNum(r.quantity) * (1 + _toNum(r.taxRate) / 100);
    var cat = String(r.category || "");
    if (cat === "food") foodCost += amt;
    else if (cat === "drink") drinkCost += amt;
    else otherCost += amt;
  });
  var totalCost = foodCost + drinkCost + otherCost;

  // Monthly targets / manual labor cost
  var targetRows = getAllRows(getSheet(MONTHLY_TARGETS_SHEET));
  var target = null;
  for (var i = 0; i < targetRows.length; i++) {
    if (String(targetRows[i].store) === store && String(targetRows[i].yearMonth) === yearMonth) {
      target = targetRows[i];
      break;
    }
  }
  var foodSalesTarget = target ? _toNum(target.foodSalesTarget) : 0;
  var drinkSalesTarget = target ? _toNum(target.drinkSalesTarget) : 0;
  var otherSalesTarget = target ? _toNum(target.otherSalesTarget) : 0;
  var salesTarget = foodSalesTarget + drinkSalesTarget + otherSalesTarget;
  var foodCostRatioTarget = target ? _toNum(target.foodCostRatioTarget) : 0;
  var drinkCostRatioTarget = target ? _toNum(target.drinkCostRatioTarget) : 0;
  var laborCostRatioTarget = target ? _toNum(target.laborCostRatioTarget) : 0;
  var otherLaborCost = target ? _toNum(target.monthlyLaborCost) : 0;

  // Attendance-derived labor cost (uses each user's hourlyRate and store)
  var attLabor = calcAttendanceLaborCost(store, year, month);
  var totalLaborCost = otherLaborCost + attLabor.cost;

  // Days for "todayDay" pace calculation
  var now = new Date();
  var nowYM = Utilities.formatDate(now, getSpreadsheetTz(), "yyyy-MM");
  var daysInMonth = new Date(year, month, 0).getDate();
  var todayDay;
  if (nowYM === yearMonth) {
    todayDay = now.getDate();
  } else if (nowYM > yearMonth) {
    todayDay = daysInMonth;
  } else {
    todayDay = 0;
  }
  var expectedToToday = salesTarget * (daysInMonth > 0 ? todayDay / daysInMonth : 0);

  var profit = totalSales - totalCost - totalLaborCost;

  return {
    success: true,
    yearMonth: yearMonth,
    daysInMonth: daysInMonth,
    todayDay: todayDay,
    sales: {
      total: totalSales,
      food: foodSales,
      drink: drinkSales,
      other: otherSales,
      customers: customers,
      avgPerCustomer: customers > 0 ? totalSales / customers : 0,
    },
    cost: {
      total: totalCost,
      food: foodCost,
      drink: drinkCost,
      other: otherCost,
      foodRatio: foodSales > 0 ? foodCost / foodSales : 0,
      drinkRatio: drinkSales > 0 ? drinkCost / drinkSales : 0,
      totalRatio: totalSales > 0 ? totalCost / totalSales : 0,
    },
    target: {
      sales: salesTarget,
      foodSales: foodSalesTarget,
      drinkSales: drinkSalesTarget,
      otherSales: otherSalesTarget,
      foodCostRatio: foodCostRatioTarget,
      drinkCostRatio: drinkCostRatioTarget,
      laborCostRatio: laborCostRatioTarget,
    },
    labor: {
      cost: totalLaborCost,
      ratio: totalSales > 0 ? totalLaborCost / totalSales : 0,
      attendance: {
        cost: attLabor.cost,
        hours: attLabor.hours,
        ratio: totalSales > 0 ? attLabor.cost / totalSales : 0,
      },
      other: {
        cost: otherLaborCost,
        ratio: totalSales > 0 ? otherLaborCost / totalSales : 0,
      },
      salesPerHour: attLabor.hours > 0 ? totalSales / attLabor.hours : 0,
    },
    profit: {
      amount: profit,
      ratio: totalSales > 0 ? profit / totalSales : 0,
    },
    achievement: {
      monthlyProgress: salesTarget > 0 ? totalSales / salesTarget : 0,
      todayPace: expectedToToday > 0 ? totalSales / expectedToToday : 0,
    },
  };
}

// Sum attendance-based labor cost for a given store + month.
// For each user belonging to that store, walk their daily clock_in / clock_out
// (subtracting break_start..break_end intervals) and multiply by hourlyRate.
function calcAttendanceLaborCost(store, year, month) {
  var prefix = year + "-" + (month < 10 ? "0" + month : "" + month);

  // Build a map of store-belonging users with their hourly rate
  var userRows = getAllRows(getSheet(USERS_SHEET));
  var userMap = {};
  userRows.forEach(function (u) {
    if (String(u.store || "").trim() === store) {
      userMap[String(u.id)] = {
        name: u.name,
        hourlyRate: _toNum(u.hourlyRate),
      };
    }
  });

  // Collect attendance events for those users in the target month
  var attRows = getAllRows(getSheet(ATT_SHEET));
  var byUserDate = {};
  attRows.forEach(function (r) {
    var uid = String(r.userId);
    if (!userMap[uid]) return;
    var d = normalizeDate(r.date);
    if (d.indexOf(prefix) !== 0) return;
    var key = uid + "|" + d;
    if (!byUserDate[key]) byUserDate[key] = [];
    byUserDate[key].push({
      type: String(r.type),
      ts: new Date(normalizeTimestamp(r.timestamp)),
    });
  });

  var totalCost = 0;
  var totalMinutes = 0;
  Object.keys(byUserDate).forEach(function (key) {
    var uid = key.split("|")[0];
    var rate = userMap[uid].hourlyRate;
    var events = byUserDate[key].sort(function (a, b) { return a.ts - b.ts; });

    var minutes = 0;
    var clockIn = null, breakStart = null;
    for (var i = 0; i < events.length; i++) {
      var e = events[i];
      if (e.type === "clock_in") {
        clockIn = e.ts;
      } else if (e.type === "clock_out" && clockIn) {
        minutes += (e.ts - clockIn) / 60000;
        clockIn = null;
      } else if (e.type === "break_start") {
        breakStart = e.ts;
      } else if (e.type === "break_end" && breakStart) {
        minutes -= (e.ts - breakStart) / 60000;
        breakStart = null;
      }
    }
    if (minutes < 0) minutes = 0;
    totalMinutes += minutes;
    totalCost += (minutes / 60) * rate;
  });

  return {
    cost: Math.round(totalCost),
    hours: totalMinutes / 60,
  };
}

// Auto-add a name to master if it's not already registered. Called from
// registerPurchase / registerPettyCash so anything typed in the transaction
// form is captured for future autocomplete.
function _ensureInMaster(sheetName, name) {
  if (!name) return;
  var sheet = getSheet(sheetName);
  var rows = getAllRows(sheet);
  var lower = String(name).trim().toLowerCase();
  if (rows.some(function (r) { return String(r.name || "").trim().toLowerCase() === lower; })) return;
  if (sheetName === STORES_SHEET) {
    sheet.appendRow([uuid(), name, "", "", "", nowIso()]);
  } else if (sheetName === VENDORS_SHEET) {
    sheet.appendRow([uuid(), name, "", "", "", "", nowIso()]);
  }
}
