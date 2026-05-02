// ============================================================
// CONFIG: Paste your Google Apps Script Web App URL here
// (After deploying Code.gs as Web App — see setup.txt)
// ============================================================
const API_URL = "https://script.google.com/macros/s/AKfycbz3StbBEIvi-rHuc1XJqg9QzbCPfB-gTH1spJO0l4KpuayxFqjYAmeFkdolP90Sk5hA/exec";

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
    menuTransaction: "Đăng ký giao dịch",
    menuMaster: "Dữ liệu chính",
    masterTitle: "Dữ liệu chính",
    masterTabStore: "Cửa hàng",
    masterTabVendor: "Nhà cung cấp",
    newStoreBtn: "+ Đăng ký cửa hàng",
    newVendorBtn: "+ Đăng ký nhà cung cấp",
    storeModalTitle: "Đăng ký cửa hàng",
    vendorModalTitle: "Đăng ký nhà cung cấp",
    storeName: "Tên cửa hàng",
    vendorName: "Tên nhà cung cấp",
    address: "Địa chỉ",
    phone: "Số điện thoại",
    masterEmpty: "Chưa có dữ liệu nào.",
    msgMasterRegistered: "Đã đăng ký.",
    msgMasterDeleted: "Đã xóa.",
    msgDuplicate: "Tên này đã được đăng ký.",
    masterDeleteConfirm: "Xóa mục này?",
    menuDashboard: "Bảng điều khiển",
    dashTitle: "Bảng điều khiển cửa hàng",
    dashSelectStore: "-- Chọn cửa hàng --",
    dashSelectFirst: "Vui lòng chọn cửa hàng và tháng.",
    enterDailySales: "+ Doanh số hằng ngày",
    enterMonthlyTarget: "+ Mục tiêu tháng",
    dailySalesModalTitle: "Nhập doanh số hằng ngày",
    monthlyTargetModalTitle: "Mục tiêu tháng",
    foodSales: "Doanh số đồ ăn",
    drinkSales: "Doanh số đồ uống",
    otherSales: "Doanh số khác (POS外)",
    customers: "Số khách",
    yearMonth: "Tháng",
    salesTargets: "Mục tiêu doanh số",
    foodSalesTarget: "Mục tiêu đồ ăn",
    drinkSalesTarget: "Mục tiêu đồ uống",
    otherSalesTarget: "Mục tiêu khác",
    costRatioTargets: "Mục tiêu tỷ lệ",
    foodCostRatioTarget: "Tỷ lệ chi phí đồ ăn",
    drinkCostRatioTarget: "Tỷ lệ chi phí đồ uống",
    laborCostRatioTarget: "Tỷ lệ nhân công mục tiêu",
    laborSection: "Chi phí nhân công thực tế",
    monthlyLaborCost: "Chi phí nhân công tháng",
    upsertHint: "※ Cùng cửa hàng + ngày sẽ ghi đè dữ liệu cũ",
    saveBtn: "Lưu",
    dailySalesList: "Lịch sử doanh số hằng ngày",
    dashSalesLabel: "Doanh số",
    dashSalesSub: "Tổng (đồ ăn + đồ uống + khác)",
    dashAvgPerCustomer: "Đơn giá/khách",
    dashCustomers: "Số khách",
    dashTodayPace: "Tỷ lệ đạt đến hôm nay",
    dashMonthlyProgress: "Tiến độ tháng",
    dashCostRatio: "Tỷ lệ chi phí",
    dashTarget: "MT",
    dashFood: "Đồ ăn",
    dashDrink: "Đồ uống",
    dashLaborRatio: "Tỷ lệ nhân công",
    dashLaborCost: "Chi phí nhân công",
    dashProfit: "Lợi nhuận",
    dashProfitRatio: "Tỷ lệ lợi nhuận",
    dashAttLabor: "Chấm công",
    dashOtherLabor: "Khác",
    dashSalesPerHour: "Doanh thu / giờ",
    dashTotalHours: "Tổng giờ",
    userStore: "Cửa hàng",
    hourlyRate: "Lương theo giờ",
    laborCostModalTitle: "Chỉnh sửa chi phí nhân công khác",
    otherLaborCostLabel: "Chi phí nhân công khác (cố định, thưởng, BHXH...)",
    otherLaborHint: "※ Phần lương theo giờ từ chấm công được tự động tính riêng.",
    editLabel: "✎ Sửa",
    msgSaved: "Đã lưu.",
    selectStore: "-- Chọn cửa hàng --",
    selectVendor: "-- Chọn nhà cung cấp --",
    paymentMethod: "Phương thức thanh toán",
    payCash: "Tiền mặt",
    payTransfer: "Chuyển khoản",
    payCard: "Thẻ tín dụng/ghi nợ",
    payMomo: "Momo",
    payZaloPay: "ZaloPay",
    payVnPay: "VNPay",
    payOther: "Khác",
    msgNoStores: "Vui lòng đăng ký cửa hàng trước (Dữ liệu chính → Cửa hàng).",
    hintIdle: "Chạm vào mẫu ca để chọn (hoặc chạm vào ngày để nhập tự do)",
    hintArmed: "đang chọn — chạm vào ngày để thêm/xóa",
    hintNoUser: "Vui lòng chọn nhân viên trước",
    txTitle: "Đăng ký giao dịch",
    txTabPurchase: "Mua hàng",
    txTabPetty: "Quỹ tiền mặt",
    storeAll: "-- Tất cả cửa hàng --",
    newEntry: "+ Đăng ký mới",
    pettyBanner: "💡 Giao dịch quỹ tiền mặt được phân loại theo khoản mục.",
    pettyTotalIn: "Tổng thu",
    pettyTotalOut: "Tổng chi",
    purchaseModalTitle: "Đăng ký mua hàng",
    pettyModalTitle: "Đăng ký giao dịch quỹ tiền mặt",
    purchaseDate: "Ngày mua",
    store: "Cửa hàng",
    vendor: "Nhà cung cấp",
    productName: "Tên sản phẩm",
    specification: "Quy cách",
    category: "Khoản mục",
    subCategory: "Khoản mục phụ",
    unitPrice: "Đơn giá (chưa thuế)",
    quantity: "Số lượng",
    taxRate: "Thuế suất",
    amountInclTax: "Số tiền (có thuế)",
    amountExclTax: "Tiền chưa thuế",
    txType: "Loại",
    typeOut: "Chi (出金)",
    typeIn: "Thu (入金)",
    taxCode: "Mã số thuế (MST)",
    note: "Ghi chú",
    date: "Ngày",
    catSeafood: "Hải sản",
    catMeat: "Thịt",
    catVeg: "Rau củ",
    catBev: "Đồ uống",
    catSpice: "Gia vị",
    catSupplies: "Vật tư",
    catFood: "Đồ ăn",
    catDrink: "Đồ uống",
    catUtilities: "Điện nước",
    catCommunication: "Viễn thông",
    catOfficeSupplies: "Văn phòng phẩm",
    catTravel: "Đi lại",
    catEntertainment: "Tiếp khách",
    catBankFee: "Phí ngân hàng",
    catOther: "Khác",
    txEmpty: "Chưa có giao dịch nào.",
    msgTxRegistered: "Đã đăng ký giao dịch.",
    msgTxDeleted: "Đã xóa giao dịch.",
    msgRequiredFields: "Vui lòng nhập các trường bắt buộc.",
    txDeleteConfirm: "Xóa giao dịch này?",
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
    menuTransaction: "取引登録",
    menuMaster: "マスタ登録",
    masterTitle: "マスタ登録",
    masterTabStore: "店舗",
    masterTabVendor: "取引先",
    newStoreBtn: "+ 店舗を登録",
    newVendorBtn: "+ 取引先を登録",
    storeModalTitle: "店舗登録",
    vendorModalTitle: "取引先登録",
    storeName: "店舗名",
    vendorName: "取引先名",
    address: "住所",
    phone: "電話番号",
    masterEmpty: "登録されたデータがありません。",
    msgMasterRegistered: "登録しました。",
    msgMasterDeleted: "削除しました。",
    msgDuplicate: "この名前は既に登録されています。",
    masterDeleteConfirm: "この項目を削除しますか?",
    menuDashboard: "店舗ダッシュボード",
    dashTitle: "店舗管理ダッシュボード",
    dashSelectStore: "-- 店舗を選択 --",
    dashSelectFirst: "店舗と月を選択してください。",
    enterDailySales: "+ デイリー売上を入力",
    enterMonthlyTarget: "+ 月次目標を設定",
    dailySalesModalTitle: "デイリー売上入力",
    monthlyTargetModalTitle: "月次目標設定",
    foodSales: "フード売上",
    drinkSales: "ドリンク売上",
    otherSales: "その他売上 (POS外)",
    customers: "客数",
    yearMonth: "対象月",
    salesTargets: "売上目標",
    foodSalesTarget: "フード売上目標",
    drinkSalesTarget: "ドリンク売上目標",
    otherSalesTarget: "その他売上目標",
    costRatioTargets: "目標比率",
    foodCostRatioTarget: "フード原価率目標",
    drinkCostRatioTarget: "ドリンク原価率目標",
    laborCostRatioTarget: "人件費率目標",
    laborSection: "実際の人件費",
    monthlyLaborCost: "月次人件費",
    upsertHint: "※ 同じ店舗・同じ日付の場合は上書き登録になります",
    saveBtn: "保存",
    dailySalesList: "デイリー売上履歴",
    dashSalesLabel: "売上",
    dashSalesSub: "(フード + ドリンク + その他)",
    dashAvgPerCustomer: "客単価",
    dashCustomers: "客数",
    dashTodayPace: "本日時点達成率",
    dashMonthlyProgress: "今日まで/月次目標",
    dashCostRatio: "原価率",
    dashTarget: "目標",
    dashFood: "フード",
    dashDrink: "ドリンク",
    dashLaborRatio: "人件費率",
    dashLaborCost: "人件費",
    dashProfit: "利益",
    dashProfitRatio: "利益率",
    dashAttLabor: "勤怠連動",
    dashOtherLabor: "その他人件費",
    dashSalesPerHour: "人時売上高",
    dashTotalHours: "合計勤務時間",
    userStore: "所属店舗",
    hourlyRate: "時給",
    laborCostModalTitle: "その他人件費の編集",
    otherLaborCostLabel: "その他人件費 (固定給・賞与・社保負担分など)",
    otherLaborHint: "※ 勤怠から自動計算される時給分は別途加算されます。",
    editLabel: "✎ 編集",
    msgSaved: "保存しました。",
    selectStore: "-- 店舗を選択 --",
    selectVendor: "-- 取引先を選択 --",
    paymentMethod: "支払い方法",
    payCash: "現金",
    payTransfer: "銀行振込",
    payCard: "クレジット/デビットカード",
    payMomo: "Momo",
    payZaloPay: "ZaloPay",
    payVnPay: "VNPay",
    payOther: "その他",
    msgNoStores: "先に店舗をマスタ登録してください (マスタ登録 → 店舗)。",
    hintIdle: "シフトパターンをタップして選択 (または日付タップで個別入力)",
    hintArmed: "選択中 — 日付タップで登録/解除",
    hintNoUser: "先にユーザーを選択してください",
    txTitle: "取引登録",
    txTabPurchase: "仕入れ登録",
    txTabPetty: "小口現金",
    storeAll: "-- 全店舗 --",
    newEntry: "+ 新規登録",
    pettyBanner: "💡 小口現金取引は科目・補助科目別に分類されます。",
    pettyTotalIn: "入金合計",
    pettyTotalOut: "出金合計",
    purchaseModalTitle: "仕入れ登録",
    pettyModalTitle: "小口現金取引登録",
    purchaseDate: "仕入日",
    store: "店舗",
    vendor: "取引先",
    productName: "商品名",
    specification: "規格",
    category: "科目",
    subCategory: "補助科目",
    unitPrice: "単価（税抜）",
    quantity: "注文数量",
    taxRate: "税率",
    amountInclTax: "金額（税込）",
    amountExclTax: "金額（税抜）",
    txType: "入出金区分",
    typeOut: "出金",
    typeIn: "入金",
    taxCode: "MST(納税者番号)",
    note: "備考",
    date: "日付",
    catSeafood: "海産物",
    catMeat: "肉類",
    catVeg: "野菜",
    catBev: "飲料",
    catSpice: "調味料",
    catSupplies: "備品",
    catFood: "フード",
    catDrink: "ドリンク",
    catUtilities: "水道光熱費",
    catCommunication: "通信費",
    catOfficeSupplies: "消耗品費",
    catTravel: "旅費交通費",
    catEntertainment: "接待交際費",
    catBankFee: "支払手数料",
    catOther: "その他",
    txEmpty: "取引データがありません。",
    msgTxRegistered: "取引を登録しました。",
    msgTxDeleted: "取引を削除しました。",
    msgRequiredFields: "必須項目を入力してください。",
    txDeleteConfirm: "この取引を削除しますか?",
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
      // Make sure the store dropdown has the latest master entries
      loadStores().then(() => {
        const sel = document.getElementById("regStore");
        if (!sel) return;
        const cur = sel.value;
        sel.innerHTML = '<option value=""></option>';
        txStores.forEach((s) => {
          const o = document.createElement("option");
          o.value = s; o.textContent = s;
          sel.appendChild(o);
        });
        sel.value = cur;
      });
    } else if (target === "transaction") {
      showScreen("transactionScreen");
      enterTransactionScreen();
    } else if (target === "master") {
      showScreen("masterScreen");
      enterMasterScreen();
    } else if (target === "storeDashboard") {
      showScreen("dashboardKpiScreen");
      enterDashboardScreen();
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
    store: $("regStore"),
    hourlyRate: document.getElementById("regHourlyRate").value || 0,
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

// Pad to "HH:MM" so a value like "6:00" matches "06:00".
// Sheets sometimes drops the leading zero on legacy time cells, which
// otherwise breaks the strict equality used by findMatchingPattern.
function normalizeTimeStr(t) {
  if (!t) return "";
  const m = String(t).trim().match(/^(\d{1,2}):(\d{1,2})/);
  if (!m) return String(t);
  return m[1].padStart(2, "0") + ":" + m[2].padStart(2, "0");
}

function findMatchingPattern(startTime, endTime) {
  const a = normalizeTimeStr(startTime);
  const b = normalizeTimeStr(endTime);
  return patterns.find(
    (p) => normalizeTimeStr(p.startTime) === a && normalizeTimeStr(p.endTime) === b
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
        startEl.textContent = normalizeTimeStr(s.startTime);
        const endEl = document.createElement("div");
        endEl.className = "cal-shift-time";
        endEl.textContent = normalizeTimeStr(s.endTime);
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
    const ts = `${normalizeTimeStr(s.startTime)} - ${normalizeTimeStr(s.endTime)}`;
    left.textContent = (matched ? matched.name + "  " : "") + ts + (s.note ? `  / ${s.note}` : "");
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
    startTime: normalizeTimeStr(startTime),
    endTime: normalizeTimeStr(endTime),
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

  const ps = normalizeTimeStr(p.startTime);
  const pe = normalizeTimeStr(p.endTime);
  const existing = (calShiftsByDate[dateStr] || []).find(
    (s) => normalizeTimeStr(s.startTime) === ps && normalizeTimeStr(s.endTime) === pe
  );

  let result;
  if (existing) {
    result = await api("deleteShift", { shiftId: existing.id });
    if (result.success) showToast(t("msgShiftDeleted"), "success");
  } else {
    result = await api("registerShift", {
      userId: shiftUserId,
      date: dateStr,
      startTime: normalizeTimeStr(p.startTime),
      endTime: normalizeTimeStr(p.endTime),
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
        timeEl.textContent = `${normalizeTimeStr(s.startTime)}-${normalizeTimeStr(s.endTime)}`;

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
// Transactions: shared helpers
// ============================================================
let txCurrentTab = "purchase";
let txStores = [];
let pettyType = "out"; // active type in petty modal

function fmtVnd(n) {
  const v = Math.round(Number(n) || 0);
  return v.toLocaleString("vi-VN") + " đ";
}

let txVendors = [];

async function loadStores() {
  const [s, v] = await Promise.all([api("listStores"), api("listVendors")]);
  if (s && s.success) txStores = s.stores || [];
  if (v && v.success) txVendors = v.vendors || [];
  refreshStoreOptions();
  refreshVendorOptions();
}

function refreshStoreOptions() {
  // Update <datalist> for free-typing inputs
  const dl = document.getElementById("storeOptions");
  if (dl) {
    dl.innerHTML = "";
    txStores.forEach((s) => {
      const o = document.createElement("option");
      o.value = s;
      dl.appendChild(o);
    });
  }
  // Update filter dropdowns (preserving current selection)
  ["purchaseStoreFilter", "pettyStoreFilter"].forEach((id) => {
    const sel = document.getElementById(id);
    if (!sel) return;
    const cur = sel.value;
    sel.innerHTML = "";
    const ph = document.createElement("option");
    ph.value = "";
    ph.textContent = t("storeAll");
    sel.appendChild(ph);
    txStores.forEach((s) => {
      const o = document.createElement("option");
      o.value = s;
      o.textContent = s;
      sel.appendChild(o);
    });
    sel.value = cur;
  });
}

function refreshVendorOptions() {
  const dl = document.getElementById("vendorOptions");
  if (!dl) return;
  dl.innerHTML = "";
  txVendors.forEach((v) => {
    const o = document.createElement("option");
    o.value = v;
    dl.appendChild(o);
  });
}

function enterTransactionScreen() {
  loadStores().then(() => {
    if (txCurrentTab === "purchase") loadPurchases();
    else loadPettyCash();
  });

  // Initialize date filters if empty
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const firstDay = `${y}-${m}-01`;
  const lastDay = `${y}-${m}-${String(new Date(y, today.getMonth() + 1, 0).getDate()).padStart(2, "0")}`;
  const dFrom = document.getElementById("purchaseDateFrom");
  const dTo = document.getElementById("purchaseDateTo");
  if (!dFrom.value) dFrom.value = firstDay;
  if (!dTo.value) dTo.value = lastDay;
  const pm = document.getElementById("pettyMonth");
  if (!pm.value) pm.value = `${y}-${m}`;
}

// Tab switching
document.querySelectorAll("[data-tx-tab]").forEach((btn) => {
  btn.addEventListener("click", () => {
    txCurrentTab = btn.dataset.txTab;
    document.querySelectorAll("[data-tx-tab]").forEach((b) =>
      b.classList.toggle("active", b === btn)
    );
    document.querySelectorAll(".tx-tab-panel").forEach((p) => p.classList.remove("active"));
    document.getElementById("tx-tab-" + txCurrentTab).classList.add("active");
    if (txCurrentTab === "purchase") loadPurchases();
    else loadPettyCash();
  });
});

// ============================================================
// Purchase tab
// ============================================================
document.getElementById("purchaseStoreFilter").addEventListener("change", loadPurchases);
document.getElementById("purchaseDateFrom").addEventListener("change", loadPurchases);
document.getElementById("purchaseDateTo").addEventListener("change", loadPurchases);
document.getElementById("newPurchaseBtn").addEventListener("click", openPurchaseModal);
document.getElementById("purchaseClose").addEventListener("click", closePurchaseModal);
document.getElementById("purchaseCancel").addEventListener("click", closePurchaseModal);
document.querySelector("#purchaseModal .modal-backdrop").addEventListener("click", closePurchaseModal);

["pUnitPrice", "pQuantity", "pTaxRate"].forEach((id) => {
  document.getElementById(id).addEventListener("input", recalcPurchaseAmount);
});

function recalcPurchaseAmount() {
  const u = parseFloat(document.getElementById("pUnitPrice").value) || 0;
  const q = parseFloat(document.getElementById("pQuantity").value) || 0;
  const r = parseFloat(document.getElementById("pTaxRate").value) || 0;
  const excl = u * q;
  const incl = excl * (1 + r / 100);
  document.getElementById("pAmountExcl").textContent = fmtVnd(excl);
  document.getElementById("pAmountIncl").textContent = fmtVnd(incl);
}

function fillSelectFromMaster(selectId, items, placeholderKey) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  const cur = sel.value;
  sel.innerHTML = "";
  const ph = document.createElement("option");
  ph.value = "";
  ph.textContent = t(placeholderKey);
  sel.appendChild(ph);
  items.forEach((it) => {
    const o = document.createElement("option");
    o.value = it;
    o.textContent = it;
    sel.appendChild(o);
  });
  sel.value = cur;
}

function openPurchaseModal() {
  if (!txStores.length) {
    showToast(t("msgNoStores"), "error");
    return;
  }
  document.getElementById("purchaseForm").reset();
  // Refill the store/vendor dropdowns from master data
  fillSelectFromMaster("pStore", txStores, "selectStore");
  fillSelectFromMaster("pVendor", txVendors, "selectVendor");

  document.getElementById("pTaxRate").value = "8";
  const today = new Date();
  document.getElementById("pDate").value =
    today.getFullYear() + "-" +
    String(today.getMonth() + 1).padStart(2, "0") + "-" +
    String(today.getDate()).padStart(2, "0");
  // Preselect store from filter if any
  const filterStore = document.getElementById("purchaseStoreFilter").value;
  if (filterStore) document.getElementById("pStore").value = filterStore;
  recalcPurchaseAmount();
  document.getElementById("purchaseModal").classList.remove("hidden");
}

function closePurchaseModal() {
  document.getElementById("purchaseModal").classList.add("hidden");
}

document.getElementById("purchaseForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const $ = (id) => document.getElementById(id).value;
  const payload = {
    date: $("pDate"),
    store: $("pStore").trim(),
    vendor: $("pVendor").trim(),
    productName: $("pProductName").trim(),
    category: $("pCategory"),
    unitPrice: $("pUnitPrice"),
    quantity: $("pQuantity"),
    taxRate: $("pTaxRate"),
    paymentMethod: $("pPaymentMethod"),
    note: $("pNote").trim(),
  };
  if (!payload.date || !payload.store || !payload.productName) {
    showToast(t("msgRequiredFields"), "error");
    return;
  }
  const r = await api("registerPurchase", payload);
  if (r.success) {
    showToast(t("msgTxRegistered"), "success");
    closePurchaseModal();
    await loadStores();
    loadPurchases();
  } else {
    showToast(r.message || t("msgError"), "error");
  }
});

async function loadPurchases() {
  const store = document.getElementById("purchaseStoreFilter").value;
  const dateFrom = document.getElementById("purchaseDateFrom").value;
  const dateTo = document.getElementById("purchaseDateTo").value;
  const r = await api("listPurchases", { store, dateFrom, dateTo });
  renderPurchaseList((r && r.purchases) || []);
}

function renderPurchaseList(list) {
  const root = document.getElementById("purchaseList");
  root.innerHTML = "";
  if (!list.length) {
    const div = document.createElement("div");
    div.className = "tx-empty";
    div.textContent = t("txEmpty");
    root.appendChild(div);
    return;
  }
  list.forEach((p) => {
    const incl = p.unitPrice * p.quantity * (1 + p.taxRate / 100);
    const card = document.createElement("div");
    card.className = "tx-card";

    const row1 = document.createElement("div");
    row1.className = "tx-card-row1";
    const date = document.createElement("span");
    date.className = "tx-card-date";
    date.textContent = `${p.date}  ${p.store || ""}`;
    const amount = document.createElement("span");
    amount.className = "tx-card-amount";
    amount.textContent = fmtVnd(incl);
    row1.appendChild(date);
    row1.appendChild(amount);

    const row2 = document.createElement("div");
    row2.className = "tx-card-row2";
    row2.textContent = p.productName;

    const row3 = document.createElement("div");
    row3.className = "tx-card-row3";
    if (p.vendor) {
      const v = document.createElement("span");
      v.textContent = p.vendor;
      row3.appendChild(v);
    }
    if (p.category) {
      const c = document.createElement("span");
      c.className = "tx-card-tag";
      const catKey = "cat" + p.category.charAt(0).toUpperCase() + p.category.slice(1);
      const cat = t(catKey);
      c.textContent = cat !== catKey ? cat : p.category;
      row3.appendChild(c);
    }
    if (p.paymentMethod) {
      const pm = document.createElement("span");
      pm.className = "tx-card-tag";
      const payKey = "pay" + p.paymentMethod.charAt(0).toUpperCase() + p.paymentMethod.slice(1);
      const payLabel = t(payKey);
      pm.textContent = payLabel !== payKey ? payLabel : p.paymentMethod;
      row3.appendChild(pm);
    }
    const qty = document.createElement("span");
    qty.textContent = `${fmtVnd(p.unitPrice)} × ${p.quantity}  (税${p.taxRate}%)`;
    row3.appendChild(qty);

    const del = document.createElement("button");
    del.type = "button";
    del.className = "tx-card-delete";
    del.textContent = "×";
    del.addEventListener("click", async () => {
      if (!confirm(t("txDeleteConfirm"))) return;
      const r = await api("deletePurchase", { id: p.id });
      if (r.success) {
        showToast(t("msgTxDeleted"), "success");
        loadPurchases();
      } else {
        showToast(r.message || t("msgError"), "error");
      }
    });

    card.appendChild(row1);
    card.appendChild(row2);
    card.appendChild(row3);
    card.appendChild(del);
    root.appendChild(card);
  });
}

// ============================================================
// Petty cash tab
// ============================================================
document.getElementById("pettyStoreFilter").addEventListener("change", loadPettyCash);
document.getElementById("pettyMonth").addEventListener("change", loadPettyCash);
document.getElementById("newPettyBtn").addEventListener("click", openPettyModal);
document.getElementById("pettyClose").addEventListener("click", closePettyModal);
document.getElementById("pettyCancel").addEventListener("click", closePettyModal);
document.querySelector("#pettyModal .modal-backdrop").addEventListener("click", closePettyModal);

document.querySelectorAll(".type-toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    pettyType = btn.dataset.type;
    document.querySelectorAll(".type-toggle-btn").forEach((b) =>
      b.classList.toggle("active", b.dataset.type === pettyType)
    );
  });
});

function openPettyModal() {
  if (!txStores.length) {
    showToast(t("msgNoStores"), "error");
    return;
  }
  document.getElementById("pettyForm").reset();
  // Refill store/vendor dropdowns from master
  fillSelectFromMaster("cStore", txStores, "selectStore");
  fillSelectFromMaster("cVendor", txVendors, "selectVendor");

  pettyType = "out";
  document.querySelectorAll(".type-toggle-btn").forEach((b) =>
    b.classList.toggle("active", b.dataset.type === "out")
  );
  document.getElementById("cTaxRate").value = "8";
  const today = new Date();
  document.getElementById("cDate").value =
    today.getFullYear() + "-" +
    String(today.getMonth() + 1).padStart(2, "0") + "-" +
    String(today.getDate()).padStart(2, "0");
  const filterStore = document.getElementById("pettyStoreFilter").value;
  if (filterStore) document.getElementById("cStore").value = filterStore;
  document.getElementById("pettyModal").classList.remove("hidden");
}

function closePettyModal() {
  document.getElementById("pettyModal").classList.add("hidden");
}

document.getElementById("pettyForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const $ = (id) => document.getElementById(id).value;
  const payload = {
    date: $("cDate"),
    store: $("cStore").trim(),
    type: pettyType,
    category: $("cCategory"),
    subCategory: $("cSubCategory").trim(),
    amount: $("cAmount"),
    taxRate: $("cTaxRate"),
    vendor: $("cVendor").trim(),
    taxCode: $("cTaxCode").trim(),
    note: $("cNote").trim(),
  };
  if (!payload.date || !payload.store || !payload.category || !payload.amount) {
    showToast(t("msgRequiredFields"), "error");
    return;
  }
  const r = await api("registerPettyCash", payload);
  if (r.success) {
    showToast(t("msgTxRegistered"), "success");
    closePettyModal();
    await loadStores();
    loadPettyCash();
  } else {
    showToast(r.message || t("msgError"), "error");
  }
});

async function loadPettyCash() {
  const store = document.getElementById("pettyStoreFilter").value;
  const ymVal = document.getElementById("pettyMonth").value; // "yyyy-MM"
  let year = null, month = null;
  if (ymVal && /^\d{4}-\d{2}$/.test(ymVal)) {
    year = parseInt(ymVal.substring(0, 4), 10);
    month = parseInt(ymVal.substring(5, 7), 10);
  }
  const r = await api("listPettyCash", { store, year, month });
  renderPettyList((r && r.items) || []);
}

function renderPettyList(items) {
  const root = document.getElementById("pettyList");
  root.innerHTML = "";

  let totalIn = 0, totalOut = 0;
  items.forEach((it) => {
    if (it.type === "in") totalIn += it.amount;
    else totalOut += it.amount;
  });
  document.getElementById("pettyTotalIn").textContent = fmtVnd(totalIn);
  document.getElementById("pettyTotalOut").textContent = fmtVnd(totalOut);

  if (!items.length) {
    const div = document.createElement("div");
    div.className = "tx-empty";
    div.textContent = t("txEmpty");
    root.appendChild(div);
    return;
  }

  items.forEach((it) => {
    const card = document.createElement("div");
    card.className = "tx-card";

    const row1 = document.createElement("div");
    row1.className = "tx-card-row1";
    const date = document.createElement("span");
    date.className = "tx-card-date";
    date.textContent = `${it.date}  ${it.store || ""}`;
    const amount = document.createElement("span");
    amount.className = "tx-card-amount " + (it.type === "in" ? "amount-in" : "amount-out");
    amount.textContent = (it.type === "in" ? "+" : "-") + fmtVnd(it.amount);
    row1.appendChild(date);
    row1.appendChild(amount);

    const row2 = document.createElement("div");
    row2.className = "tx-card-row2";
    const catKey = "cat" + (it.category || "").charAt(0).toUpperCase() + (it.category || "").slice(1);
    const catLabel = t(catKey) !== catKey ? t(catKey) : (it.category || "");
    row2.textContent = catLabel + (it.subCategory ? ` / ${it.subCategory}` : "");

    const row3 = document.createElement("div");
    row3.className = "tx-card-row3";
    const tag = document.createElement("span");
    tag.className = "tx-card-tag " + (it.type === "in" ? "type-in" : "type-out");
    tag.textContent = t(it.type === "in" ? "typeIn" : "typeOut");
    row3.appendChild(tag);
    if (it.vendor) {
      const v = document.createElement("span");
      v.textContent = it.vendor;
      row3.appendChild(v);
    }
    if (it.taxCode) {
      const tc = document.createElement("span");
      tc.textContent = "MST: " + it.taxCode;
      row3.appendChild(tc);
    }
    if (it.note) {
      const n = document.createElement("span");
      n.textContent = it.note;
      row3.appendChild(n);
    }

    const del = document.createElement("button");
    del.type = "button";
    del.className = "tx-card-delete";
    del.textContent = "×";
    del.addEventListener("click", async () => {
      if (!confirm(t("txDeleteConfirm"))) return;
      const r = await api("deletePettyCash", { id: it.id });
      if (r.success) {
        showToast(t("msgTxDeleted"), "success");
        loadPettyCash();
      } else {
        showToast(r.message || t("msgError"), "error");
      }
    });

    card.appendChild(row1);
    card.appendChild(row2);
    card.appendChild(row3);
    card.appendChild(del);
    root.appendChild(card);
  });
}

// ============================================================
// Master data: stores + vendors
// ============================================================
let masterCurrentTab = "store";

function enterMasterScreen() {
  if (masterCurrentTab === "store") loadStoreMaster();
  else loadVendorMaster();
}

document.querySelectorAll("[data-master-tab]").forEach((btn) => {
  btn.addEventListener("click", () => {
    masterCurrentTab = btn.dataset.masterTab;
    document.querySelectorAll("[data-master-tab]").forEach((b) =>
      b.classList.toggle("active", b === btn)
    );
    document.querySelectorAll(".master-tab-panel").forEach((p) => p.classList.remove("active"));
    document.getElementById("master-tab-" + masterCurrentTab).classList.add("active");
    if (masterCurrentTab === "store") loadStoreMaster();
    else loadVendorMaster();
  });
});

// ----- Store master -----
document.getElementById("newStoreBtn").addEventListener("click", openStoreModal);
document.getElementById("storeModalClose").addEventListener("click", closeStoreModal);
document.getElementById("storeCancel").addEventListener("click", closeStoreModal);
document.querySelector("#storeModal .modal-backdrop").addEventListener("click", closeStoreModal);

function openStoreModal() {
  document.getElementById("storeForm").reset();
  document.getElementById("storeModal").classList.remove("hidden");
}
function closeStoreModal() {
  document.getElementById("storeModal").classList.add("hidden");
}

document.getElementById("storeForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const $ = (id) => document.getElementById(id).value.trim();
  const payload = {
    name: $("sName"),
    address: $("sAddress"),
    phone: $("sPhone"),
    note: $("sNote"),
  };
  if (!payload.name) {
    showToast(t("msgRequiredFields"), "error");
    return;
  }
  const r = await api("registerStore", payload);
  if (r.success) {
    showToast(t("msgMasterRegistered"), "success");
    closeStoreModal();
    loadStoreMaster();
    loadStores(); // refresh autocomplete sources too
  } else if (r.code === "DUPLICATE") {
    showToast(t("msgDuplicate"), "error");
  } else {
    showToast(r.message || t("msgError"), "error");
  }
});

async function loadStoreMaster() {
  const r = await api("listStoreMaster");
  renderStoreMasterList((r && r.stores) || []);
}

function renderStoreMasterList(list) {
  const root = document.getElementById("storeMasterList");
  root.innerHTML = "";
  if (!list.length) {
    const div = document.createElement("div");
    div.className = "tx-empty";
    div.textContent = t("masterEmpty");
    root.appendChild(div);
    return;
  }
  list.forEach((s) => {
    const card = document.createElement("div");
    card.className = "master-card";

    const name = document.createElement("div");
    name.className = "master-card-name";
    name.textContent = s.name;
    card.appendChild(name);

    const meta = document.createElement("div");
    meta.className = "master-card-meta";
    appendMasterMeta(meta, t("address"), s.address);
    appendMasterMeta(meta, t("phone"), s.phone);
    appendMasterMeta(meta, t("note"), s.note);
    card.appendChild(meta);

    const del = document.createElement("button");
    del.type = "button";
    del.className = "tx-card-delete";
    del.textContent = "×";
    del.addEventListener("click", async () => {
      if (!confirm(t("masterDeleteConfirm"))) return;
      const r = await api("deleteStore", { id: s.id });
      if (r.success) {
        showToast(t("msgMasterDeleted"), "success");
        loadStoreMaster();
        loadStores();
      } else {
        showToast(r.message || t("msgError"), "error");
      }
    });
    card.appendChild(del);

    root.appendChild(card);
  });
}

function appendMasterMeta(parent, label, value) {
  if (!value) return;
  const row = document.createElement("div");
  row.className = "master-card-meta-row";
  const lab = document.createElement("span");
  lab.className = "master-card-meta-label";
  lab.textContent = label;
  const val = document.createElement("span");
  val.className = "master-card-meta-value";
  val.textContent = value;
  row.appendChild(lab);
  row.appendChild(val);
  parent.appendChild(row);
}

// ----- Vendor master -----
document.getElementById("newVendorBtn").addEventListener("click", openVendorModal);
document.getElementById("vendorModalClose").addEventListener("click", closeVendorModal);
document.getElementById("vendorCancel").addEventListener("click", closeVendorModal);
document.querySelector("#vendorModal .modal-backdrop").addEventListener("click", closeVendorModal);

function openVendorModal() {
  document.getElementById("vendorForm").reset();
  document.getElementById("vendorModal").classList.remove("hidden");
}
function closeVendorModal() {
  document.getElementById("vendorModal").classList.add("hidden");
}

document.getElementById("vendorForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const $ = (id) => document.getElementById(id).value.trim();
  const payload = {
    name: $("vName"),
    taxCode: $("vTaxCode"),
    address: $("vAddress"),
    phone: $("vPhone"),
    note: $("vNote"),
  };
  if (!payload.name) {
    showToast(t("msgRequiredFields"), "error");
    return;
  }
  const r = await api("registerVendor", payload);
  if (r.success) {
    showToast(t("msgMasterRegistered"), "success");
    closeVendorModal();
    loadVendorMaster();
    loadStores();
  } else if (r.code === "DUPLICATE") {
    showToast(t("msgDuplicate"), "error");
  } else {
    showToast(r.message || t("msgError"), "error");
  }
});

async function loadVendorMaster() {
  const r = await api("listVendorMaster");
  renderVendorMasterList((r && r.vendors) || []);
}

function renderVendorMasterList(list) {
  const root = document.getElementById("vendorMasterList");
  root.innerHTML = "";
  if (!list.length) {
    const div = document.createElement("div");
    div.className = "tx-empty";
    div.textContent = t("masterEmpty");
    root.appendChild(div);
    return;
  }
  list.forEach((v) => {
    const card = document.createElement("div");
    card.className = "master-card";

    const name = document.createElement("div");
    name.className = "master-card-name";
    name.textContent = v.name;
    card.appendChild(name);

    const meta = document.createElement("div");
    meta.className = "master-card-meta";
    appendMasterMeta(meta, "MST", v.taxCode);
    appendMasterMeta(meta, t("address"), v.address);
    appendMasterMeta(meta, t("phone"), v.phone);
    appendMasterMeta(meta, t("note"), v.note);
    card.appendChild(meta);

    const del = document.createElement("button");
    del.type = "button";
    del.className = "tx-card-delete";
    del.textContent = "×";
    del.addEventListener("click", async () => {
      if (!confirm(t("masterDeleteConfirm"))) return;
      const r = await api("deleteVendor", { id: v.id });
      if (r.success) {
        showToast(t("msgMasterDeleted"), "success");
        loadVendorMaster();
        loadStores();
      } else {
        showToast(r.message || t("msgError"), "error");
      }
    });
    card.appendChild(del);

    root.appendChild(card);
  });
}

// ============================================================
// Store dashboard
// ============================================================
let dashStore = "";
let dashYear = null;
let dashMonth = null; // 1-12

function fmtPct(v) {
  return ((v || 0) * 100).toFixed(1) + "%";
}

function pctValueFmt(v) {
  // For 比率 already in percent-numeric form (e.g. 25.8)
  return (Number(v) || 0).toFixed(1) + "%";
}

function enterDashboardScreen() {
  loadStores().then(() => {
    fillSelectFromMaster("dashStoreFilter", txStores, "dashSelectStore");
    if (dashYear === null) {
      const now = new Date();
      dashYear = now.getFullYear();
      dashMonth = now.getMonth() + 1;
    }
    document.getElementById("dashMonth").value =
      `${dashYear}-${String(dashMonth).padStart(2, "0")}`;
    if (dashStore) {
      document.getElementById("dashStoreFilter").value = dashStore;
      reloadDashboard();
    } else {
      renderDashboardEmpty();
      renderDailySalesList([]);
    }
  });
}

document.getElementById("dashStoreFilter").addEventListener("change", (e) => {
  dashStore = e.target.value;
  if (dashStore) reloadDashboard();
  else { renderDashboardEmpty(); renderDailySalesList([]); }
});

document.getElementById("dashMonth").addEventListener("change", (e) => {
  const v = e.target.value; // yyyy-MM
  if (/^\d{4}-\d{2}$/.test(v)) {
    dashYear = parseInt(v.slice(0, 4), 10);
    dashMonth = parseInt(v.slice(5, 7), 10);
    if (dashStore) reloadDashboard();
  }
});

document.getElementById("dashPrevMonth").addEventListener("click", () => {
  dashMonth -= 1;
  if (dashMonth < 1) { dashMonth = 12; dashYear -= 1; }
  document.getElementById("dashMonth").value =
    `${dashYear}-${String(dashMonth).padStart(2, "0")}`;
  if (dashStore) reloadDashboard();
});

document.getElementById("dashNextMonth").addEventListener("click", () => {
  dashMonth += 1;
  if (dashMonth > 12) { dashMonth = 1; dashYear += 1; }
  document.getElementById("dashMonth").value =
    `${dashYear}-${String(dashMonth).padStart(2, "0")}`;
  if (dashStore) reloadDashboard();
});

async function reloadDashboard() {
  if (!dashStore || !dashYear || !dashMonth) return;
  const [dash, dailyList] = await Promise.all([
    api("getDashboard", { store: dashStore, year: dashYear, month: dashMonth }),
    api("listDailySales", { store: dashStore, year: dashYear, month: dashMonth }),
  ]);
  if (dash && dash.success) renderDashboard(dash);
  renderDailySalesList((dailyList && dailyList.items) || []);
}

function renderDashboardEmpty() {
  document.getElementById("dashContent").innerHTML =
    `<div class="dash-empty">${t("dashSelectFirst")}</div>`;
}

function renderDashboard(d) {
  const root = document.getElementById("dashContent");
  root.innerHTML = "";

  // Sales card
  const salesCard = document.createElement("div");
  salesCard.className = "dash-card full-width";
  salesCard.innerHTML = `
    <div class="dash-card-header">
      <div>
        <div class="dash-card-label">${t("dashSalesLabel")}</div>
        <div class="dash-card-sub">${t("dashSalesSub")}</div>
      </div>
      <div class="dash-card-value positive">${fmtVnd(d.sales.total)}</div>
    </div>
    <div class="dash-row">
      <span class="dash-row-label">${t("dashFood")}</span>
      <span class="dash-row-value">${fmtVnd(d.sales.food)}</span>
    </div>
    <div class="dash-row">
      <span class="dash-row-label">${t("dashDrink")}</span>
      <span class="dash-row-value">${fmtVnd(d.sales.drink)}</span>
    </div>
    ${d.sales.other ? `<div class="dash-row">
      <span class="dash-row-label">${t("otherSales")}</span>
      <span class="dash-row-value">${fmtVnd(d.sales.other)}</span>
    </div>` : ""}
    <div class="dash-row">
      <span class="dash-row-label">${t("dashAvgPerCustomer")} / ${t("dashCustomers")}</span>
      <span class="dash-row-value">${fmtVnd(d.sales.avgPerCustomer)} / ${d.sales.customers}人</span>
    </div>
  `;
  root.appendChild(salesCard);

  // Achievement card
  const achCard = document.createElement("div");
  achCard.className = "dash-card";
  const todayPctNum = d.achievement.todayPace * 100;
  const monthPctNum = d.achievement.monthlyProgress * 100;
  achCard.innerHTML = `
    <div class="dash-card-header">
      <div class="dash-card-label">${t("dashTodayPace")}</div>
      <div class="dash-card-value ${todayPctNum >= 100 ? "positive" : ""}">${fmtPct(d.achievement.todayPace)}</div>
    </div>
    <div class="dash-progress">
      <div class="dash-progress-bar ${todayPctNum >= 100 ? "success" : ""}" style="width:${Math.min(todayPctNum, 100)}%"></div>
    </div>
    <div class="dash-card-sub">${fmtVnd(d.sales.total)} / ${fmtVnd(d.target.sales * d.todayDay / d.daysInMonth)}</div>

    <div class="dash-card-header" style="margin-top:14px;">
      <div class="dash-card-label">${t("dashMonthlyProgress")}</div>
      <div class="dash-card-value">${fmtPct(d.achievement.monthlyProgress)}</div>
    </div>
    <div class="dash-progress">
      <div class="dash-progress-bar" style="width:${Math.min(monthPctNum, 100)}%"></div>
    </div>
    <div class="dash-card-sub">${fmtVnd(d.sales.total)} / ${fmtVnd(d.target.sales)}</div>
  `;
  root.appendChild(achCard);

  // Cost ratio card
  const costCard = document.createElement("div");
  costCard.className = "dash-card";
  const totalRatioPct = d.cost.totalRatio * 100;
  const foodRatioPct = d.cost.foodRatio * 100;
  const drinkRatioPct = d.cost.drinkRatio * 100;
  const foodCostTargetPct = d.target.foodCostRatio;
  const drinkCostTargetPct = d.target.drinkCostRatio;
  const totalCostTargetPct = (foodCostTargetPct + drinkCostTargetPct) / 2 || 0;
  const costClass = totalRatioPct > totalCostTargetPct && totalCostTargetPct > 0 ? "negative" : "positive";
  costCard.innerHTML = `
    <div class="dash-card-header">
      <div class="dash-card-label">${t("dashCostRatio")}</div>
      <div>
        <div class="dash-card-value ${costClass}">${pctValueFmt(totalRatioPct)}</div>
      </div>
    </div>
    <div class="dash-row">
      <span class="dash-row-label">${t("dashFood")}</span>
      <span>
        <span class="dash-row-value ${foodCostTargetPct > 0 && foodRatioPct > foodCostTargetPct ? "over" : (foodCostTargetPct > 0 ? "under" : "")}">${pctValueFmt(foodRatioPct)}</span>
        ${foodCostTargetPct > 0 ? `<span class="dash-row-target-label">/ ${t("dashTarget")} ${pctValueFmt(foodCostTargetPct)}</span>` : ""}
      </span>
    </div>
    <div class="dash-row">
      <span class="dash-row-label">${t("dashDrink")}</span>
      <span>
        <span class="dash-row-value ${drinkCostTargetPct > 0 && drinkRatioPct > drinkCostTargetPct ? "over" : (drinkCostTargetPct > 0 ? "under" : "")}">${pctValueFmt(drinkRatioPct)}</span>
        ${drinkCostTargetPct > 0 ? `<span class="dash-row-target-label">/ ${t("dashTarget")} ${pctValueFmt(drinkCostTargetPct)}</span>` : ""}
      </span>
    </div>
  `;
  root.appendChild(costCard);

  // Labor card
  const laborCard = document.createElement("div");
  laborCard.className = "dash-card";
  const laborRatioPct = d.labor.ratio * 100;
  const laborTargetPct = d.target.laborCostRatio;
  const laborClass = laborTargetPct > 0 && laborRatioPct > laborTargetPct ? "negative" : "positive";
  const att = d.labor.attendance || { cost: 0, hours: 0, ratio: 0 };
  const other = d.labor.other || { cost: 0, ratio: 0 };
  laborCard.innerHTML = `
    <div class="dash-card-header">
      <div class="dash-card-label">${t("dashLaborRatio")}</div>
      <div class="dash-card-value ${laborClass}">${pctValueFmt(laborRatioPct)}${laborTargetPct > 0 ? `<span class="dash-card-target">${t("dashTarget")} ${pctValueFmt(laborTargetPct)}</span>` : ""}</div>
    </div>
    <div class="dash-row">
      <span class="dash-row-label">${t("dashLaborCost")}</span>
      <span class="dash-row-value">${fmtVnd(d.labor.cost)}</span>
    </div>
    <div class="dash-row">
      <span class="dash-row-label">${t("dashAttLabor")}</span>
      <span class="dash-row-value">${fmtVnd(att.cost)} (${pctValueFmt(att.ratio * 100)})</span>
    </div>
    <div class="dash-row">
      <span class="dash-row-label">${t("dashOtherLabor")}</span>
      <span>
        <span class="dash-row-value">${fmtVnd(other.cost)} (${pctValueFmt(other.ratio * 100)})</span>
        <button type="button" class="dash-row-edit-btn" id="editOtherLaborBtn">${t("editLabel")}</button>
      </span>
    </div>
    <div class="dash-row">
      <span class="dash-row-label">${t("dashTotalHours")}</span>
      <span class="dash-row-value">${(att.hours || 0).toFixed(1)}h</span>
    </div>
    <div class="dash-row">
      <span class="dash-row-label">${t("dashSalesPerHour")}</span>
      <span class="dash-row-value">${fmtVnd(d.labor.salesPerHour || 0)}</span>
    </div>
  `;
  root.appendChild(laborCard);

  const editBtn = document.getElementById("editOtherLaborBtn");
  if (editBtn) editBtn.addEventListener("click", () => openLaborCostModal(other.cost));

  // Profit card
  const profitCard = document.createElement("div");
  profitCard.className = "dash-card";
  profitCard.innerHTML = `
    <div class="dash-card-header">
      <div class="dash-card-label">${t("dashProfit")}</div>
      <div class="dash-card-value ${d.profit.amount >= 0 ? "positive" : "negative"}">${fmtVnd(d.profit.amount)}</div>
    </div>
    <div class="dash-row">
      <span class="dash-row-label">${t("dashProfitRatio")}</span>
      <span class="dash-row-value">${fmtPct(d.profit.ratio)}</span>
    </div>
  `;
  root.appendChild(profitCard);
}

function renderDailySalesList(items) {
  const root = document.getElementById("dailySalesList");
  root.innerHTML = "";
  if (!items.length) {
    const div = document.createElement("div");
    div.className = "tx-empty";
    div.textContent = t("txEmpty");
    root.appendChild(div);
    return;
  }
  items.forEach((it) => {
    const total = it.foodSales + it.drinkSales + it.otherSales;
    const card = document.createElement("div");
    card.className = "tx-card";

    const row1 = document.createElement("div");
    row1.className = "tx-card-row1";
    const date = document.createElement("span");
    date.className = "tx-card-date";
    date.textContent = it.date;
    const amt = document.createElement("span");
    amt.className = "tx-card-amount";
    amt.textContent = fmtVnd(total);
    row1.appendChild(date);
    row1.appendChild(amt);

    const row3 = document.createElement("div");
    row3.className = "tx-card-row3";
    if (it.foodSales) {
      const s = document.createElement("span");
      s.textContent = `${t("dashFood")} ${fmtVnd(it.foodSales)}`;
      row3.appendChild(s);
    }
    if (it.drinkSales) {
      const s = document.createElement("span");
      s.textContent = `${t("dashDrink")} ${fmtVnd(it.drinkSales)}`;
      row3.appendChild(s);
    }
    if (it.otherSales) {
      const s = document.createElement("span");
      s.textContent = `${t("otherSales")} ${fmtVnd(it.otherSales)}`;
      row3.appendChild(s);
    }
    if (it.customers) {
      const s = document.createElement("span");
      s.textContent = `${t("customers")}: ${it.customers}`;
      row3.appendChild(s);
    }
    if (it.note) {
      const s = document.createElement("span");
      s.textContent = it.note;
      row3.appendChild(s);
    }

    const del = document.createElement("button");
    del.type = "button";
    del.className = "tx-card-delete";
    del.textContent = "×";
    del.addEventListener("click", async () => {
      if (!confirm(t("txDeleteConfirm"))) return;
      const r = await api("deleteDailySales", { id: it.id });
      if (r.success) {
        showToast(t("msgTxDeleted"), "success");
        reloadDashboard();
      }
    });

    card.appendChild(row1);
    card.appendChild(row3);
    card.appendChild(del);
    root.appendChild(card);
  });
}

// --- Daily sales modal ---
document.getElementById("newDailySalesBtn").addEventListener("click", openDailySalesModal);
document.getElementById("dailySalesClose").addEventListener("click", closeDailySalesModal);
document.getElementById("dailySalesCancel").addEventListener("click", closeDailySalesModal);
document.querySelector("#dailySalesModal .modal-backdrop").addEventListener("click", closeDailySalesModal);

function openDailySalesModal() {
  if (!txStores.length) {
    showToast(t("msgNoStores"), "error");
    return;
  }
  document.getElementById("dailySalesForm").reset();
  fillSelectFromMaster("dsStore", txStores, "selectStore");
  if (dashStore) document.getElementById("dsStore").value = dashStore;
  const today = new Date();
  document.getElementById("dsDate").value =
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  document.getElementById("dailySalesModal").classList.remove("hidden");
}

function closeDailySalesModal() {
  document.getElementById("dailySalesModal").classList.add("hidden");
}

document.getElementById("dailySalesForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const $ = (id) => document.getElementById(id).value;
  const payload = {
    store: $("dsStore").trim(),
    date: $("dsDate"),
    foodSales: $("dsFoodSales") || 0,
    drinkSales: $("dsDrinkSales") || 0,
    otherSales: $("dsOtherSales") || 0,
    customers: $("dsCustomers") || 0,
    note: $("dsNote").trim(),
  };
  if (!payload.store || !payload.date) {
    showToast(t("msgRequiredFields"), "error");
    return;
  }
  const r = await api("upsertDailySales", payload);
  if (r.success) {
    showToast(t("msgSaved"), "success");
    closeDailySalesModal();
    if (dashStore) reloadDashboard();
  } else {
    showToast(r.message || t("msgError"), "error");
  }
});

// --- Monthly target modal ---
document.getElementById("newMonthlyTargetBtn").addEventListener("click", openMonthlyTargetModal);
document.getElementById("monthlyTargetClose").addEventListener("click", closeMonthlyTargetModal);
document.getElementById("monthlyTargetCancel").addEventListener("click", closeMonthlyTargetModal);
document.querySelector("#monthlyTargetModal .modal-backdrop").addEventListener("click", closeMonthlyTargetModal);

async function openMonthlyTargetModal() {
  if (!txStores.length) {
    showToast(t("msgNoStores"), "error");
    return;
  }
  document.getElementById("monthlyTargetForm").reset();
  fillSelectFromMaster("mtStore", txStores, "selectStore");
  const ym = (dashYear && dashMonth)
    ? `${dashYear}-${String(dashMonth).padStart(2, "0")}`
    : (function () {
        const t = new Date();
        return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}`;
      })();
  document.getElementById("mtYearMonth").value = ym;
  if (dashStore) {
    document.getElementById("mtStore").value = dashStore;
    // Pre-fill existing target if any
    const r = await api("getMonthlyTarget", { store: dashStore, yearMonth: ym });
    if (r && r.success && r.target) {
      const tgt = r.target;
      const setVal = (id, v) => { document.getElementById(id).value = v || ""; };
      setVal("mtFoodTarget", tgt.foodSalesTarget);
      setVal("mtDrinkTarget", tgt.drinkSalesTarget);
      setVal("mtOtherTarget", tgt.otherSalesTarget);
      setVal("mtFoodCostRatio", tgt.foodCostRatioTarget);
      setVal("mtDrinkCostRatio", tgt.drinkCostRatioTarget);
      setVal("mtLaborRatio", tgt.laborCostRatioTarget);
      setVal("mtNote", tgt.note);
    }
  }
  document.getElementById("monthlyTargetModal").classList.remove("hidden");
}

function closeMonthlyTargetModal() {
  document.getElementById("monthlyTargetModal").classList.add("hidden");
}

document.getElementById("monthlyTargetForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const $ = (id) => document.getElementById(id).value;
  const payload = {
    store: $("mtStore").trim(),
    yearMonth: $("mtYearMonth"),
    foodSalesTarget: $("mtFoodTarget") || 0,
    drinkSalesTarget: $("mtDrinkTarget") || 0,
    otherSalesTarget: $("mtOtherTarget") || 0,
    foodCostRatioTarget: $("mtFoodCostRatio") || 0,
    drinkCostRatioTarget: $("mtDrinkCostRatio") || 0,
    laborCostRatioTarget: $("mtLaborRatio") || 0,
    note: $("mtNote").trim(),
  };
  if (!payload.store || !payload.yearMonth) {
    showToast(t("msgRequiredFields"), "error");
    return;
  }
  const r = await api("upsertMonthlyTarget", payload);
  if (r.success) {
    showToast(t("msgSaved"), "success");
    closeMonthlyTargetModal();
    if (dashStore) reloadDashboard();
  } else {
    showToast(r.message || t("msgError"), "error");
  }
});

// --- Other labor cost edit modal ---
document.getElementById("laborCostClose").addEventListener("click", closeLaborCostModal);
document.getElementById("laborCostCancel").addEventListener("click", closeLaborCostModal);
document.querySelector("#laborCostModal .modal-backdrop").addEventListener("click", closeLaborCostModal);

function openLaborCostModal(currentValue) {
  if (!dashStore || !dashYear || !dashMonth) {
    showToast(t("dashSelectFirst"), "error");
    return;
  }
  const ym = `${dashYear}-${String(dashMonth).padStart(2, "0")}`;
  document.getElementById("laborCostContext").textContent = `${dashStore} / ${ym}`;
  document.getElementById("lcAmount").value = currentValue || "";
  document.getElementById("laborCostModal").classList.remove("hidden");
}

function closeLaborCostModal() {
  document.getElementById("laborCostModal").classList.add("hidden");
}

document.getElementById("laborCostForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const amount = document.getElementById("lcAmount").value || 0;
  const ym = `${dashYear}-${String(dashMonth).padStart(2, "0")}`;
  const r = await api("updateMonthlyLaborCost", {
    store: dashStore,
    yearMonth: ym,
    monthlyLaborCost: amount,
  });
  if (r.success) {
    showToast(t("msgSaved"), "success");
    closeLaborCostModal();
    reloadDashboard();
  } else {
    showToast(r.message || t("msgError"), "error");
  }
});

// ============================================================
// Init
// ============================================================
applyLanguage();
showScreen("dashboardScreen");
setActiveDrawerItem("dashboard");
clearAttendanceUI();
loadUsers();
loadPatterns();
