#!/usr/bin/env node
// Enhanced SERP Tracking - More Keywords

const fs = require('fs');
const path = require('path');
const https = require('https');

const configPath = path.join(__dirname, '../config/serpapi.key');
const API_KEY = fs.readFileSync(configPath, 'utf8').split('=')[1].trim();

const TRACK_FILE = path.join(__dirname, '../cron/serp-tracking.json');
const REPORT_DIR = path.join(__dirname, '../reports');

// EXPANDED Keywords - 50 total
const keywords = {
  "HVAC - High Priority": [
    "best HVAC software",
    "HVAC software comparison",
    "HVAC business software",
    "ServiceTitan vs Housecall Pro",
    "ServiceTitan vs FieldEdge",
    "HVAC estimating software",
    "HVAC scheduling software"
  ],
  "HVAC - Long Tail": [
    "HVAC software for small business",
    "affordable HVAC software",
    "HVAC dispatch software",
    "HVAC invoicing software",
    "HVAC CRM software"
  ],
  "Plumbing - High Priority": [
    "best plumbing software",
    "plumbing software comparison",
    "plumbing business software",
    "Jobber vs Housecall Pro",
    "plumbing estimating software"
  ],
  "Plumbing - Long Tail": [
    "plumbing software for small business",
    "plumbing dispatch software",
    "plumbing invoicing software",
    "plumbing scheduling software",
    "affordable plumbing software"
  ],
  "Electrical - High Priority": [
    "electrical contractor software",
    "electrical business software",
    "electrical estimating software",
    "electrical project management software"
  ],
  "Electrical - Long Tail": [
    "electrical contractor estimating software",
    "electrical contractor management software",
    "electrical scheduling software",
    "electrical invoicing software"
  ],
  "General Construction": [
    "best construction software",
    "construction software comparison",
    "construction management software",
    "Procore vs Buildertrend",
    "construction software for small business",
    "free construction software"
  ],
  "Field Service": [
    "best field service software",
    "field service management software",
    "field service software comparison"
  ]
};

// Same functions as before...
function loadTrackingData() {
  try {
    if (fs.existsSync(TRACK_FILE)) {
      return JSON.parse(fs.readFileSync(TRACK_FILE, 'utf8'));
    }
  } catch (e) {}
  return {};
}

function saveTrackingData(data) {
  fs.writeFileSync(TRACK_FILE, JSON.stringify(data, null, 2));
}

async function checkSERP(keyword) {
  return new Promise((resolve, reject) => {
    const url = `https://serpapi.com/search?engine=google&q=${encodeURIComponent(keyword)}&api_key=${API_KEY}&num=100`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const organicResults = json.organic_results || [];
          let position = null;
          let ourUrl = null;
          for (let i = 0; i < organicResults.length; i++) {
            const link = organicResults[i].link || '';
            if (link.includes('bestconstructionapps.com')) {
              position = i + 1;
              ourUrl = link;
              break;
            }
          }
          resolve({
            keyword,
            position: position || 'NOT RANKING',
            ourUrl,
            competitors: organicResults.slice(0, 5).map((r, i) => ({
              position: i + 1,
              site: new URL(r.link).hostname,
              title: r.title
            }))
          });
        } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function generateReport(data, week) {
  let report = `# SERP Report - Week of ${week}\n\n`;
  report += `**Site:** bestconstructionapps.com\n`;
  report += `**Total Keywords:** ${Object.keys(keywords).reduce((a, b) => a + keywords[b].length, 0)}\n\n`;
  
  for (const [category, kws] of Object.entries(keywords)) {
    report += `## ${category}\n\n`;
    report += `| Keyword | Position | Change | #1 Competitor |\n`;
    report += `|---------|----------|--------|---------------|\n`;
    
    for (const keyword of kws) {
      const currentRank = data[keyword]?.[week]?.position || 'NOT RANKING';
      const prevWeeks = Object.keys(data[keyword] || {}).filter(w => w < week).sort();
      const prevRank = prevWeeks.length > 0 ? data[keyword][prevWeeks[prevWeeks.length - 1]]?.position : null;
      
      let change = '-';
      if (currentRank !== 'NOT RANKING' && prevRank !== null && prevRank !== 'NOT RANKING') {
        const diff = prevRank - currentRank;
        change = diff > 0 ? `↑${diff}` : diff < 0 ? `↓${Math.abs(diff)}` : '→';
      }
      
      const competitor = data[keyword]?.[week]?.competitors?.[0]?.site || '-';
      report += `| ${keyword} | ${currentRank} | ${change} | ${competitor} |\n`;
    }
    report += `\n`;
  }
  
  return report;
}

async function main() {
  const week = new Date().toISOString().split('T')[0];
  const totalKeywords = Object.values(keywords).reduce((a, b) => a + b.length, 0);
  console.log(`Checking ${totalKeywords} keywords for week: ${week}\n`);
  
  const data = loadTrackingData();
  let searchCount = 0;
  
  for (const [category, kws] of Object.entries(keywords)) {
    console.log(`\n=== ${category} ===`);
    
    for (const keyword of kws) {
      try {
        searchCount++;
        console.log(`[${searchCount}/${totalKeywords}] ${keyword}`);
        const result = await checkSERP(keyword);
        
        if (!data[keyword]) data[keyword] = {};
        data[keyword][week] = {
          position: result.position,
          ourUrl: result.ourUrl,
          competitors: result.competitors
        };
        
        if (result.position !== 'NOT RANKING') {
          console.log(`  ✅ Position: ${result.position}`);
        } else {
          console.log(`  ❌ NOT RANKING`);
        }
        
        // Rate limit - 1 second between requests
        await new Promise(r => setTimeout(r, 1000));
      } catch (e) {
        console.error(`  ⚠️ Error: ${e.message}`);
      }
    }
  }
  
  saveTrackingData(data);
  
  const report = generateReport(data, week);
  const reportPath = path.join(REPORT_DIR, `serp-report-${week}.md`);
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(reportPath, report);
  
  console.log(`\n✅ Report saved to: ${reportPath}`);
  console.log(`📊 Used ${searchCount} of 250 monthly searches`);
}

main().catch(console.error);
