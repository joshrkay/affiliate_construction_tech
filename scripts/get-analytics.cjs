const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: './config/ga-credentials.json'
});

async function getAnalytics() {
  const propertyId = '527747944';
  
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      { startDate: '30daysAgo', endDate: 'today' },
    ],
    dimensions: [
      { name: 'pagePath' },
    ],
    metrics: [
      { name: 'sessions' },
      { name: 'totalUsers' },
      { name: 'screenPageViews' },
    ],
    limit: 20
  });

  console.log('=== BUILTECH Analytics Report ===\n');
  console.log('Top Pages (Last 30 Days):\n');
  
  if (response.rows) {
    response.rows.forEach((row, index) => {
      const path = row.dimensionValues[0].value;
      const sessions = row.metricValues[0].value;
      const users = row.metricValues[1].value;
      const views = row.metricValues[2].value;
      console.log(`${index + 1}. ${path}`);
      console.log(`   Sessions: ${sessions} | Users: ${users} | Views: ${views}`);
    });
  }

  // Get totals
  const [totals] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      { startDate: '30daysAgo', endDate: 'today' },
    ],
    metrics: [
      { name: 'sessions' },
      { name: 'totalUsers' },
      { name: 'screenPageViews' },
      { name: 'averageSessionDuration' },
    ],
  });

  console.log('\n=== Summary ===');
  if (totals.rows) {
    const totalSessions = totals.rows[0].metricValues[0].value;
    const totalUsers = totals.rows[0].metricValues[1].value;
    const totalViews = totals.rows[0].metricValues[2].value;
    const avgDuration = parseFloat(totals.rows[0].metricValues[3].value).toFixed(2);
    
    console.log(`Total Sessions: ${totalSessions}`);
    console.log(`Total Users: ${totalUsers}`);
    console.log(`Total Page Views: ${totalViews}`);
    console.log(`Avg Session Duration: ${avgDuration} seconds`);
  }
}

getAnalytics().catch(console.error);
