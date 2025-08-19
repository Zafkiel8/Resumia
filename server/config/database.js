const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = process.env.DATABASE_URL || path.join(__dirname, '../database.sqlite');

class Database {
  constructor() {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
      } else {
        console.log('Connected to SQLite database');
        this.initTables();
      }
    });
  }

  initTables() {
    // Sources table
    this.db.run(`
      CREATE TABLE IF NOT EXISTS sources (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        url TEXT NOT NULL,
        rss_url TEXT NOT NULL,
        lang TEXT DEFAULT 'es',
        country TEXT DEFAULT 'mundo',
        source_score INTEGER DEFAULT 5,
        active BOOLEAN DEFAULT 1,
        last_checked_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Articles table
    this.db.run(`
      CREATE TABLE IF NOT EXISTS articles (
        id TEXT PRIMARY KEY,
        source_id TEXT,
        title TEXT NOT NULL,
        canonical_url TEXT UNIQUE NOT NULL,
        published_at DATETIME NOT NULL,
        summary_bullets TEXT, -- JSON array
        summary_paragraph TEXT,
        topics TEXT, -- JSON array
        country TEXT,
        lang TEXT DEFAULT 'es',
        reading_time INTEGER DEFAULT 3,
        status TEXT DEFAULT 'pending', -- pending, processed, published
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (source_id) REFERENCES sources (id)
      )
    `);

    // Insert default sources
    this.insertDefaultSources();
  }

  insertDefaultSources() {
    const defaultSources = [
      {
        id: 'elpais',
        name: 'El País',
        url: 'https://elpais.com',
        rss_url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada',
        country: 'espana'
      },
      {
        id: 'elmundo',
        name: 'El Mundo',
        url: 'https://elmundo.es',
        rss_url: 'https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml',
        country: 'espana'
      },
      {
        id: 'techcrunch',
        name: 'TechCrunch',
        url: 'https://techcrunch.com',
        rss_url: 'https://techcrunch.com/feed/',
        country: 'mundo'
      },
      {
        id: 'bbc-mundo',
        name: 'BBC Mundo',
        url: 'https://bbc.com/mundo',
        rss_url: 'https://feeds.bbci.co.uk/mundo/rss.xml',
        country: 'mundo'
      },
      {
        id: 'marca',
        name: 'Marca',
        url: 'https://marca.com',
        rss_url: 'https://e00-marca.uecdn.es/rss/portada.xml',
        country: 'espana'
      },
      {
        id: 'coindesk',
        name: 'CoinDesk',
        url: 'https://coindesk.com',
        rss_url: 'https://feeds.coindesk.com/rss',
        country: 'mundo'
      }
    ];

    defaultSources.forEach(source => {
      this.db.run(
        `INSERT OR IGNORE INTO sources (id, name, url, rss_url, country) 
         VALUES (?, ?, ?, ?, ?)`,
        [source.id, source.name, source.url, source.rss_url, source.country]
      );
    });
  }

  query(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    });
  }

  close() {
    return new Promise((resolve) => {
      this.db.close((err) => {
        if (err) console.error('Error closing database:', err.message);
        else console.log('Database connection closed');
        resolve();
      });
    });
  }
}

module.exports = new Database();