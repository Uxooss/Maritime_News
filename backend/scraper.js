const { saveArticle, articleExists } = require('./db');
const { scrapeIMO } = require('./scrapers/imo');
const { scrapeParisMoU } = require('./scrapers/parismou');
const { scrapeUSCG } = require('./scrapers/uscg');
const { scrapeTokyo } = require('./scrapers/tokyo');
const { scrapeBlackSea } = require('./scrapers/blacksea');
const { scrapeRiyadh } = require('./scrapers/riyadh');
const { scrapeIndianOcean } = require('./scrapers/indianocean');
const { scrapeMed } = require('./scrapers/med');
const { scrapeCaribbean } = require('./scrapers/caribbean');
const { scrapeAbuja } = require('./scrapers/abuja');
const { scrapeVinaDelMar } = require('./scrapers/vinadelmar');

async function processArticles(articles) {
  for (const art of articles) {
    if (await articleExists(art.id)) continue;
    await saveArticle(art);
  }
}

async function runAllScrapers() {
  console.log("Starting scraping job...");
  const results = {
    success: [],
    errors: []
  };

  try {
    const imoArticles = await scrapeIMO();
    await processArticles(imoArticles);
    results.success.push("IMO");
  } catch (error) {
    console.error("IMO Scrape Error:", error.message);
    results.errors.push({ source: "IMO", error: error.message });
  }

  try {
    const pmArticles = await scrapeParisMoU();
    await processArticles(pmArticles);
    results.success.push("Paris MoU");
  } catch (error) {
    console.error("Paris MoU Scrape Error:", error.message);
    results.errors.push({ source: "Paris MoU", error: error.message });
  }

  try {
    const uscgArticles = await scrapeUSCG();
    await processArticles(uscgArticles);
    results.success.push("USCG");
  } catch (error) {
    console.error("USCG Scrape Error:", error.message);
    results.errors.push({ source: "USCG", error: error.message });
  }

  try {
    const tokyoArticles = await scrapeTokyo();
    await processArticles(tokyoArticles);
    results.success.push("Tokyo MoU");
  } catch (error) {
    console.error("Tokyo MoU Scrape Error:", error.message);
    results.errors.push({ source: "Tokyo MoU", error: error.message });
  }

  try {
    const bsArticles = await scrapeBlackSea();
    await processArticles(bsArticles);
    results.success.push("Black Sea MoU");
  } catch (error) {
    console.error("Black Sea MoU Scrape Error:", error.message);
    results.errors.push({ source: "Black Sea MoU", error: error.message });
  }

  try {
    const riyadhArticles = await scrapeRiyadh();
    await processArticles(riyadhArticles);
    results.success.push("Riyadh MoU");
  } catch (error) {
    console.error("Riyadh MoU Scrape Error:", error.message);
    results.errors.push({ source: "Riyadh MoU", error: error.message });
  }

  try {
    const ioArticles = await scrapeIndianOcean();
    await processArticles(ioArticles);
    results.success.push("Indian Ocean MoU");
  } catch (error) {
    console.error("Indian Ocean MoU Scrape Error:", error.message);
    results.errors.push({ source: "Indian Ocean MoU", error: error.message });
  }

  try {
    const medArticles = await scrapeMed();
    await processArticles(medArticles);
    results.success.push("Mediterranean MoU");
  } catch (error) {
    console.error("Mediterranean MoU Scrape Error:", error.message);
    results.errors.push({ source: "Mediterranean MoU", error: error.message });
  }

  try {
    const caribArticles = await scrapeCaribbean();
    await processArticles(caribArticles);
    results.success.push("Caribbean MoU");
  } catch (error) {
    console.error("Caribbean MoU Scrape Error:", error.message);
    results.errors.push({ source: "Caribbean MoU", error: error.message });
  }

  try {
    const abujaArticles = await scrapeAbuja();
    await processArticles(abujaArticles);
    results.success.push("Abuja MoU");
  } catch (error) {
    console.error("Abuja MoU Scrape Error:", error.message);
    results.errors.push({ source: "Abuja MoU", error: error.message });
  }

  try {
    const vinaArticles = await scrapeVinaDelMar();
    await processArticles(vinaArticles);
    results.success.push("Viña del Mar");
  } catch (error) {
    console.error("Viña del Mar Scrape Error:", error.message);
    results.errors.push({ source: "Viña del Mar", error: error.message });
  }

  console.log("Scraping job completed.", results);
  return results;
}

module.exports = { runAllScrapers };
