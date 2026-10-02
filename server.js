import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import enquiryRoutes from './routes/enquiryRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false
  })
);

// CORS for cross-origin or local Vite access
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
    credentials: true
  })
);

// Body parser
app.use(express.json({ limit: '15kb' }));
app.use(express.urlencoded({ extended: true, limit: '15kb' }));

// Rate limiting for API protection
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again after 15 minutes.'
  }
});
app.use('/api/', apiLimiter);

// Mount API routes
app.use('/api/enquiries', enquiryRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    studio: 'INTheBOX Studio API',
    mode: 'unified-monorepo',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend build if dist exists
const distDir = path.join(__dirname, 'dist');
const publicDir = path.join(__dirname, 'public');

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
}
app.use(express.static(publicDir));
app.use(express.static(__dirname));

// Client fallback routing for SPA
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return next();
  }
  const distIndex = path.join(distDir, 'index.html');
  if (fs.existsSync(distIndex)) {
    return res.sendFile(distIndex);
  }
  return res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Studio Server Error]:', err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal studio server error'
  });
});

// Start unified server for standalone/local environment
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`  ⚡ INTheBOX Studio Unified Server Active!`);
    console.log(`  🌐 Website & Backend running at: http://localhost:${PORT}`);
    console.log(`  🩺 Health Check:                http://localhost:${PORT}/health`);
    console.log(`  📨 Enquiries API:                http://localhost:${PORT}/api/enquiries`);
    console.log(`======================================================\n`);
  });
};

if (!process.env.VERCEL) {
  startServer();
}

export default app;
