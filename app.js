// ============================================================
// CONFIG: Paste your Google Apps Script Web App URL here
// (After deploying Code.gs as Web App — see setup.txt)
// ============================================================
const API_URL = "const API_URL = "const API_URL = "https://script.google.com/macros/s/AKfycbyyTzbqyDbaUw844La-65eZ4CT245X3Ly9DbyQOe65q4fS8ixaEIs9l4ds3t25CV7Vv/exec";";";

// ============================================================
// i18n (Vietnamese / Japanese)
// ============================================================
const I18N = {
  vi: {
    appTitle: "Hệ thống chấm công",
    addUserBtn: "+ Đăng ký",
    registerTitle: "Đăng ký người dùng",
    email: "Email",
    fullName: "Họ và tên",
    optional: " (tùy chọn)",
    registerBtn: "Đăng ký",
    cancel: "Hủy",
    sectionBasic: "Thông tin cơ bản",
    sectionContact: "Liên hệ",
    sectionEmployment: "Việc làm",
    sectionBank: "Tài khoản ngân hàng (Việt Nam)",
    positionLabel: "Chức vụ",
    positionAdmin: "Quản trị viên",
    positionEmployee: "Nhân viên chính thức",
    positionParttime: "Nhân viên bán thời gian",
    gender: "Giới tính",
    genderEmpty: "--",
    genderMale: "Nam",
    genderFemale: "Nữ",
    genderOther: "Khác",
    birthDate: "Ngày sinh",
    idNumber: "Số CCCD/CMND",
    phone: "Số điện thoại",
    address: "Địa chỉ",
    emergencyContact: "Liên hệ khẩn cấp",
    hireDate: "Ngày vào làm",
    bankName: "Tên ngân hàng",
    bankBranch: "Chi nhánh",
    bankAccount: "Số tài khoản",
    msgNameRequired: "Vui lòng nhập họ và tên.",
    pickUser: "Chọn nhân viên",
    pickPlaceholder: "-- Chọn --",
    filterByUser: "Lọc theo nhân viên",
    filterAll: "-- Tất cả --",
    clockIn: "Chấm công vào",
    clockOut: "Chấm công ra",
    breakStart: "Bắt đầu nghỉ",
    breakEnd: "Kết thúc nghỉ",
    todayLog: "Lịch sử hôm nay",
    statusOut: "Chưa chấm công",
    statusWorking: "Đang làm việc",
    statusBreak: "Đang nghỉ",
    statusFinished: "Đã kết thúc",
    msgRegisterOk: "Đăng ký thành công.",
    msgEmailExists: "Email này đã được đăng ký.",
    msgClockedIn: "Đã chấm công vào.",
    msgClockedOut: "Đã chấm công ra.",
    msgBreakStart: "Bắt đầu nghỉ.",
    msgBreakEnd: "Kết thúc nghỉ.",
    msgError: "Có lỗi xảy ra. Vui lòng thử lại.",
    msgInvalidAction: "Thao tác không hợp lệ ở trạng thái hiện tại.",
    msgPickUserFirst: "Vui lòng chọn nhân viên trước.",
    logEmpty: "Chưa có dữ liệu.",
    logClockIn: "Chấm công vào",
    logClockOut: "Chấm công ra",
    logBreakStart: "Bắt đầu nghỉ",
    logBreakEnd: "Kết thúc nghỉ",
    tabAttendance: "Chấm công",
    tabShiftRegister: "Đăng ký ca",
    tabShiftManage: "Quản lý ca",
    shiftDate: "Ngày",
    shiftStart: "Bắt đầu",
    shiftEnd: "Kết thúc",
    shiftNote: "Ghi chú",
    registerShiftBtn: "Đăng ký ca",
    myShiftsTitle: "Ca làm việc (tháng này)",
    noShifts: "Chưa có ca nào.",
    deleteShiftBtn: "Xóa",
    deleteConfirm: "Bạn có chắc chắn muốn xóa ca này?",
    msgShiftRegistered: "Đã đăng ký ca làm việc.",
    msgShiftDeleted: "Đã xóa ca làm việc.",
    msgShiftInvalidTime: "Giờ kết thúc phải sau giờ bắt đầu.",
    addShiftTitle: "Đăng ký ca",
    pickPattern: "Chọn mẫu ca",
    customPattern: "Tùy chỉnh",
    editPatterns: "⚙ Mẫu ca",
    editPatternsTitle: "Cài đặt mẫu ca",
    patternLabel: "Mẫu",
    patternName: "Tên",
    saveBtn: "Lưu",
    msgPatternsSaved: "Đã lưu mẫu ca.",
    calHint: "Bấm vào ngày để đăng ký ca",
    weekdaySun: "CN",
    weekdayMon: "T2",
    weekdayTue: "T3",
    weekdayWed: "T4",
    weekdayThu: "T5",
    weekdayFri: "T6",
    weekdaySat: "T7",
    thisWeekBtn: "Tuần này",
    manageHint: "Bấm vào ca để xóa",
    menuTitle: "Menu",
    menuAttendance: "Hệ thống chấm công",
    menuRegister: "Đăng ký người dùng",
    hintIdle: "Chạm vào mẫu ca để chọn (hoặc chạm vào ngày để nhập tự do)",
    hintArmed: "đang chọn — chạm vào ngày để thêm/xóa",
    hintNoUser: "Vui lòng chọn nhân viên trước",
  },
  ja: {
    appTitle: "勤怠システム",
    addUserBtn: "+ ユーザー登録",
    registerTitle: "ユーザー登録",
    email: "メールアドレス",
    fullName: "氏名",
    optional: " (任意)",
    registerBtn: "登録する",
    cancel: "キャンセル",
    sectionBasic: "基本情報",
    sectionContact: "連絡先",
    sectionEmployment: "雇用情報",
    sectionBank: "振込先 (ベトナム)",
    positionLabel: "役職",
    positionAdmin: "管理者",
    positionEmployee: "一般社員",
    positionParttime: "アルバイト",
    gender: "性別",
    genderEmpty: "--",
    genderMale: "男性",
    genderFemale: "女性",
    genderOther: "その他",
    birthDate: "生年月日",
    idNumber: "ID番号",
    phone: "電話番号",
    address: "住所",
    emergencyContact: "緊急連絡先",
    hireDate: "入社日",
    bankName: "銀行名",
    bankBranch: "支店名",
    bankAccount: "口座番号",
    msgNameRequired: "氏名を入力してください。",
    pickUser: "ユーザーを選択",
    pickPlaceholder: "-- 選択してください --",
    filterByUser: "ユーザーで絞り込み",
    filterAll: "-- 全員 --",
    clockIn: "出勤",
    clockOut: "退勤",
    breakStart: "休憩開始",
    breakEnd: "休憩終了",
    todayLog: "本日の打刻履歴",
    statusOut: "未出勤",
    statusWorking: "勤務中",
    statusBreak: "休憩中",
    statusFinished: "退勤済",
    msgRegisterOk: "登録が完了しました。",
    msgEmailExists: "このメールアドレスは既に登録されています。",
    msgClockedIn: "出勤を記録しました。",
    msgClockedOut: "退勤を記録しました。",
    msgBreakStart: "休憩を開始しました。",
    msgBreakEnd: "休憩を終了しました。",
    msgError: "エラーが発生しました。もう一度お試しください。",
    msgInvalidAction: "現在の状態では実行できない操作です。",
    msgPickUserFirst: "先にユーザーを選択してください。",
    logEmpty: "データがありません。",
    logClockIn: "出勤",
    logClockOut: "退勤",
    logBreakStart: "休憩開始",
    logBreakEnd: "休憩終了",
    tabAttendance: "勤怠",
    tabShiftRegister: "シフト登録",
    tabShiftManage: "シフト管理",
    shiftDate: "日付",
    shiftStart: "開始時刻",
    shiftEnd: "終了時刻",
    shiftNote: "備考",
    registerShiftBtn: "シフトを登録",
    myShiftsTitle: "シフト一覧 (今月)",
    noShifts: "シフトが登録されていません。",
    deleteShiftBtn: "削除",
    deleteConfirm: "このシフトを削除してもよろしいですか?",
    msgShiftRegistered: "シフトを登録しました。",
    msgShiftDeleted: "シフトを削除しました。",
    msgShiftInvalidTime: "終了時刻は開始時刻より後である必要があります。",
    addShiftTitle: "シフト登録",
    pickPattern: "シフトパターンを選択",
    customPattern: "カスタム",
    editPatterns: "⚙ パターン編集",
    editPatternsTitle: "シフトパターン設定",
    patternLabel: "パターン",
    patternName: "名前",
    saveBtn: "保存",
    msgPatternsSaved: "シフトパターンを保存しました。",
    calHint: "日付をタップしてシフトを登録",
    weekdaySun: "日",
    weekdayMon: "月",
    weekdayTue: "火",
    weekdayWed: "水",
    weekdayThu: "木",
    weekdayFri: "金",
    weekdaySat: "土",
    thisWeekBtn: "今週",
    manageHint: "シフトをタップで削除",
    menuTitle: "メニュー",
    menuAttendance: "勤怠システム",
    menuRegister: "ユーザー登録",
    hintIdle: "シフトパターンをタップして選択 (または日付タップで個別入力)",
    hintArmed: "選択中 — 日付タップで登録/解除",
    hintNoUser: "先にユーザーを選択してください",
  },
};

// ============================================================
// State
// ============================================================
let currentLang = localStorage.getItem("lang") || "vi";
let users = []; // [{id, name, email}]
let attendanceUserId = ""; // selected user on attendance tab
let shiftUserId = ""; // selected user on shift register tab
let manageFilterUserId = ""; // optional filter on shift manage tab
let currentStatus = "out"; // out | in | break | finished
let currentTab = "attendance";
let manageWeekStart = null; // Date object pointing to Monday 00:00 of viewed week

// Calendar / patterns
let patterns = []; // 3 patterns from server [{id, name, startTime, endTime, color}]
let calYear = null;
let calMonth = null; // 1-12
let calShiftsByDate = {}; // { "yyyy-MM-dd": [shift, ...] }
let modalDate = "";
let modalPatternId = ""; // "P1" | "P2" | "P3" | "custom"
let armedPatternId = null; // when set, tapping a calendar date toggles that pattern

// ============================================================
// i18n helpers
// ============================================================
function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || key;
}

function applyLanguage() {
  document.documentElement.lang = currentLang === "ja" ? "ja" : "vi";
  document.title = t("appTitle");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });

  // Re-render dynamic content that contains translated text
  updateStatusBadge();
  refreshUserPickerOptions();
  updateArmedHint();
  if (currentTab === "shiftManage") loadManageShifts();
  if (currentTab === "shiftRegister") renderCalendar();
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentLang = btn.dataset.lang;
    localStorage.setItem("lang", currentLang);
    applyLanguage();
  });
});

// ============================================================
// Screen / loading / toast
// ============================================================
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

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

// ============================================================
// API
// ============================================================
async function api(action, payload = {}) {
  showLoading(true);
  try {
    const res = await fetch(API_URL, {
      method: "POST",
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
// Users (kiosk picker)
// ============================================================
async function loadUsers() {
  const result = await api("listUsers");
  if (result.success) {
    users = result.users || [];
    refreshUserPickerOptions();
  }
}

function refreshUserPickerOptions() {
  const pickers = [
    { el: document.getElementById("userPickerAttendance"), placeholderKey: "pickPlaceholder", value: attendanceUserId },
    { el: document.getElementById("userPickerShift"), placeholderKey: "pickPlaceholder", value: shiftUserId },
    { el: document.getElementById("userFilterManage"), placeholderKey: "filterAll", value: manageFilterUserId },
  ];
  pickers.forEach(({ el, placeholderKey, value }) => {
    if (!el) return;
    el.innerHTML = "";
    const ph = document.createElement("option");
    ph.value = "";
    ph.textContent = t(placeholderKey);
    el.appendChild(ph);
    users.forEach((u) => {
      const opt = document.createElement("option");
      opt.value = u.id;
      opt.textContent = u.name;
      el.appendChild(opt);
    });
    el.value = value || "";
  });
}

// ============================================================
// Tabs
// ============================================================
function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll(".tab-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.tab === tab);
  });
  document.querySelectorAll(".tab-panel").forEach((p) => {
    p.classList.remove("active");
  });
  document.getElementById("tab-" + tab).classList.add("active");

  if (tab === "attendance") {
    if (attendanceUserId) refreshStatus();
    else clearAttendanceUI();
  } else if (tab === "shiftRegister") {
    if (calYear === null) {
      const now = new Date();
      calYear = now.getFullYear();
      calMonth = now.getMonth() + 1;
    }
    loadCalendar();
  } else if (tab === "shiftManage") {
    if (!manageWeekStart) manageWeekStart = startOfWeekMonday(new Date());
    loadManageShifts();
  }
}

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => switchTab(btn.dataset.tab));
});

// ============================================================
// User registration screen
// ============================================================
// ============================================================
// Hamburger drawer
// ============================================================
function openDrawer() {
  document.getElementById("drawer").classList.remove("hidden");
}

function closeDrawer() {
  document.getElementById("drawer").classList.add("hidden");
}

function setActiveDrawerItem(target) {
  document.querySelectorAll(".drawer-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.target === target);
  });
}

document.getElementById("menuToggleBtn").addEventListener("click", openDrawer);
document.getElementById("drawerClose").addEventListener("click", closeDrawer);
document.querySelector("#drawer .drawer-backdrop").addEventListener("click", closeDrawer);

document.querySelectorAll(".drawer-item").forEach((item) => {
  item.addEventListener("click", () => {
    const target = item.dataset.target;
    if (target === "dashboard") {
      showScreen("dashboardScreen");
    } else if (target === "register") {
      showScreen("registerScreen");
    }
    setActiveDrawerItem(target);
    closeDrawer();
  });
});

document.getElementById("cancelRegisterBtn").addEventListener("click", () => {
  document.getElementById("registerForm").reset();
  showScreen("dashboardScreen");
  setActiveDrawerItem("dashboard");
});

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const $ = (id) => document.getElementById(id).value.trim();
  const payload = {
    name: $("regName"),
    role: $("regRole") || "employee",
    gender: $("regGender"),
    birthDate: $("regBirthDate"),
    idNumber: $("regIdNumber"),
    phone: $("regPhone"),
    email: $("regEmail").toLowerCase(),
    address: $("regAddress"),
    emergencyContact: $("regEmergencyContact"),
    hireDate: $("regHireDate"),
    bankName: $("regBankName"),
    bankBranch: $("regBankBranch"),
    bankAccount: $("regBankAccount"),
  };
  if (!payload.name) {
    showToast(t("msgNameRequired"), "error");
    return;
  }

  const result = await api("register", payload);
  if (result.success) {
    showToast(t("msgRegisterOk"), "success");
    document.getElementById("registerForm").reset();
    await loadUsers();
    showScreen("dashboardScreen");
    setActiveDrawerItem("dashboard");
  } else if (result.code === "EMAIL_EXISTS") {
    showToast(t("msgEmailExists"), "error");
  } else {
    showToast(result.message || t("msgError"), "error");
  }
});

// ============================================================
// Attendance tab
// ============================================================
document.getElementById("userPickerAttendance").addEventListener("change", (e) => {
  attendanceUserId = e.target.value;
  if (attendanceUserId) {
    refreshStatus();
  } else {
    clearAttendanceUI();
  }
});

function clearAttendanceUI() {
  currentStatus = "out";
  updateStatusBadge();
  updateButtons();
  renderLog([]);
}

async function refreshStatus() {
  if (!attendanceUserId) return;
  const result = await api("getStatus", { userId: attendanceUserId });
  if (result.success) {
    currentStatus = result.status;
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

  const noUser = !attendanceUserId;
  ci.disabled = noUser || currentStatus !== "out";
  co.disabled = noUser || currentStatus !== "in";
  bs.disabled = noUser || currentStatus !== "in";
  be.disabled = noUser || currentStatus !== "break";
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

async function recordAttendance(type, successKey) {
  if (!attendanceUserId) {
    showToast(t("msgPickUserFirst"), "error");
    return;
  }
  const result = await api("record", { userId: attendanceUserId, type });
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
// Live clock
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
// Shift register tab — calendar
// ============================================================
function todayLocalStr() {
  const d = new Date();
  return formatDateLocal(d);
}

function formatDateLocal(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${da}`;
}

document.getElementById("userPickerShift").addEventListener("change", (e) => {
  shiftUserId = e.target.value;
  updateArmedHint();
  loadCalendar();
});

document.getElementById("prevCalMonthBtn").addEventListener("click", () => {
  calMonth -= 1;
  if (calMonth < 1) {
    calMonth = 12;
    calYear -= 1;
  }
  loadCalendar();
});

document.getElementById("nextCalMonthBtn").addEventListener("click", () => {
  calMonth += 1;
  if (calMonth > 12) {
    calMonth = 1;
    calYear += 1;
  }
  loadCalendar();
});

async function loadCalendar() {
  document.getElementById("calMonthLabel").textContent =
    `${calYear}/${String(calMonth).padStart(2, "0")}`;
  calShiftsByDate = {};
  if (shiftUserId) {
    const result = await api("listShifts", {
      year: calYear,
      month: calMonth,
      filterUserId: shiftUserId,
    });
    if (result.success) {
      (result.shifts || []).forEach((s) => {
        if (!calShiftsByDate[s.date]) calShiftsByDate[s.date] = [];
        calShiftsByDate[s.date].push(s);
      });
    }
  }
  renderCalendar();
}

function getPatternColor(patternId) {
  const p = patterns.find((x) => x.id === patternId);
  return p ? p.color : "#6b7280";
}

function findMatchingPattern(startTime, endTime) {
  return patterns.find(
    (p) => p.startTime === startTime && p.endTime === endTime
  );
}

function renderCalendar() {
  const root = document.getElementById("calendar");
  root.innerHTML = "";

  // Weekday header
  const weekdays = document.createElement("div");
  weekdays.className = "cal-weekdays";
  const wkKeys = ["weekdaySun", "weekdayMon", "weekdayTue", "weekdayWed", "weekdayThu", "weekdayFri", "weekdaySat"];
  for (let i = 0; i < 7; i++) {
    const w = document.createElement("div");
    w.className = "cal-weekday";
    if (i === 0) w.classList.add("sun");
    if (i === 6) w.classList.add("sat");
    w.textContent = t(wkKeys[i]);
    weekdays.appendChild(w);
  }
  root.appendChild(weekdays);

  // Days grid
  const grid = document.createElement("div");
  grid.className = "cal-grid";

  const firstDay = new Date(calYear, calMonth - 1, 1);
  const lastDay = new Date(calYear, calMonth, 0);
  const startWeekday = firstDay.getDay(); // 0 = Sun
  const totalDays = lastDay.getDate();
  const totalCells = Math.ceil((startWeekday + totalDays) / 7) * 7;
  const todayStr = todayLocalStr();

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.className = "cal-day";
    const dayNum = i - startWeekday + 1;

    if (dayNum < 1 || dayNum > totalDays) {
      cell.classList.add("cal-other-month");
      const fillDay = dayNum < 1 ? new Date(calYear, calMonth - 1, dayNum) : new Date(calYear, calMonth, dayNum - totalDays);
      const numEl = document.createElement("div");
      numEl.className = "cal-day-num";
      numEl.textContent = String(fillDay.getDate());
      cell.appendChild(numEl);
    } else {
      const weekday = (startWeekday + dayNum - 1) % 7;
      if (weekday === 0) cell.classList.add("cal-sun");
      if (weekday === 6) cell.classList.add("cal-sat");

      const dateStr = `${calYear}-${String(calMonth).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
      if (dateStr === todayStr) cell.classList.add("cal-today");

      const numEl = document.createElement("div");
      numEl.className = "cal-day-num";
      numEl.textContent = String(dayNum);
      cell.appendChild(numEl);

      const shiftsBox = document.createElement("div");
      shiftsBox.className = "cal-shifts";
      const shifts = calShiftsByDate[dateStr] || [];
      const maxChips = 2;
      shifts.slice(0, maxChips).forEach((s) => {
        const chip = document.createElement("div");
        chip.className = "cal-shift-chip";
        const matched = findMatchingPattern(s.startTime, s.endTime);
        chip.style.background = matched ? matched.color : "#6b7280";

        const startEl = document.createElement("div");
        startEl.className = "cal-shift-time";
        startEl.textContent = s.startTime;
        const endEl = document.createElement("div");
        endEl.className = "cal-shift-time";
        endEl.textContent = s.endTime;
        chip.appendChild(startEl);
        chip.appendChild(endEl);

        shiftsBox.appendChild(chip);
      });
      if (shifts.length > maxChips) {
        const more = document.createElement("div");
        more.className = "cal-shift-more";
        more.textContent = `+${shifts.length - maxChips}`;
        shiftsBox.appendChild(more);
      }
      cell.appendChild(shiftsBox);

      cell.addEventListener("click", () => {
        if (armedPatternId) {
          quickToggleShift(dateStr);
        } else {
          openAddShiftModal(dateStr);
        }
      });
    }
    grid.appendChild(cell);
  }
  root.appendChild(grid);
  root.classList.toggle("armed", !!armedPatternId);
}

// ============================================================
// Add shift modal
// ============================================================
function openAddShiftModal(dateStr) {
  if (!shiftUserId) {
    showToast(t("msgPickUserFirst"), "error");
    return;
  }
  modalDate = dateStr;
  modalPatternId = patterns.length ? patterns[0].id : "custom";

  document.getElementById("modalDateLabel").textContent = formatShiftDate(dateStr);
  document.getElementById("modalNote").value = "";
  document.getElementById("modalStartTime").value = "";
  document.getElementById("modalEndTime").value = "";

  // Existing shifts list (with delete)
  const existingBox = document.getElementById("modalExistingShifts");
  existingBox.innerHTML = "";
  const existing = calShiftsByDate[dateStr] || [];
  existing.forEach((s) => {
    const row = document.createElement("div");
    row.className = "modal-existing-item";
    const left = document.createElement("span");
    left.className = "modal-existing-time";
    const matched = findMatchingPattern(s.startTime, s.endTime);
    left.textContent = (matched ? matched.name + "  " : "") + `${s.startTime} - ${s.endTime}` + (s.note ? `  / ${s.note}` : "");
    const del = document.createElement("button");
    del.type = "button";
    del.className = "modal-existing-del";
    del.textContent = t("deleteShiftBtn");
    del.addEventListener("click", async () => {
      if (!confirm(t("deleteConfirm"))) return;
      const r = await api("deleteShift", { shiftId: s.id });
      if (r.success) {
        showToast(t("msgShiftDeleted"), "success");
        await loadCalendar();
        openAddShiftModal(dateStr); // refresh modal contents
      } else {
        showToast(r.message || t("msgError"), "error");
      }
    });
    row.appendChild(left);
    row.appendChild(del);
    existingBox.appendChild(row);
  });

  renderPatternGrid();

  const modal = document.getElementById("addShiftModal");
  modal.classList.remove("hidden");
}

function closeAddShiftModal() {
  document.getElementById("addShiftModal").classList.add("hidden");
}

function renderPatternGrid() {
  const grid = document.getElementById("patternGrid");
  grid.innerHTML = "";
  patterns.forEach((p) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pattern-card" + (p.id === modalPatternId ? " selected" : "");
    btn.style.setProperty("--pat-color", p.color);
    btn.innerHTML = `
      <div class="pattern-card-name">${escapeHtml(p.name)}</div>
      <div class="pattern-card-time">${p.startTime} - ${p.endTime}</div>
    `;
    btn.addEventListener("click", () => {
      modalPatternId = p.id;
      document.getElementById("customTimeRow").classList.add("hidden");
      renderPatternGrid();
    });
    grid.appendChild(btn);
  });
  // Custom option
  const custom = document.createElement("button");
  custom.type = "button";
  custom.className = "pattern-card pattern-custom" + (modalPatternId === "custom" ? " selected" : "");
  custom.innerHTML = `
    <div class="pattern-card-name">${escapeHtml(t("customPattern"))}</div>
    <div class="pattern-card-time">--:-- - --:--</div>
  `;
  custom.addEventListener("click", () => {
    modalPatternId = "custom";
    document.getElementById("customTimeRow").classList.remove("hidden");
    renderPatternGrid();
  });
  grid.appendChild(custom);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

document.getElementById("addShiftClose").addEventListener("click", closeAddShiftModal);
document.getElementById("modalCancelBtn").addEventListener("click", closeAddShiftModal);
document.querySelector("#addShiftModal .modal-backdrop").addEventListener("click", closeAddShiftModal);

document.getElementById("modalSubmitBtn").addEventListener("click", async () => {
  if (!shiftUserId) {
    showToast(t("msgPickUserFirst"), "error");
    return;
  }
  let startTime, endTime;
  if (modalPatternId === "custom") {
    startTime = document.getElementById("modalStartTime").value;
    endTime = document.getElementById("modalEndTime").value;
    if (!startTime || !endTime) return;
    if (endTime <= startTime) {
      showToast(t("msgShiftInvalidTime"), "error");
      return;
    }
  } else {
    const p = patterns.find((x) => x.id === modalPatternId);
    if (!p) return;
    startTime = p.startTime;
    endTime = p.endTime;
  }
  const note = document.getElementById("modalNote").value.trim();

  const result = await api("registerShift", {
    userId: shiftUserId,
    date: modalDate,
    startTime,
    endTime,
    note,
  });
  if (result.success) {
    showToast(t("msgShiftRegistered"), "success");
    closeAddShiftModal();
    loadCalendar();
  } else {
    showToast(result.message || t("msgError"), "error");
  }
});

// ============================================================
// Edit patterns modal
// ============================================================
async function loadPatterns() {
  const result = await api("getPatterns");
  if (result.success) {
    patterns = result.patterns || [];
    renderPatternStrip();
    updateArmedHint();
  }
}

// ============================================================
// Pattern strip (tap-and-hold quick entry)
// ============================================================
function renderPatternStrip() {
  const strip = document.getElementById("patternStrip");
  if (!strip) return;
  strip.innerHTML = "";
  patterns.forEach((p) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "pattern-strip-chip" + (p.id === armedPatternId ? " armed" : "");
    chip.style.setProperty("--pat-color", p.color);

    const nameEl = document.createElement("div");
    nameEl.className = "pattern-strip-chip-name";
    const nameSpan = document.createElement("span");
    nameSpan.textContent = p.name;
    nameEl.appendChild(nameSpan);

    const timeEl = document.createElement("div");
    timeEl.className = "pattern-strip-chip-time";
    timeEl.textContent = `${p.startTime}-${p.endTime}`;

    chip.appendChild(nameEl);
    chip.appendChild(timeEl);
    chip.addEventListener("click", () => toggleArmedPattern(p.id));
    strip.appendChild(chip);
  });
}

function toggleArmedPattern(patternId) {
  armedPatternId = armedPatternId === patternId ? null : patternId;
  renderPatternStrip();
  updateArmedHint();
  // Re-render calendar so the .armed class on root toggles
  if (currentTab === "shiftRegister") renderCalendar();
}

function updateArmedHint() {
  const hint = document.getElementById("armedHint");
  if (!hint) return;
  if (!shiftUserId) {
    hint.textContent = t("hintNoUser");
    hint.classList.remove("active");
    return;
  }
  if (armedPatternId) {
    const p = patterns.find((x) => x.id === armedPatternId);
    const name = p ? p.name : "";
    hint.textContent = `「${name}」 ${t("hintArmed")}`;
    hint.classList.add("active");
  } else {
    hint.textContent = t("hintIdle");
    hint.classList.remove("active");
  }
}

// Quick add/remove on cell tap when a pattern is armed.
// Toggles: tapping a date with the armed pattern already registered removes it.
async function quickToggleShift(dateStr) {
  if (!shiftUserId) {
    showToast(t("msgPickUserFirst"), "error");
    return;
  }
  const p = patterns.find((x) => x.id === armedPatternId);
  if (!p) return;

  const existing = (calShiftsByDate[dateStr] || []).find(
    (s) => s.startTime === p.startTime && s.endTime === p.endTime
  );

  let result;
  if (existing) {
    result = await api("deleteShift", { shiftId: existing.id });
    if (result.success) showToast(t("msgShiftDeleted"), "success");
  } else {
    result = await api("registerShift", {
      userId: shiftUserId,
      date: dateStr,
      startTime: p.startTime,
      endTime: p.endTime,
      note: "",
    });
    if (result.success) showToast(t("msgShiftRegistered"), "success");
  }
  if (!result.success) {
    showToast(result.message || t("msgError"), "error");
    return;
  }
  await loadCalendar();
}

function openPatternsModal() {
  const form = document.getElementById("patternsForm");
  form.innerHTML = "";
  patterns.forEach((p, idx) => {
    const block = document.createElement("div");
    block.className = "pattern-edit-block";
    block.style.setProperty("--pat-color", p.color);
    block.innerHTML = `
      <h5>${t("patternLabel")} ${idx + 1}</h5>
      <label>${t("patternName")}</label>
      <input type="text" data-pat="name" value="${escapeAttr(p.name)}" />
      <div class="form-row-2">
        <div>
          <label>${t("shiftStart")}</label>
          <input type="time" data-pat="startTime" value="${escapeAttr(p.startTime)}" />
        </div>
        <div>
          <label>${t("shiftEnd")}</label>
          <input type="time" data-pat="endTime" value="${escapeAttr(p.endTime)}" />
        </div>
      </div>
      <div class="color-row">
        <input type="color" data-pat="color" value="${escapeAttr(p.color)}" />
        <label class="muted">${escapeHtml(p.id)}</label>
      </div>
    `;
    form.appendChild(block);
  });
  document.getElementById("patternsModal").classList.remove("hidden");
}

function closePatternsModal() {
  document.getElementById("patternsModal").classList.add("hidden");
}

function escapeAttr(s) {
  return String(s).replace(/"/g, "&quot;");
}

document.getElementById("editPatternsBtn").addEventListener("click", openPatternsModal);
document.getElementById("patternsClose").addEventListener("click", closePatternsModal);
document.getElementById("patternsCancelBtn").addEventListener("click", closePatternsModal);
document.querySelector("#patternsModal .modal-backdrop").addEventListener("click", closePatternsModal);

document.getElementById("patternsSaveBtn").addEventListener("click", async () => {
  const blocks = document.querySelectorAll("#patternsForm .pattern-edit-block");
  const newPatterns = [];
  blocks.forEach((block, idx) => {
    const name = block.querySelector('[data-pat="name"]').value.trim();
    const startTime = block.querySelector('[data-pat="startTime"]').value;
    const endTime = block.querySelector('[data-pat="endTime"]').value;
    const color = block.querySelector('[data-pat="color"]').value;
    newPatterns.push({
      id: patterns[idx] ? patterns[idx].id : `P${idx + 1}`,
      name,
      startTime,
      endTime,
      color,
    });
  });
  const result = await api("savePatterns", { patterns: newPatterns });
  if (result.success) {
    showToast(t("msgPatternsSaved"), "success");
    await loadPatterns();
    closePatternsModal();
    if (currentTab === "shiftRegister") {
      renderPatternStrip();
      renderCalendar();
    }
  } else {
    showToast(result.message || t("msgError"), "error");
  }
});

// ============================================================
// Shift manage tab — weekly view (Monday start)
// ============================================================
function startOfWeekMonday(d) {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  const day = date.getDay(); // 0 = Sun
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return date;
}

// Stable per-user color from the user id (HSL hue derived from a hash).
function userColor(userId) {
  const s = String(userId || "");
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash) + s.charCodeAt(i);
    hash |= 0;
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 48%)`;
}

document.getElementById("userFilterManage").addEventListener("change", (e) => {
  manageFilterUserId = e.target.value;
  loadManageShifts();
});

document.getElementById("prevWeekBtn").addEventListener("click", () => {
  manageWeekStart = new Date(manageWeekStart);
  manageWeekStart.setDate(manageWeekStart.getDate() - 7);
  loadManageShifts();
});

document.getElementById("nextWeekBtn").addEventListener("click", () => {
  manageWeekStart = new Date(manageWeekStart);
  manageWeekStart.setDate(manageWeekStart.getDate() + 7);
  loadManageShifts();
});

document.getElementById("thisWeekBtn").addEventListener("click", () => {
  manageWeekStart = startOfWeekMonday(new Date());
  loadManageShifts();
});

async function loadManageShifts() {
  if (!manageWeekStart) manageWeekStart = startOfWeekMonday(new Date());
  const weekEnd = new Date(manageWeekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const fromStr = formatDateLocal(manageWeekStart);
  const toStr = formatDateLocal(weekEnd);

  document.getElementById("currentWeekLabel").textContent =
    `${shortDate(manageWeekStart)} - ${shortDate(weekEnd)}`;

  const result = await api("listShifts", {
    dateFrom: fromStr,
    dateTo: toStr,
    filterUserId: manageFilterUserId,
  });
  const shifts = (result && result.shifts) || [];
  renderWeekGrid(shifts);
  renderUserLegend(shifts);
}

function shortDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  return `${y}/${m}/${da}`;
}

function renderWeekGrid(shifts) {
  const root = document.getElementById("weekGrid");
  root.innerHTML = "";

  // Group shifts by date and sort by start time within each day.
  const byDate = {};
  shifts.forEach((s) => {
    if (!byDate[s.date]) byDate[s.date] = [];
    byDate[s.date].push(s);
  });
  Object.values(byDate).forEach((arr) => {
    arr.sort((a, b) => (a.startTime < b.startTime ? -1 : a.startTime > b.startTime ? 1 : 0));
  });

  const todayStr = todayLocalStr();
  const wkKeys = ["weekdayMon", "weekdayTue", "weekdayWed", "weekdayThu", "weekdayFri", "weekdaySat", "weekdaySun"];

  for (let i = 0; i < 7; i++) {
    const day = new Date(manageWeekStart);
    day.setDate(day.getDate() + i);
    const dateStr = formatDateLocal(day);

    const cell = document.createElement("div");
    cell.className = "week-day";
    if (i === 5) cell.classList.add("week-sat");
    if (i === 6) cell.classList.add("week-sun");
    if (dateStr === todayStr) cell.classList.add("week-today");

    const header = document.createElement("div");
    header.className = "week-day-header";
    const wkEl = document.createElement("div");
    wkEl.className = "week-weekday";
    wkEl.textContent = t(wkKeys[i]);
    const dateEl = document.createElement("div");
    dateEl.className = "week-date";
    dateEl.textContent = `${day.getMonth() + 1}/${day.getDate()}`;
    header.appendChild(wkEl);
    header.appendChild(dateEl);
    cell.appendChild(header);

    const dayShifts = byDate[dateStr] || [];
    if (!dayShifts.length) {
      const empty = document.createElement("div");
      empty.className = "week-empty";
      empty.textContent = "—";
      cell.appendChild(empty);
    } else {
      dayShifts.forEach((s) => {
        const chip = document.createElement("div");
        chip.className = "week-shift";
        chip.style.setProperty("--user-color", userColor(s.userId));

        const nameEl = document.createElement("div");
        nameEl.className = "week-shift-name";
        nameEl.textContent = s.userName || "?";

        const timeEl = document.createElement("div");
        timeEl.className = "week-shift-time";
        timeEl.textContent = `${s.startTime}-${s.endTime}`;

        chip.appendChild(nameEl);
        chip.appendChild(timeEl);

        if (s.note) {
          const noteEl = document.createElement("div");
          noteEl.className = "week-shift-note";
          noteEl.textContent = s.note;
          chip.appendChild(noteEl);
        }

        chip.addEventListener("click", async () => {
          if (!confirm(t("deleteConfirm"))) return;
          const r = await api("deleteShift", { shiftId: s.id });
          if (r.success) {
            showToast(t("msgShiftDeleted"), "success");
            loadManageShifts();
          } else {
            showToast(r.message || t("msgError"), "error");
          }
        });

        cell.appendChild(chip);
      });
    }

    root.appendChild(cell);
  }
}

function renderUserLegend(shifts) {
  const root = document.getElementById("userLegend");
  root.innerHTML = "";
  const seen = {};
  shifts.forEach((s) => {
    if (!seen[s.userId]) seen[s.userId] = s.userName || "?";
  });
  Object.keys(seen).forEach((uid) => {
    const item = document.createElement("span");
    item.className = "legend-item";
    const dot = document.createElement("span");
    dot.className = "legend-dot";
    dot.style.background = userColor(uid);
    const name = document.createElement("span");
    name.textContent = seen[uid];
    item.appendChild(dot);
    item.appendChild(name);
    root.appendChild(item);
  });
}

// ============================================================
// Date label helper (used by add-shift modal)
// ============================================================
function formatShiftDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map((v) => parseInt(v, 10));
  const dt = new Date(y, m - 1, d);
  const weekdaysVi = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const weekdaysJa = ["日", "月", "火", "水", "木", "金", "土"];
  const w =
    currentLang === "ja" ? weekdaysJa[dt.getDay()] : weekdaysVi[dt.getDay()];
  return `${dateStr} (${w})`;
}

// ============================================================
// Init
// ============================================================
applyLanguage();
showScreen("dashboardScreen");
setActiveDrawerItem("dashboard");
clearAttendanceUI();
loadUsers();
loadPatterns();
