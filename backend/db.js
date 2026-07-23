const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'maritime.db');
const db = new sqlite3.Database(dbPath);

function initDb() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS articles (
        id TEXT PRIMARY KEY,
        title TEXT,
        source TEXT,
        category TEXT,
        convention TEXT,
        impact TEXT,
        publishDate TEXT,
        implementationDate TEXT,
        sourceUrl TEXT,
        fullText TEXT,
        isNew BOOLEAN DEFAULT 1
      )
    `);
  });
}

function saveArticle(article) {
  return new Promise((resolve, reject) => {
    const stmtArticle = db.prepare(`
      INSERT OR REPLACE INTO articles (
        id, title, source, category, convention, impact, 
        publishDate, implementationDate, sourceUrl, fullText, isNew
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmtArticle.run(
      article.id, article.title, article.source, article.category, 
      article.convention, article.impact, article.publishDate, 
      article.implementationDate, article.sourceUrl, article.fullText, true,
      function(err) {
        if (err) reject(err);
        else resolve();
      }
    );
    stmtArticle.finalize();
  });
}

function getAllArticles() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM articles ORDER BY publishDate DESC', (err, articles) => {
      if (err) return reject(err);
      
      const fullArticles = articles.map(article => {
        article.isNew = article.isNew === 1;
        return article;
      });
      resolve(fullArticles);
    });
  });
}

function articleExists(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT 1 FROM articles WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(!!row);
    });
  });
}

module.exports = { initDb, saveArticle, getAllArticles, articleExists };
