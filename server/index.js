const express = require('express');
const cors = require('cors');
const path = require('path');

const apiRouter = require('./routes/api');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api', apiRouter);
app.use('/api/admin', adminRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString(), platform: 'Excel Mastery Pro API' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Excel Mastery Pro Server running on http://localhost:${PORT}`);
});
