#!/usr/bin/env node
// SERP Tracking Script for BUILTECH
// Tracks keyword rankings weekly and generates reports

const fs = require('fs');
const path = require('path');

const TRACK_FILE = path.join(__dirname, '../cron/serp-tracking.json');
const REPORT_DIR = path.join(__dirname, '../reports');

// Keywords to track by trade
const keywords = {
  "HVAC": [
    "best HVAC software",
    "HVAC software comparison",
    "HVAC business software",
    "HVAC estimating software",
    "ServiceTitan vs Housecall Pro",
    "ServiceTitan vs FieldEdge"
  ],
  "Plumbing": [
    "best plumbing software",
    "plumbing software comparison",
    "plumbing business software",
    "plumbing estimating software",
    "Jobber vs Housecall Pro"
  ],
  "Electrical": [
    "best electrical estimating software",
    "electrical contractor software",
    "electrical business software",
    "electrical project management software"
  ]
};

// Load existing tracking data
function loadTrackingData() {
  try {
    if (fs.existsSync(TRACK_FILE)) {
      return JSON.parse(fs.readFileSync(TRACK_FILE, 'utf8'));
    }
  } catch (e) {
    console.log('No existing tracking data found');
  }
  return {};
}

// Save tracking data
function saveTrackingData(data) {
  fs.writeFileSync(TRACK_FILE, JSON.stringify(data, null, 2));
}

// Generate report
function generateReport(data) {
  const week = new Date().toISOString().split('T')[0];
  
  let report = `# SERP Tracking Report - ${week}\n\n`;
  
  // Generate table for each trade
  for (const [trade, kws] of Object.entries(keywords)) {
    report += `## ${trade} Keywords\n\n`;
    report += `| Keyword | Rank ${week} | Change | URL |\n`;
    report += `|---------|-----------|--------|-----|\n`;
    
    for (const keyword of kws) {
      const currentRank = data[keyword]?.[week] || 'N/A';
      const previousWeek = Object.keys(data[keyword] || {}).pop();
      const previousRank = previousWeek ? data[keyword][previousWeek] : 'N/A';
      const change = currentRank !== 'N/A' && previousRank !== 'N/A' 
        ? (currentRank < previousRank ? `↑${previousRank - currentRank}` : 
           currentRank > previousRank ? `↓${currentRank - previousRank}` : '→')
        : '-';
      
      report += `| ${keyword} | ${currentRank} | ${change} | [View](https://bestconstructionapps.com) |\n`;
    }
    report += `\n`;
  }
  
  return report;
}

// Track rankings (simulated - would need actual SERP API)
function trackRankings() {
  const week = new Date().toISOString().split('T')[0];
  const data = loadTrackingData();
  
  console.log('Tracking SERP rankings for week:', week);
  
  // For each keyword, we'd check Google rankings
  // For now, simulate with random data
  for (const [trade, kws] of Object.entries(keywords)) {
    for (const keyword of kws) {
      if (!data[keyword]) data[keyword] = {};
      
      // Simulate ranking (replace with actual SERP API)
      // In production, use a service like Serpapi or manually check
      const rank = Math.floor(Math.random() * 100) + 1;
      data[keyword][week] = rank;
      
      console.log(`${keyword}: Position ${rank}`);
    }
  }
  
  // Save data
  saveTrackingData(data);
  
  // Generate report
  const report = generateReport(data);
  
  // Save report
  const reportPath = path.join(REPORT_DIR, `serp-report-${week}.md`);
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(reportPath, report);
  
  console.log(`\nReport saved to: ${reportPath}`);
  return report;
}

// Run tracking
trackRankings();
