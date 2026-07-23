const express = require('express');
const cors = require('cors');
const cron = require('node-cron');


const { initDb, getAllArticles } = require('./db');
const { runAllScrapers } = require('./scraper');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize Database
initDb();

// Endpoints
app.get('/api/news', async (req, res) => {
  try {
    const articles = await getAllArticles();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/scrape', async (req, res) => {
  try {
    const results = await runAllScrapers();
    res.json({ message: 'Scraping triggered successfully', results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Schedule scraping daily at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running scheduled daily scraping...');
  runAllScrapers();
});

app.listen(PORT, async () => {
  console.log(`VesselNews Backend running on http://localhost:${PORT}`);
  
  // Run an initial scrape on startup if db is empty or just for PoC
  console.log("Running initial data population...");
  await runAllScrapers();
});
