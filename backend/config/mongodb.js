const mongoose = require('mongoose');
require('dotenv').config();

const connectMongoDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai_website_builder';
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected successfully');
    await seedAdmin();
  } catch (err) {
    console.error('\n❌ MongoDB connection failed.\n');
    console.error('   Error   :', err.message);
    console.error('\n   ── Checklist ───────────────────────────────────────');
    console.error('   • Local MongoDB not running?');
    console.error('     Linux/WSL : sudo systemctl start mongod');
    console.error('     macOS     : brew services start mongodb-community');
    console.error('     Windows   : net start MongoDB   (or start via Services)');
    console.error('   • Using Atlas? Set MONGODB_URI in backend/.env to your SRV string');
    console.error('   ─────────────────────────────────────────────────────\n');
    process.exit(1);
  }
};

const seedAdmin = async () => {
  const bcrypt = require('bcryptjs');
  const User   = require('../models/User');
  const exists = await User.findOne({ email: 'admin@websitebuilder.com' });
  if (!exists) {
    const hash = await bcrypt.hash('admin123', 10);
    await User.create({ name: 'Admin', email: 'admin@websitebuilder.com', password: hash, role: 'admin' });
    console.log('✅ Admin seeded  →  admin@websitebuilder.com / admin123');
  }
};

module.exports = connectMongoDB;
