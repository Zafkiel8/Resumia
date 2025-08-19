const express = require('express');
const database = require('../config/database');
const rssService = require('../services/rssService');

const router = express.Router();

// GET /api/news - Get articles with filtering
router.get('/', async (req, res) => {
  try {
    const {
      topic,
      country,
      lang = 'es',
      limit = 20,
      offset = 0,
      status = 'published'
    } = req.query;

    let query = `
      SELECT 
        a.*,
        s.name as source_name,
        s.url as source_url
      FROM articles a
      JOIN sources s ON a.source_id = s.id
      WHERE a.status = ? AND a.lang = ?
    `;
    
    const params = [status, lang];

    // Add topic filter
    if (topic && topic !== 'todas') {
      query += ` AND (a.topics LIKE ? OR a.country = ?)`;
      params.push(`%"${topic}"%`, topic);
    }

    // Add country filter
    if (country && country !== 'todas') {
      query += ` AND a.country = ?`;
      params.push(country);
    }

    query += ` ORDER BY a.published_at DESC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));

    const articles = await database.query(query, params);

    // Parse JSON fields and format response
    const formattedArticles = articles.map(article => ({
      id: article.id,
      title: article.title,
      canonical_url: article.canonical_url,
      published_at: article.published_at,
      summary_bullets: JSON.parse(article.summary_bullets || '[]'),
      summary_paragraph: article.summary_paragraph,
      topics: JSON.parse(article.topics || '[]'),
      country: article.country,
      source: {
        name: article.source_name,
        url: article.source_url
      },
      lang: article.lang,
      reading_time: article.reading_time
    }));

    res.json({
      articles: formattedArticles,
      total: formattedArticles.length,
      hasMore: formattedArticles.length === parseInt(limit)
    });

  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/news/:id - Get single article
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const articles = await database.query(`
      SELECT 
        a.*,
        s.name as source_name,
        s.url as source_url
      FROM articles a
      JOIN sources s ON a.source_id = s.id
      WHERE a.id = ?
    `, [id]);

    if (articles.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const article = articles[0];
    const formattedArticle = {
      id: article.id,
      title: article.title,
      canonical_url: article.canonical_url,
      published_at: article.published_at,
      summary_bullets: JSON.parse(article.summary_bullets || '[]'),
      summary_paragraph: article.summary_paragraph,
      topics: JSON.parse(article.topics || '[]'),
      country: article.country,
      source: {
        name: article.source_name,
        url: article.source_url
      },
      lang: article.lang,
      reading_time: article.reading_time
    };

    res.json(formattedArticle);

  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/news/fetch-news - Manually trigger news fetching
router.post('/fetch-news', async (req, res) => {
  try {
    console.log('Manual news fetch triggered');
    const articlesProcessed = await rssService.fetchAllSources();
    
    res.json({
      success: true,
      message: `Successfully processed ${articlesProcessed} articles`,
      articlesProcessed
    });

  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch news',
      details: error.message 
    });
  }
});

// GET /api/news/sources - Get all sources
router.get('/sources', async (req, res) => {
  try {
    const sources = await database.query(`
      SELECT 
        s.*,
        COUNT(a.id) as article_count,
        MAX(a.published_at) as latest_article
      FROM sources s
      LEFT JOIN articles a ON s.id = a.source_id
      GROUP BY s.id
      ORDER BY s.name
    `);

    res.json(sources);

  } catch (error) {
    console.error('Error fetching sources:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/news/stats - Get statistics
router.get('/stats', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const [
      totalArticles,
      todayArticles,
      activeSources
    ] = await Promise.all([
      database.query('SELECT COUNT(*) as count FROM articles WHERE status = "published"'),
      database.query('SELECT COUNT(*) as count FROM articles WHERE DATE(published_at) = ? AND status = "published"', [today]),
      database.query('SELECT COUNT(*) as count FROM sources WHERE active = 1')
    ]);

    res.json({
      totalArticles: totalArticles[0].count,
      todayArticles: todayArticles[0].count,
      activeSources: activeSources[0].count,
      timeSaved: Math.round(totalArticles[0].count * 2.5 / 60 * 10) / 10 // Estimate hours saved
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;