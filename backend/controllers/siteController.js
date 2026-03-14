const Site = require('../models/Site');
const Contact = require('../models/Contact');
const path = require('path');

// GET /api/sites  - get all user's sites
exports.getMySites = async (req, res) => {
  try {
    const { search, status } = req.query;
    const query = { userId: req.user.id };
    if (status) query.status = status;
    if (search) query.siteName = { $regex: search, $options: 'i' };

    const sites = await Site.find(query).sort({ createdAt: -1 });
    const total = await Site.countDocuments({ userId: req.user.id });
    const published = await Site.countDocuments({ userId: req.user.id, status: 'published' });
    const drafts = await Site.countDocuments({ userId: req.user.id, status: 'draft' });

    res.json({ success: true, sites, stats: { total, published, drafts } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch sites' });
  }
};

// GET /api/sites/:id
exports.getSite = async (req, res) => {
  try {
    const site = await Site.findOne({ _id: req.params.id, userId: req.user.id });
    if (!site) return res.status(404).json({ success: false, message: 'Site not found' });
    res.json({ success: true, site });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch site' });
  }
};

// POST /api/sites/create
exports.createSite = async (req, res) => {
  try {
    const { siteName, template, description, services, phone, email, address, colorScheme, status } = req.body;
    if (!siteName || !description) {
      return res.status(400).json({ success: false, message: 'Site name and description are required' });
    }

    // Build unique slug
    let baseSlug = siteName.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
    let slug = baseSlug;
    let counter = 1;
    while (await Site.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const parsedServices = typeof services === 'string' ? JSON.parse(services) : services || [];
    const parsedColorScheme = typeof colorScheme === 'string' ? JSON.parse(colorScheme) : colorScheme || {};

    const logo = req.file ? `/uploads/${req.file.filename}` : null;

    const site = await Site.create({
      userId: req.user.id,
      siteName,
      slug,
      template: template || 'business',
      description,
      services: parsedServices,
      contact: { phone, email, address },
      logo,
      colorScheme: parsedColorScheme,
      status: status || 'published',
    });

    res.status(201).json({ success: true, message: 'Website created successfully!', site });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message || 'Failed to create site' });
  }
};

// PUT /api/sites/update/:id
exports.updateSite = async (req, res) => {
  try {
    const site = await Site.findOne({ _id: req.params.id, userId: req.user.id });
    if (!site) return res.status(404).json({ success: false, message: 'Site not found' });

    const { siteName, template, description, services, phone, email, address, colorScheme, status } = req.body;

    if (siteName) site.siteName = siteName;
    if (template) site.template = template;
    if (description) site.description = description;
    if (services) site.services = typeof services === 'string' ? JSON.parse(services) : services;
    if (phone || email || address) {
      site.contact = {
        phone: phone || site.contact.phone,
        email: email || site.contact.email,
        address: address || site.contact.address,
      };
    }
    if (colorScheme) site.colorScheme = typeof colorScheme === 'string' ? JSON.parse(colorScheme) : colorScheme;
    if (status) site.status = status;
    if (req.file) site.logo = `/uploads/${req.file.filename}`;

    await site.save();
    res.json({ success: true, message: 'Website updated successfully!', site });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to update site' });
  }
};

// DELETE /api/sites/delete/:id
exports.deleteSite = async (req, res) => {
  try {
    const site = await Site.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!site) return res.status(404).json({ success: false, message: 'Site not found' });
    await Contact.deleteMany({ siteId: req.params.id });
    res.json({ success: true, message: 'Website deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete site' });
  }
};

// GET /api/sites/public/:slug  - public site data
exports.getPublicSite = async (req, res) => {
  try {
    const site = await Site.findOne({ slug: req.params.slug, status: 'published' });
    if (!site) return res.status(404).json({ success: false, message: 'Site not found or not published' });
    // Increment visit count
    site.analytics.visits += 1;
    await site.save();
    res.json({ success: true, site });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load site' });
  }
};

// GET /api/sites/analytics/:id
exports.getSiteAnalytics = async (req, res) => {
  try {
    const site = await Site.findOne({ _id: req.params.id, userId: req.user.id });
    if (!site) return res.status(404).json({ success: false, message: 'Site not found' });
    const contactCount = await Contact.countDocuments({ siteId: req.params.id });
    res.json({
      success: true,
      analytics: {
        visits: site.analytics.visits,
        contactRequests: contactCount,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch analytics' });
  }
};
