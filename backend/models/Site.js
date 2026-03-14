const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    siteName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    template: {
      type: String,
      enum: ['business', 'portfolio', 'startup'],
      default: 'business',
    },
    description: { type: String, required: true },
    services: [{ type: String }],
    contact: {
      phone: { type: String },
      email: { type: String },
      address: { type: String },
    },
    logo: { type: String, default: null },
    gallery: [{ type: String }],
    colorScheme: {
      primary: { type: String, default: '#0d6efd' },
      secondary: { type: String, default: '#6c757d' },
    },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    analytics: {
      visits: { type: Number, default: 0 },
      contactRequests: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

// Auto-generate slug from siteName before save
siteSchema.pre('validate', function (next) {
  if (this.isNew && !this.slug) {
    this.slug = this.siteName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  next();
});

module.exports = mongoose.model('Site', siteSchema);
