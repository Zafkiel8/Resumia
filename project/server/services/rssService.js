const Parser = require('rss-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');
const database = require('../config/database');

class RSSService {
  constructor() {
    this.parser = new Parser({
      timeout: 10000,
      headers: {
        'User-Agent': 'NewsAI-Bot/1.0'
      }
    });
  }

  async fetchAllSources() {
    try {
      const sources = await database.query('SELECT * FROM sources WHERE active = 1');
      console.log(`Fetching news from ${sources.length} sources...`);
      
      const results = await Promise.allSettled(
        sources.map(source => this.fetchSourceNews(source))
      );

      let totalArticles = 0;
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          totalArticles += result.value;
          console.log(`✓ ${sources[index].name}: ${result.value} articles`);
        } else {
          console.error(`✗ ${sources[index].name}: ${result.reason.message}`);
        }
      });

      console.log(`Total articles processed: ${totalArticles}`);
      return totalArticles;
    } catch (error) {
      console.error('Error fetching all sources:', error);
      throw error;
    }
  }

  async fetchSourceNews(source) {
    try {
      console.log(`Fetching from ${source.name}...`);
      const feed = await this.parser.parseURL(source.rss_url);
      
      let processedCount = 0;
      
      for (const item of feed.items.slice(0, 10)) { // Limit to 10 most recent
        try {
          const article = await this.processArticle(item, source);
          if (article) {
            await this.saveArticle(article);
            processedCount++;
          }
        } catch (error) {
          console.error(`Error processing article from ${source.name}:`, error.message);
        }
      }

      // Update last checked timestamp
      await database.run(
        'UPDATE sources SET last_checked_at = CURRENT_TIMESTAMP WHERE id = ?',
        [source.id]
      );

      return processedCount;
    } catch (error) {
      console.error(`Error fetching ${source.name}:`, error.message);
      throw error;
    }
  }

  async processArticle(item, source) {
    try {
      // Basic article data
      const article = {
        id: uuidv4(),
        source_id: source.id,
        title: this.cleanText(item.title),
        canonical_url: item.link,
        published_at: new Date(item.pubDate || item.isoDate || Date.now()).toISOString(),
        lang: source.lang,
        country: source.country,
        status: 'pending'
      };

      // Check if article already exists
      const existing = await database.query(
        'SELECT id FROM articles WHERE canonical_url = ?',
        [article.canonical_url]
      );

      if (existing.length > 0) {
        return null; // Skip duplicate
      }

      // Extract content and generate summary
      const content = await this.extractContent(item);
      const summary = this.generateMockSummary(article.title, content, source);
      
      article.summary_bullets = JSON.stringify(summary.bullets);
      article.summary_paragraph = summary.paragraph;
      article.topics = JSON.stringify(summary.topics);
      article.reading_time = this.calculateReadingTime(content);

      return article;
    } catch (error) {
      console.error('Error processing article:', error);
      return null;
    }
  }

  async extractContent(item) {
    try {
      // Try to get full content from description or content
      let content = item.contentSnippet || item.content || item.description || '';
      
      // If content is too short, try to fetch from URL
      if (content.length < 200 && item.link) {
        try {
          const response = await axios.get(item.link, {
            timeout: 5000,
            headers: {
              'User-Agent': 'NewsAI-Bot/1.0'
            }
          });
          
          const $ = cheerio.load(response.data);
          
          // Remove unwanted elements
          $('script, style, nav, header, footer, aside, .advertisement').remove();
          
          // Try common content selectors
          const contentSelectors = [
            'article',
            '.article-content',
            '.post-content',
            '.entry-content',
            '.content',
            'main p'
          ];
          
          for (const selector of contentSelectors) {
            const extracted = $(selector).text().trim();
            if (extracted.length > content.length) {
              content = extracted;
              break;
            }
          }
        } catch (fetchError) {
          console.log('Could not fetch full content, using RSS content');
        }
      }

      return this.cleanText(content).slice(0, 2000); // Limit content length
    } catch (error) {
      return item.contentSnippet || item.description || '';
    }
  }

  generateMockSummary(title, content, source) {
    // This is a mock summarization - in production, you'd use OpenAI API
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
    
    // Generate bullets from key sentences
    const bullets = sentences
      .slice(0, 4)
      .map(sentence => sentence.trim().slice(0, 150) + (sentence.length > 150 ? '...' : ''))
      .filter(bullet => bullet.length > 20);

    // Generate paragraph summary
    const paragraph = sentences.slice(0, 2).join('. ').slice(0, 300) + 
      (sentences.slice(0, 2).join('. ').length > 300 ? '...' : '');

    // Determine topics based on title and content
    const topics = this.extractTopics(title + ' ' + content);

    return {
      bullets: bullets.length > 0 ? bullets : [
        `${source.name} reporta sobre ${title.toLowerCase()}`,
        'La noticia incluye información relevante sobre el tema',
        'Se proporcionan detalles adicionales en el artículo original'
      ],
      paragraph: paragraph || `${source.name} informa sobre ${title.toLowerCase()}. Para más detalles, consulta el artículo original.`,
      topics
    };
  }

  extractTopics(text) {
    const topicKeywords = {
      'tecnologia': ['tecnología', 'tech', 'software', 'hardware', 'internet', 'digital', 'ai', 'inteligencia artificial', 'startup', 'app'],
      'deportes': ['fútbol', 'deporte', 'liga', 'equipo', 'jugador', 'partido', 'gol', 'barcelona', 'madrid', 'atlético'],
      'economia': ['economía', 'dinero', 'banco', 'inversión', 'mercado', 'empresa', 'negocio', 'euro', 'dólar', 'bitcoin'],
      'ciencia': ['ciencia', 'investigación', 'estudio', 'universidad', 'científico', 'medicina', 'salud', 'covid'],
      'politica': ['gobierno', 'político', 'elecciones', 'presidente', 'ministro', 'congreso', 'ley', 'partido'],
      'cultura': ['cultura', 'arte', 'música', 'cine', 'libro', 'festival', 'actor', 'artista']
    };

    const textLower = text.toLowerCase();
    const foundTopics = [];

    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some(keyword => textLower.includes(keyword))) {
        foundTopics.push(topic);
      }
    }

    return foundTopics.length > 0 ? foundTopics.slice(0, 3) : ['general'];
  }

  calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  }

  cleanText(text) {
    if (!text) return '';
    return text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }

  async saveArticle(article) {
    try {
      await database.run(`
        INSERT OR REPLACE INTO articles (
          id, source_id, title, canonical_url, published_at,
          summary_bullets, summary_paragraph, topics, country,
          lang, reading_time, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        article.id,
        article.source_id,
        article.title,
        article.canonical_url,
        article.published_at,
        article.summary_bullets,
        article.summary_paragraph,
        article.topics,
        article.country,
        article.lang,
        article.reading_time,
        'published' // Mark as published immediately for demo
      ]);
    } catch (error) {
      console.error('Error saving article:', error);
      throw error;
    }
  }
}

module.exports = new RSSService();