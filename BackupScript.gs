  /**
  * ============================================================
  *  Daily Spreadsheet Backup (Excel) to Google Drive
  * ============================================================
  *
  *  別の Apps Script プロジェクトとして動かすことを想定しています。
  *  本体 (Code.gs) とは独立して時刻トリガーで実行されます。
  *
  *  使い方:
  *    1. https://script.google.com から新しいプロジェクトを作成
  *    2. このファイルの内容を全てコピペして保存
  *    3. 下の SPREADSHEET_ID と DRIVE_FOLDER_ID を自分の環境に書き換える
  *    4. メニューから関数 `setupDailyTrigger` を一度実行
  *       (初回は OAuth 承認ダイアログが出るので「許可」)
  *    5. 以降は毎日 12:00 (JST) に自動で Excel が Drive に保存される
  *
  *  手動テスト:
  *    関数 `dailyBackup` を直接実行すれば即時バックアップできます。
  *
  *  生成されるファイル名:
  *    {元のシート名}_yyyyMMdd_HHmm.xlsx
  * ============================================================
  */

  // バックアップ対象のスプレッドシート ID
  // (スプレッドシートURLの /d/ と /edit の間の長い文字列)
  var SPREADSHEET_ID = "PASTE_YOUR_SPREADSHEET_ID_HERE";

  // 保存先 Google Drive フォルダの ID
  // (フォルダURLの /folders/ 以降の長い文字列)
  var DRIVE_FOLDER_ID = "PASTE_YOUR_DRIVE_FOLDER_ID_HERE";

  // 日本時間で実行する時刻 (24時間制)
  var TRIGGER_HOUR_JST = 12;

  // バックアップ世代管理: 同名(同日同時刻)のファイルがある場合に上書きするか
  // true  : 同日同時刻のファイルがあれば一旦削除してから保存
  // false : 常に新規ファイルとして保存(世代が無限に増える)
  var OVERWRITE_SAME_NAME = false;


  // ----------------------------------------------------------------
  // メイン: 1回分のバックアップを実行
  // ----------------------------------------------------------------
  function dailyBackup() {
    if (!SPREADSHEET_ID || SPREADSHEET_ID.indexOf("PASTE_") === 0) {
      throw new Error("SPREADSHEET_ID を設定してください");
    }
    if (!DRIVE_FOLDER_ID || DRIVE_FOLDER_ID.indexOf("PASTE_") === 0) {
      throw new Error("DRIVE_FOLDER_ID を設定してください");
    }

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var ssName = ss.getName();

    // 日本時間でタイムスタンプを作る
    var now = new Date();
    var stamp = Utilities.formatDate(now, "Asia/Tokyo", "yyyyMMdd_HHmm");
    var fileName = ssName + "_" + stamp + ".xlsx";

    var folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);

    if (OVERWRITE_SAME_NAME) {
      var existing = folder.getFilesByName(fileName);
      while (existing.hasNext()) {
        existing.next().setTrashed(true);
      }
    }

    // Google Sheets を xlsx 形式でエクスポート
    var url = "https://docs.google.com/spreadsheets/d/" + SPREADSHEET_ID +
              "/export?format=xlsx";
    var response = UrlFetchApp.fetch(url, {
      headers: {
        Authorization: "Bearer " + ScriptApp.getOAuthToken(),
      },
      muteHttpExceptions: true,
    });

    var status = response.getResponseCode();
    if (status !== 200) {
      throw new Error(
        "Excel export failed: HTTP " + status + " — " + response.getContentText().slice(0, 200)
      );
    }

    var blob = response.getBlob().setName(fileName);
    var file = folder.createFile(blob);

    Logger.log("Backup saved: " + file.getName() + " (id=" + file.getId() + ")");
    return file.getId();
  }


  // ----------------------------------------------------------------
  // 毎日 JST 12:00 に dailyBackup を呼ぶトリガーを設置 (1回だけ実行)
  // ----------------------------------------------------------------
  function setupDailyTrigger() {
    // 既存の同名トリガーがあれば削除して重複を防ぐ
    var triggers = ScriptApp.getProjectTriggers();
    for (var i = 0; i < triggers.length; i++) {
      if (triggers[i].getHandlerFunction() === "dailyBackup") {
        ScriptApp.deleteTrigger(triggers[i]);
      }
    }

    // 日本時間で TRIGGER_HOUR_JST 時に起動
    // (Apps Script のトリガー時刻はスクリプトのタイムゾーン基準のため、
    //  プロジェクト設定でタイムゾーンを Asia/Tokyo にしておくこと)
    ScriptApp.newTrigger("dailyBackup")
      .timeBased()
      .everyDays(1)
      .atHour(TRIGGER_HOUR_JST)
      .nearMinute(0)
      .create();

    Logger.log("Trigger installed: dailyBackup runs daily at " + TRIGGER_HOUR_JST + ":00 JST");
  }


  // ----------------------------------------------------------------
  // インストール済みトリガーを全て削除 (停止したい時に使用)
  // ----------------------------------------------------------------
  function removeDailyTrigger() {
    var triggers = ScriptApp.getProjectTriggers();
    var removed = 0;
    for (var i = 0; i < triggers.length; i++) {
      if (triggers[i].getHandlerFunction() === "dailyBackup") {
        ScriptApp.deleteTrigger(triggers[i]);
        removed++;
      }
    }
    Logger.log("Removed " + removed + " trigger(s)");
  }
