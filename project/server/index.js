const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Import routes
const newsRoutes = require('./routes/news');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/news', newsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📰 News API: http://localhost:${PORT}/api/news`);
  
  // Initialize database and start periodic news fetching
  const rssService = require('./services/rssService');
  
  // Fetch news immediately on startup
  setTimeout(() => {
    console.log('🔄 Starting initial news fetch...');
    rssService.fetchAllSources().catch(console.error);
  }, 2000);
  
  // Set up periodic fetching every 15 minutes
  setInterval(() => {
    console.log('🔄 Periodic news fetch...');
    rssService.fetchAllSources().catch(console.error);
  }, 15 * 60 * 1000);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  const database = require('./config/database');
  database.close().then(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  const database = require('./config/database');
  database.close().then(() => {
    process.exit(0);
  });
});