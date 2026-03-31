#!/usr/bin/env node
// SERP Tracker - Captures TOP 10 Results + Our Position

const fs = require('fs');
const path = require('path');
const https = require('https');

const configPath = path.join(__dirname, '../config/serpapi.key');
const API_KEY = fs.readFileSync(configPath, 'utf8').split('=')[1].trim();

const TRACK_FILE = path.join(__dirname, '../cron/serp-tracking-full.json');
const REPORT_DIR = path.join(__dirname, '../reports');

const keywords = [
  "best HVAC software",
  "HVAC software comparison",
  "HVAC business software",
  "HVAC software for small business",
  "ServiceTitan vs Housecall Pro",
  "best plumbing software",
  "plumbing software comparison",
  "plumbing business software",
  "Jobber vs Housecall Pro",
  "electrical contractor software",
  "electrical business software",
  "electrical estimating software",
  "best construction software",
  "construction software comparison",
  "construction management software"
];

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
    const url = `https://serpapi.com/search?engine=google&q=${encodeURIComponent(keyword)}&api_key=${API_KEY}&num=10`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const organicResults = json.organic_results || [];
          
          // Get top 10
          const top10 = organicResults.slice(0, 10).map((r, i) => ({
            position: i + 1,
            site: new URL(r.link).hostname,
            title: r.title,
            url: r.link
          }));
          
          // Find our position
          let ourPosition = null;
          let ourUrl = null;
          for (let i = 0; i < organicResults.length; i++) {
            const link = organicResults[i].link || '';
            if (link.includes('bestconstructionapps.com')) {
              ourPosition = i + 1;
              ourUrl = link;
              break;
            }
          }
          
          resolve({
            keyword,
            ourPosition: ourPosition || 'NOT RANKING',
            ourUrl,
            top10,
            topResult: top10[0]
          });
        } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function generateReport(data, week) {
  let report = `# SERP Report - Week of ${week}\n\n`;
  report += `**Site:** bestconstructionapps.com\n`;
  report += `**Keywords:** ${keywords.length}\n\n`;
  
  // Summary table
  report += `## Ranking Summary\n\n`;
  report += `| Keyword | Our Rank | #1 Result | What They're Doing |\n`;
  report += `|---------|----------|-----------|--------------------|\n`;
  
  for (const keyword of keywords) {
    const weekData = data[keyword]?.[week];
    const ourRank = weekData?.ourPosition || 'NOT RANKING';
    const topResult = weekData?.top10?.[0];
    
    report += `| ${keyword} | ${ourRank} | ${topResult?.site || '-'} | ${topResult?.title?.substring(0, 40) || '-'}... |\n`;
  }
  
  // Detailed Top 10 for each keyword
  report += `\n## Detailed Top 10 Results\n\n`;
  
  for (const keyword of keywords) {
    const weekData = data[keyword]?.[week];
    const top10 = weekData?.top10 || [];
    
    report += `### ${keyword}\n\n`;
    report += `| # | Site | Title |\n`;
    report += `|---|------|-------|\n`;
    
    for (const result of top10) {
      const isUs = result.site.includes('bestconstructionapps.com');
      const marker = isUs ? ' ⭐' : '';
      report += `| ${result.position} | ${result.site}${marker} | ${result.title?.substring(0, 60) || '-'} |\n`;
    }
    report += `\n`;
  }
  
  // Competitor Analysis
  report += `## Competitor Analysis\n\n`;
  report += `| Competitor | #1 Rankings | Total Top 10 |\n`;
  report += `|------------|-------------|---------------|\n`;
  
  const competitorStats = {};
  for (const keyword of keywords) {
    const top10 = data[keyword]?.[week]?.top10 || [];
    for (const result of top10) {
      if (!competitorStats[result.site]) {
        competitorStats[result.site] = { first: 0, total: 0 };
      }
      if (result.position === 1) competitorStats[result.site].first++;
      competitorStats[result.site].total++;
    }
  }
  
  // Sort by total appearances
  const sortedCompetitors = Object.entries(competitorStats)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 15);
  
  for (const [site, stats] of sortedCompetitors) {
    report += `| ${site} | ${stats.first} | ${stats.total} |\n`;
  }
  
  return report;
}

async function main() {
  const week = new Date().toISOString().split('T')[0];
  console.log(`=== SERP Tracker - ${week} ===\n`);
  console.log(`Tracking ${keywords.length} keywords (Top 10 for each)\n`);
  
  const data = loadTrackingData();
  let searchCount = 0;
  
  for (const keyword of keywords) {
    searchCount++;
    try {
      process.stdout.write(`[${searchCount}/${keywords.length}] ${keyword.substring(0, 35)}...`);
      
      const result = await checkSERP(keyword);
      
      if (!data[keyword]) data[keyword] = {};
      data[keyword][week] = {
        ourPosition: result.ourPosition,
        ourUrl: result.ourUrl,
        top10: result.top10,
        topResult: result.topResult
      };
      
      if (result.ourPosition !== 'NOT RANKING') {
        console.log(` ✅ #${result.ourPosition}`);
      } else {
        console.log(` ❌ (Winner: ${result.top10[0]?.site || '?'})`);
      }
      
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
  
  console.log(`\n✅ Report saved: ${reportPath}`);
  console.log(`📊 Used ${searchCount} searches`);
  console.log(`\nTop competitors winning these keywords:`);
  
  // Show top competitors
  const competitorStats = {};
  for (const keyword of keywords) {
    const top10 = data[keyword]?.[week]?.top10 || [];
    for (const result of top10) {
      if (!competitorStats[result.site]) competitorStats[result.site] = 0;
      competitorStats[result.site]++;
    }
  }
  
  Object.entries(competitorStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .forEach(([site, count]) => console.log(`  ${site}: ${count} rankings`));
}

main().catch(console.error);
