#!/usr/bin/env node
// 40 Keywords - Weekly SERP Tracker

const fs = require('fs');
const path = require('path');
const https = require('https');

const configPath = path.join(__dirname, '../config/serpapi.key');
const API_KEY = fs.readFileSync(configPath, 'utf8').split('=')[1].trim();

const TRACK_FILE = path.join(__dirname, '../cron/serp-tracking.json');
const REPORT_DIR = path.join(__dirname, '../reports');

// 40 Keywords - Same list every week
const keywords = [
  // HVAC (10)
  "best HVAC software",
  "HVAC software comparison",
  "HVAC business software",
  "HVAC software for small business",
  "ServiceTitan vs Housecall Pro",
  "ServiceTitan vs FieldEdge",
  "HVAC estimating software",
  "HVAC scheduling software",
  "HVAC dispatch software",
  "HVAC invoicing software",

  // Plumbing (10)
  "best plumbing software",
  "plumbing software comparison",
  "plumbing business software",
  "plumbing software for small business",
  "Jobber vs Housecall Pro",
  "plumbing estimating software",
  "plumbing dispatch software",
  "plumbing invoicing software",
  "plumbing scheduling software",
  "affordable plumbing software",

  // Electrical (10)
  "electrical contractor software",
  "electrical business software",
  "electrical estimating software",
  "electrical project management software",
  "electrical contractor estimating software",
  "electrical contractor management software",
  "electrical scheduling software",
  "electrical invoicing software",
  "best electrical estimating software",
  "electrician software",

  // General Construction (10)
  "best construction software",
  "construction software comparison",
  "construction management software",
  "construction software for small business",
  "Procore vs Buildertrend",
  "free construction software",
  "best field service software",
  "field service management software",
  "construction CRM software",
  "contractor software"
];

// Load existing data
function loadTrackingData() {
  try {
    if (fs.existsSync(TRACK_FILE)) {
      return JSON.parse(fs.readFileSync(TRACK_FILE, 'utf8'));
    }
  } catch (e) {}
  return {};
}

// Save data
function saveTrackingData(data) {
  fs.writeFileSync(TRACK_FILE, JSON.stringify(data, null, 2));
}

// Check SERP
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
            topResult: organicResults[0]?.link || '-'
          });
        } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

// Generate report
function generateReport(data, week) {
  let report = `# Weekly SERP Report - ${week}\n\n`;
  report += `**Site:** bestconstructionapps.com\n`;
  report += `**Keywords tracked:** 40\n\n`;
  
  // Group by category
  const categories = {
    "HVAC (10)": keywords.slice(0, 10),
    "Plumbing (10)": keywords.slice(10, 20),
    "Electrical (10)": keywords.slice(20, 30),
    "General Construction (10)": keywords.slice(30, 40)
  };
  
  let totalRanking = 0;
  
  for (const [cat, kws] of Object.entries(categories)) {
    report += `## ${cat}\n\n`;
    report += `| Keyword | Rank | Change | #1 Result |\n`;
    report += `|---------|------|--------|-----------|\n`;
    
    for (const keyword of kws) {
      const current = data[keyword]?.[week];
      const position = current?.position || 'NOT RANKING';
      
      if (position !== 'NOT RANKING') totalRanking++;
      
      // Get previous week
      const prevWeeks = Object.keys(data[keyword] || {}).filter(w => w < week).sort();
      const prevRank = prevWeeks.length > 0 ? data[keyword][prevWeeks[prevWeeks.length - 1]]?.position : null;
      
      let change = '-';
      if (position !== 'NOT RANKING' && prevRank && prevRank !== 'NOT RANKING') {
        const diff = prevRank - position;
        change = diff > 0 ? `↑${diff}` : diff < 0 ? `↓${Math.abs(diff)}` : '→';
      }
      
      const topResult = current?.topResult ? new URL(current.topResult).hostname : '-';
      report += `| ${keyword} | ${position} | ${change} | ${topResult} |\n`;
    }
    report += `\n`;
  }
  
  report += `## Summary\n\n`;
  report += `| Metric | Value |\n`;
  report += `|--------|-------|\n`;
  report += `| Total Keywords | 40 |\n`;
  report += `| Ranking | ${totalRanking} |\n`;
  report += `| Not Ranking | ${40 - totalRanking} |\n`;
  
  return report;
}

// Main
async function main() {
  const week = new Date().toISOString().split('T')[0];
  console.log(`=== SERP Tracker - ${week} ===\n`);
  console.log(`Tracking 40 keywords...\n`);
  
  const data = loadTrackingData();
  let searchCount = 0;
  
  for (const keyword of keywords) {
    searchCount++;
    try {
      process.stdout.write(`[${searchCount}/40] ${keyword.substring(0, 40)}...`);
      
      const result = await checkSERP(keyword);
      
      if (!data[keyword]) data[keyword] = {};
      data[keyword][week] = {
        position: result.position,
        ourUrl: result.ourUrl,
        topResult: result.topResult
      };
      
      if (result.position !== 'NOT RANKING') {
        console.log(` ✅ #${result.position}`);
      } else {
        console.log(` ❌`);
      }
      
      // Wait 1 second between requests
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.log(` ⚠️ Error`);
    }
  }
  
  saveTrackingData(data);
  
  const report = generateReport(data, week);
  const reportPath = path.join(REPORT_DIR, `serp-report-${week}.md`);
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(reportPath, report);
  
  console.log(`\n✅ Report: ${reportPath}`);
  console.log(`📊 Used ${searchCount} of 250 monthly searches`);
  console.log(`📅 Next check: 1 week`);
}

main().catch(console.error);
