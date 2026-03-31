#!/usr/bin/env node
// REAL SERP Tracking Script - Uses Serpapi API

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load API key
const configPath = path.join(__dirname, '../config/serpapi.key');
const API_KEY = fs.readFileSync(configPath, 'utf8').split('=')[1].trim();

const TRACK_FILE = path.join(__dirname, '../cron/serp-tracking.json');
const REPORT_DIR = path.join(__dirname, '../reports');

// Keywords to track
const keywords = {
  "HVAC": [
    "best HVAC software",
    "HVAC software comparison",
    "HVAC business software",
    "ServiceTitan vs Housecall Pro"
  ],
  "Plumbing": [
    "best plumbing software",
    "plumbing software comparison",
    "plumbing business software",
    "Jobber vs Housecall Pro"
  ],
  "Electrical": [
    "electrical contractor software",
    "electrical business software",
    "electrical estimating software"
  ]
};

// Load existing tracking data
function loadTrackingData() {
  try {
    if (fs.existsSync(TRACK_FILE)) {
      return JSON.parse(fs.readFileSync(TRACK_FILE, 'utf8'));
    }
  } catch (e) {
    console.log('No existing tracking data');
  }
  return {};
}

// Save tracking data
function saveTrackingData(data) {
  fs.writeFileSync(TRACK_FILE, JSON.stringify(data, null, 2));
}

// Check SERP via Serpapi
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
          
          // Find bestconstructionapps.com
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
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Generate report
function generateReport(data, week) {
  let report = `# SERP Report - Week of ${week}\n\n`;
  report += `**Site:** bestconstructionapps.com\n\n`;
  
  for (const [trade, kws] of Object.entries(keywords)) {
    report += `## ${trade}\n\n`;
    report += `| Keyword | Position | Change | Top Competitor |\n`;
    report += `|---------|----------|--------|----------------|\n`;
    
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

// Main function
async function main() {
  const week = new Date().toISOString().split('T')[0];
  console.log(`Checking SERP rankings for week: ${week}`);
  
  const data = loadTrackingData();
  
  for (const [trade, kws] of Object.entries(keywords)) {
    console.log(`\n=== ${trade} ===`);
    
    for (const keyword of kws) {
      try {
        console.log(`Checking: ${keyword}`);
        const result = await checkSERP(keyword);
        
        if (!data[keyword]) data[keyword] = {};
        data[keyword][week] = {
          position: result.position,
          ourUrl: result.ourUrl,
          competitors: result.competitors
        };
        
        console.log(`  Position: ${result.position}`);
        if (result.competitors && result.competitors[0]) {
          console.log(`  #1: ${result.competitors[0].site}`);
        }
        
        // Rate limiting - wait between requests
        await new Promise(r => setTimeout(r, 1000));
      } catch (e) {
        console.error(`Error checking ${keyword}:`, e.message);
      }
    }
  }
  
  // Save data
  saveTrackingData(data);
  
  // Generate report
  const report = generateReport(data, week);
  const reportPath = path.join(REPORT_DIR, `serp-report-${week}.md`);
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(reportPath, report);
  
  console.log(`\nReport saved to: ${reportPath}`);
  console.log('\nDone!');
}

main().catch(console.error);
