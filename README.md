# CareerBuild AI — Instructor Recruitment

Instructor recruitment landing page for CareerBuild AI. Built with Next.js, React, and Tailwind CSS.

## Features

- Sticky navigation with apply modal
- Hero, revenue, platform, and process sections
- Life sciences course catalog (CareerBuild AI × BioBuzz partnership)
- Interactive FAQ accordion
- Application forms with Google Sheets sync

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Application Form → Google Sheets

Submissions are saved locally to `data/` as JSON backups. To sync into a spreadsheet:

1. Create a [Google Sheet](https://sheets.google.com).
2. Copy the **Spreadsheet ID** from the URL.
3. Open **Extensions → Apps Script**, paste `scripts/google-sheets-webhook.gs`, set `SPREADSHEET_ID`, and save.
4. **Deploy → New deployment → Web app** (Execute as: Me, Access: Anyone).
5. Copy the deployment URL into `.env.local`:

```bash
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/xxxx/exec
GOOGLE_SHEETS_WEBHOOK_SECRET=your-secret   # optional
```

6. Restart the dev server.

## Deploy (Netlify)

This is a Next.js app. Netlify uses `@netlify/plugin-nextjs` — **do not** set a publish directory (`dist`) in the Netlify UI.

Set `GOOGLE_SHEETS_WEBHOOK_URL` in Netlify environment variables for production form sync.


- Next.js 15 (App Router)
- React 19
- Tailwind CSS 4
- Lucide React icons
