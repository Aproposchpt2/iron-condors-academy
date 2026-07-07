# Iron Condors Academy Certification Site

A deployable static exam site containing Basic, Intermediate, and Advanced Iron Condor certification exams.

## Included

- `index.html` — responsive exam application
- `verify.html` — certificate ID integrity checker
- `iron-condors-basic-exam.json` — 25-question Basic bank
- `iron-condors-intermediate-exam.json` — 25-question Intermediate bank
- `iron-condors-advanced-exam.json` — 25-question Advanced bank
- `config.js` — deployment settings
- `records-endpoint.gs` — optional Google Sheets pass-record endpoint
- `netlify.toml` — clean routes and security headers for Netlify

## Exam URLs

- `/?exam=basic`
- `/?exam=intermediate`
- `/?exam=advanced`
- `/verify.html`

The site defaults to the Basic exam when no query parameter is supplied.

## Deploy

Upload the entire folder to any static host. For Netlify, drag the folder into Netlify Drop or connect it to a repository. The site automatically detects its deployed base URL.

## Record passing results

1. Create a Google Sheet.
2. Open Apps Script and paste `records-endpoint.gs`.
3. Set `SPREADSHEET_ID`.
4. Deploy the script as a Web App.
5. Paste the Web App URL into `config.js`:

```js
window.IRON_CONDORS_CONFIG = {
  siteBase: "",
  recordsEndpoint: "https://script.google.com/macros/s/REPLACE_ME/exec"
};
```

With the endpoint blank, passing records are written only to the browser console.

## Certificate verification scope

The included verifier checks the certificate ID structure, checksum, and score consistency. This detects accidental edits and most mistyped IDs, but it is not a cryptographic issuer registry. For high-assurance verification, issue certificates through a server that stores each certificate or digitally signs records with a private key.

## Editing questions

Edit the appropriate JSON file. Each question uses this schema:

```json
{
  "id": 1,
  "topic": "Topic",
  "question": "Question text",
  "options": ["A", "B", "C", "D"],
  "answerIndex": 0,
  "answer": "A"
}
```

The application also contains a built-in copy of all three banks so it can still run if local JSON loading is blocked. After changing a JSON file, update the embedded `EXAM_BANKS` object in `index.html` before distributing a standalone offline copy.
