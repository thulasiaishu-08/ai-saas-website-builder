const express = require('express');
const cors    = require('cors');
const path    = require('path');
require('dotenv').config();

const connectMongoDB = require('./config/mongodb');
const errorHandler   = require('./middlewares/errorHandler');

const authRoutes    = require('./routes/authRoutes');
const siteRoutes    = require('./routes/siteRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes   = require('./routes/adminRoutes');

const app = express();

// ─── CORS ────────────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ],
  credentials: true,
}));

// ─── Body parsers ─────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Static uploads ───────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── Routes ───────────────────────────────────────────────
app.use('/api/auth',    authRoutes);
app.use('/api/sites',   siteRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin',   adminRoutes);

// ─── Health check ─────────────────────────────────────────
app.get('/api/health', (_req, res) =>
  res.json({ success: true, message: 'SiteForge API running 🚀', timestamp: new Date() })
);

// ─── Global error handler ─────────────────────────────────
app.use(errorHandler);

// ─── Start ────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT) || 5000;

const startServer = async () => {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  SiteForge — AI SaaS Website Builder');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  MongoDB : ${(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai_website_builder').replace(/:([^@/]+)@/, ':****@')}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  await connectMongoDB();

  app.listen(PORT, () => {
    console.log(`\n🚀 Server  →  http://localhost:${PORT}`);
    console.log(`📁 Uploads →  http://localhost:${PORT}/uploads`);
    console.log(`❤️  Health  →  http://localhost:${PORT}/api/health\n`);
  });
};

startServer();
