/**
 * Iron Condors Academy — Google Apps Script pass-record endpoint
 *
 * Setup:
 * 1. Create a Google Sheet and copy its spreadsheet ID.
 * 2. Paste the ID below.
 * 3. Deploy this script as a Web App: Execute as "Me"; access "Anyone".
 * 4. Copy the Web App URL into config.js as recordsEndpoint.
 */
const SPREADSHEET_ID = 'PASTE_SPREADSHEET_ID_HERE';
const SHEET_NAME = 'Exam Passes';

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (data.event !== 'exam_pass') {
      return jsonResponse({ ok: false, error: 'Unsupported event' });
    }

    const sheet = getOrCreateSheet_();
    sheet.appendRow([
      new Date(),
      clean_(data.name),
      clean_(data.course),
      clean_(data.level),
      clean_(data.examKey),
      Number(data.score) || 0,
      Number(data.correct) || 0,
      Number(data.total) || 0,
      clean_(data.date),
      clean_(data.certId),
      clean_(data.verifyUrl),
      clean_(data.userAgent)
    ]);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function getOrCreateSheet_() {
  if (!SPREADSHEET_ID || SPREADSHEET_ID === 'PASTE_SPREADSHEET_ID_HERE') {
    throw new Error('Set SPREADSHEET_ID before deployment.');
  }
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Received At', 'Candidate Name', 'Course', 'Level', 'Exam Key',
      'Score %', 'Correct', 'Total', 'Completion Date', 'Certificate ID',
      'Verification URL', 'User Agent'
    ]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function clean_(value) {
  return String(value == null ? '' : value).slice(0, 2000);
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
