/**
 * BioBuzz form → Google Sheets
 *
 * SETUP (important):
 * 1. Create a Google Sheet and copy its ID from the URL:
 *    https://docs.google.com/spreadsheets/d/PASTE_THIS_PART/edit
 * 2. Paste that ID into SPREADSHEET_ID below.
 * 3. Extensions → Apps Script → paste this file → Save.
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the /exec URL into .env.local as GOOGLE_SHEETS_WEBHOOK_URL
 * 6. After ANY script change, create a NEW deployment (or Manage deployments → Edit → New version)
 */

const SPREADSHEET_ID = "1vIqsgQ5Y7kcYs3GZxQoSVpSeQY0lfQ18yH2TqktLZSA";
const WEBHOOK_SECRET = "";
const SHEET_NAME = "BioBuzz Submissions";

const HEADERS = [
  "Submitted At",
  "Form Type",
  "Name",
  "Email",
  "Company",
  "LinkedIn",
  "Instructor Kind",
  "Partnership Type",
  "Topic",
  "Expertise",
  "Format",
  "Experience",
  "Audience",
  "Message / Summary",
  "Industry Need",
  "Willing To Teach",
  "Outside Life Sciences",
];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    return processSubmission_(body);
  } catch (err) {
    return jsonResponse_({ success: false, error: String(err) });
  }
}

function processSubmission_(body) {
  if (WEBHOOK_SECRET && body.secret !== WEBHOOK_SECRET) {
    return jsonResponse_({ success: false, error: "Unauthorized" });
  }

  const row = body.submission;
  if (!row) {
    return jsonResponse_({ success: false, error: "Missing submission" });
  }

  if (!SPREADSHEET_ID || SPREADSHEET_ID === "PASTE_YOUR_SPREADSHEET_ID_HERE") {
    return jsonResponse_({
      success: false,
      error: "Set SPREADSHEET_ID in the Apps Script project",
    });
  }

  const sheet = getOrCreateSheet_();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }

  sheet.appendRow([
    row.submittedAt || "",
    row.formType || "",
    row.name || "",
    row.email || "",
    row.company || "",
    row.linkedin || "",
    row.instructorKind || "",
    row.partnershipType || "",
    row.topic || "",
    row.expertise || "",
    row.format || "",
    row.experience || "",
    row.audience || "",
    row.message || "",
    row.industryNeed || "",
    row.willingToTeach || "",
    row.outsideLifeSciences || "",
  ]);

  return jsonResponse_({ success: true });
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
