// ============================================================
// CONFIG: Paste your Google Apps Script Web App URL here
// (After deploying Code.gs as Web App — see setup.txt)
// ============================================================
const API_URL = "https://script.google.com/macros/s/AKfycbwXDYl72uH5ZUbgKQnqlp4ApCNARLFCbTdidHwCh6gZPoOUgMI6ranlCMxGoJam9NUD/exec";

// ============================================================
// i18n (Vietnamese / Japanese)
// ============================================================
const I18N = {
  vi: {
    appTitle: "Hệ thống chấm công",
    loginTitle: "Đăng nhập",
    registerTitle: "Đăng ký người dùng",
    email: "Email",
    password: "Mật khẩu",
    fullName: "Họ và tên",
    loginBtn: "Đăng nhập",
    registerBtn: "Đăng ký",
    noAccount: "Chưa có tài khoản?",
    haveAccount: "Đã có tài khoản?",
    goRegister: "Đăng ký",
    goLogin: "Đăng nhập",
    welcome: "Xin chào",
    logout: "Đăng xuất",
    clockIn: "Chấm công vào",
    clockOut: "Chấm công ra",
    breakStart: "Bắt đầu nghỉ",
    breakEnd: "Kết thúc nghỉ",
    todayLog: "Lịch sử hôm nay",
    statusOut: "Chưa chấm công",
    statusWorking: "Đang làm việc",
    statusBreak: "Đang nghỉ",
    statusFinished: "Đã kết thúc",
    msgRegisterOk: "Đăng ký thành công. Vui lòng đăng nhập.",
    msgLoginFail: "Email hoặc mật khẩu không đúng.",
    msgEmailExists: "Email này đã được đăng ký.",
    msgClockedIn: "Đã chấm công vào.",
    msgClockedOut: "Đã chấm công ra.",
    msgBreakStart: "Bắt đầu nghỉ.",
    msgBreakEnd: "Kết thúc nghỉ.",
    msgError: "Có lỗi xảy ra. Vui lòng thử lại.",
    msgInvalidAction: "Thao tác không hợp lệ ở trạng thái hiện tại.",
    logEmpty: "Chưa có dữ liệu.",
    logClockIn: "Chấm công vào",
    logClockOut: "Chấm công ra",
    logBreakStart: "Bắt đầu nghỉ",
    logBreakEnd: "Kết thúc nghỉ",
  },
  ja: {
    appTitle: "勤怠システム",
    loginTitle: "ログイン",
    registerTitle: "ユーザー登録",
    email: "メールアドレス",
    password: "パスワード",
    fullName: "氏名",
    loginBtn: "ログイン",
    registerBtn: "登録する",
    noAccount: "アカウントをお持ちでない方",
    haveAccount: "アカウントをお持ちの方",
    goRegister: "新規登録",
    goLogin: "ログイン",
    welcome: "ようこそ",
    logout: "ログアウト",
    clockIn: "出勤",
    clockOut: "退勤",
    breakStart: "休憩開始",
    breakEnd: "休憩終了",
    todayLog: "本日の打刻履歴",
    statusOut: "未出勤",
    statusWorking: "勤務中",
    statusBreak: "休憩中",
    statusFinished: "退勤済",
    msgRegisterOk: "登録が完了しました。ログインしてください。",
    msgLoginFail: "メールアドレスまたはパスワードが正しくありません。",
    msgEmailExists: "このメールアドレスは既に登録されています。",
    msgClockedIn: "出勤を記録しました。",
    msgClockedOut: "退勤を記録しました。",
    msgBreakStart: "休憩を開始しました。",
    msgBreakEnd: "休憩を終了しました。",
    msgError: "エラーが発生しました。もう一度お試しください。",
    msgInvalidAction: "現在の状態では実行できない操作です。",
    logEmpty: "データがありません。",
    logClockIn: "出勤",
    logClockOut: "退勤",
    logBreakStart: "休憩開始",
    logBreakEnd: "休憩終了",
  },
};

let currentLang = localStorage.getItem("lang") || "vi";
let currentUser = JSON.parse(localStorage.getItem("user") || "null");
let currentStatus = "out"; // out | in | break | finished

// ============================================================
// i18n helpers
// ============================================================
function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || key;
}

function applyLanguage() {
  document.documentElement.lang = currentLang === "ja" ? "ja" : "vi";
  document.getElementById("appTitle").textContent = t("appTitle");
  document.title = t("appTitle");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });

  updateStatusBadge();
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentLang = btn.dataset.lang;
    localStorage.setItem("lang", currentLang);
    applyLanguage();
  });
});

// ============================================================
// Screen navigation
// ============================================================
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.getElementById("goRegister").addEventListener("click", (e) => {
  e.preventDefault();
  showScreen("registerScreen");
});

document.getElementById("goLogin").addEventListener("click", (e) => {
  e.preventDefault();
  showScreen("loginScreen");
});

// ============================================================
// API
// ============================================================
function showLoading(show) {
  document.getElementById("loading").classList.toggle("hidden", !show);
}

function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast show " + type;
  setTimeout(() => {
    toast.className = "toast";
  }, 2500);
}

async function api(action, payload = {}) {
  showLoading(true);
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      // text/plain avoids the CORS preflight; GAS reads e.postData.contents
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action, ...payload }),
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  } catch (err) {
    console.error(err);
    return { success: false, message: t("msgError") };
  } finally {
    showLoading(false);
  }
}

// ============================================================
// Register
// ============================================================
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim().toLowerCase();
  const password = document.getElementById("regPassword").value;

  const result = await api("register", { name, email, password });
  if (result.success) {
    showToast(t("msgRegisterOk"), "success");
    document.getElementById("registerForm").reset();
    showScreen("loginScreen");
  } else if (result.code === "EMAIL_EXISTS") {
    showToast(t("msgEmailExists"), "error");
  } else {
    showToast(result.message || t("msgError"), "error");
  }
});

// ============================================================
// Login
// ============================================================
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;

  const result = await api("login", { email, password });
  if (result.success) {
    currentUser = result.user;
    localStorage.setItem("user", JSON.stringify(currentUser));
    document.getElementById("loginForm").reset();
    enterDashboard();
  } else {
    showToast(t("msgLoginFail"), "error");
  }
});

// ============================================================
// Logout
// ============================================================
document.getElementById("logoutBtn").addEventListener("click", () => {
  currentUser = null;
  localStorage.removeItem("user");
  showScreen("loginScreen");
});

// ============================================================
// Dashboard
// ============================================================
async function enterDashboard() {
  document.getElementById("userName").textContent = currentUser.name;
  showScreen("dashboardScreen");
  await refreshStatus();
}

async function refreshStatus() {
  const result = await api("getStatus", { userId: currentUser.id });
  if (result.success) {
    currentStatus = result.status; // out | in | break | finished
    renderLog(result.todayLog || []);
    updateStatusBadge();
    updateButtons();
  }
}

function updateStatusBadge() {
  const badge = document.getElementById("statusBadge");
  if (!badge) return;
  const map = {
    out: { cls: "status-out", key: "statusOut" },
    in: { cls: "status-working", key: "statusWorking" },
    break: { cls: "status-break", key: "statusBreak" },
    finished: { cls: "status-finished", key: "statusFinished" },
  };
  const conf = map[currentStatus] || map.out;
  badge.className = "status-badge " + conf.cls;
  badge.textContent = t(conf.key);
}

function updateButtons() {
  const ci = document.getElementById("clockInBtn");
  const co = document.getElementById("clockOutBtn");
  const bs = document.getElementById("breakStartBtn");
  const be = document.getElementById("breakEndBtn");

  // out -> only clockIn
  // in (working) -> breakStart, clockOut
  // break -> breakEnd
  // finished -> none (already clocked out today)
  ci.disabled = currentStatus !== "out";
  co.disabled = currentStatus !== "in";
  bs.disabled = currentStatus !== "in";
  be.disabled = currentStatus !== "break";
}

function renderLog(logs) {
  const ul = document.getElementById("todayLog");
  ul.innerHTML = "";
  if (!logs.length) {
    const li = document.createElement("li");
    li.className = "log-empty";
    li.textContent = t("logEmpty");
    ul.appendChild(li);
    return;
  }
  const typeMap = {
    clock_in: "logClockIn",
    clock_out: "logClockOut",
    break_start: "logBreakStart",
    break_end: "logBreakEnd",
  };
  logs.forEach((log) => {
    const li = document.createElement("li");
    const typeSpan = document.createElement("span");
    typeSpan.className = "log-type " + log.type;
    typeSpan.textContent = t(typeMap[log.type] || log.type);
    const timeSpan = document.createElement("span");
    timeSpan.className = "log-time";
    timeSpan.textContent = formatTime(log.timestamp);
    li.appendChild(typeSpan);
    li.appendChild(timeSpan);
    ul.appendChild(li);
  });
}

function formatTime(iso) {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

// ============================================================
// Attendance actions
// ============================================================
async function recordAttendance(type, successKey) {
  const result = await api("record", {
    userId: currentUser.id,
    type, // clock_in | clock_out | break_start | break_end
  });
  if (result.success) {
    showToast(t(successKey), "success");
    currentStatus = result.status;
    renderLog(result.todayLog || []);
    updateStatusBadge();
    updateButtons();
  } else if (result.code === "INVALID_STATE") {
    showToast(t("msgInvalidAction"), "error");
  } else {
    showToast(result.message || t("msgError"), "error");
  }
}

document.getElementById("clockInBtn").addEventListener("click", () =>
  recordAttendance("clock_in", "msgClockedIn")
);
document.getElementById("clockOutBtn").addEventListener("click", () =>
  recordAttendance("clock_out", "msgClockedOut")
);
document.getElementById("breakStartBtn").addEventListener("click", () =>
  recordAttendance("break_start", "msgBreakStart")
);
document.getElementById("breakEndBtn").addEventListener("click", () =>
  recordAttendance("break_end", "msgBreakEnd")
);

// ============================================================
// Live clock (Vietnam timezone display, but uses local time)
// ============================================================
function tickClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  document.getElementById("currentTime").textContent = `${hh}:${mm}:${ss}`;

  const yyyy = now.getFullYear();
  const mo = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const weekdaysVi = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const weekdaysJa = ["日", "月", "火", "水", "木", "金", "土"];
  const w =
    currentLang === "ja" ? weekdaysJa[now.getDay()] : weekdaysVi[now.getDay()];
  document.getElementById("currentDate").textContent = `${yyyy}/${mo}/${d} (${w})`;
}
setInterval(tickClock, 1000);
tickClock();

// ============================================================
// Init
// ============================================================
applyLanguage();
if (currentUser) {
  enterDashboard();
} else {
  showScreen("loginScreen");
}
