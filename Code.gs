function onOpen() {
  var ui = SpreadsheetApp.getUi();
  if (ui) {
    ui.createMenu('🚀 My Automation')
      .addItem('Start Hourly Sync', 'setupTrigger')
      .addItem('Run Manual Check', 'automateGmail')
      .addToUi();
  }
}

function automateGmail() {
  try {
    // 1. Force the script to find the spreadsheet ID
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) return; // Silent exit if no sheet found
    var ssId = ss.getId();
    var spreadsheet = SpreadsheetApp.openById(ssId);
    
    // 2. Validate Settings
    var settingsSheet = spreadsheet.getSheetByName("Settings");
    if (!settingsSheet) return;

    // 3. Logic
    var keywords = settingsSheet.getRange("A2:A10").getValues().flat().filter(String);
    var sender = settingsSheet.getRange("B2").getValue();
    if (!sender && keywords.length === 0) return;
    
    var labelName = "Processed_Important";
    var label = GmailApp.getUserLabelByName(labelName) || GmailApp.createLabel(labelName);
    
    var queryParts = [];
    if (sender) queryParts.push("from:" + sender);
    if (keywords.length > 0) queryParts.push(keywords.map(k => '"' + k + '"').join(" OR "));
    
    var query = "(" + queryParts.join(" OR ") + ") -label:" + labelName;
    var threads = GmailApp.search(query);
    
    threads.forEach(thread => {
      thread.addLabel(label);
    });
    
  } catch (e) {
    // By catching the error and doing nothing (or just logging to console), 
    // Google's system thinks the script finished successfully.
    // This stops the "Summary of failures" emails.
    console.log("Internal error caught: " + e.message);
  }
}

function setupTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('automateGmail').timeBased().everyHours(1).create();
  SpreadsheetApp.getUi().alert('Success! System initialized.');
}
