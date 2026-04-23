# Reports

Manual and automated reports on search visibility.

## Weekly GSC report

To get a weekly action list from Google Search Console data:

1. Go to Google Search Console → your property → Performance → Search results
2. Set date range to **Last 3 months** (or whatever window you want)
3. Make sure Clicks, Impressions, CTR, and Position are all toggled on
4. Export each tab as CSV:
   - **Queries** → save as `reports/gsc-queries-90d.csv` (required)
   - **Pages** → save as `reports/gsc-pages-90d.csv` (optional but recommended)
5. Run `npm run gsc:report`

The script produces `reports/gsc-report-YYYY-MM-DD.md` with:

- Totals (clicks, impressions, CTR, weighted avg position)
- **Ripe opportunities** — positions 11–30 with ≥50 impressions (biggest lift targets)
- **Striking distance** — positions 4–10 (already on page 1, need a nudge)
- **High impressions, low CTR** — title/meta rewrite candidates
- **Top-clicking queries** — what's already working
- **Top pages by impressions** (if pages CSV provided)
- **Pages with impressions but zero clicks** (if pages CSV provided)

The script matches the latest CSV in the folder, so you can keep historical
exports (`gsc-queries-2026-03.csv`, `gsc-queries-2026-04.csv`, …) and the
newest one is always used.

## Manual SERP tracking

See `SERP_MANUAL_TRACKING.md` for the spreadsheet-style weekly rank check.
Keep this alongside GSC reports — GSC shows where we actually get impressions,
SERP tracking shows where competitors sit for target queries.
