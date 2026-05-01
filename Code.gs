/**
 * Attendance system backend (Google Apps Script)
 * Database: Google Sheets bound to this script.
 *
 * Sheets:
 *   Users:      [id, name, email, passwordHash, createdAt]
 *   Attendance: [id, userId, type, timestamp, date]
 *
 * type values: clock_in | clock_out | break_start | break_end
 */

var TIMEZONE = "Asia/Ho_Chi_Minh"; // Vietnam timezone
var USERS_SHEET = "Users";
var ATT_SHEET = "Attendance";

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
      case "record":
        result = recordAttendance(body);
        break;
      case "getStatus":
        result = getStatus(body);
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
  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (name === USERS_SHEET) {
      sheet.appendRow(["id", "name", "email", "passwordHash", "createdAt"]);
    } else if (name === ATT_SHEET) {
      sheet.appendRow(["id", "userId", "type", "timestamp", "date"]);
    }
  }
  return sheet;
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

  if (!name || !email || !password) {
    return { success: false, message: "Missing fields" };
  }
  if (password.length < 6) {
    return { success: false, message: "Password too short" };
  }

  var sheet = getSheet(USERS_SHEET);
  var users = getAllRows(sheet);
  for (var i = 0; i < users.length; i++) {
    if (String(users[i].email).toLowerCase() === email) {
      return { success: false, code: "EMAIL_EXISTS", message: "Email already registered" };
    }
  }

  var id = uuid();
  sheet.appendRow([id, name, email, hashPassword(password), nowIso()]);
  return { success: true, user: { id: id, name: name, email: email } };
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
      return String(r.userId) === String(userId) && String(r.date) === today;
    })
    .sort(function (a, b) {
      return new Date(a.timestamp) - new Date(b.timestamp);
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
    timestamp: r.timestamp,
    date: r.date,
  };
}
