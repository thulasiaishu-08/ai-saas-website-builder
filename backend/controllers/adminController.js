const User    = require('../models/User');
const Site    = require('../models/Site');
const Contact = require('../models/Contact');

// GET /api/admin/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};

// GET /api/admin/sites
exports.getAllSites = async (req, res) => {
  try {
    const sites = await Site.find().sort({ createdAt: -1 });
    res.json({ success: true, sites });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch sites' });
  }
};

// GET /api/admin/contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().populate('siteId', 'siteName slug').sort({ createdAt: -1 });
    res.json({ success: true, contacts });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch contacts' });
  }
};

// GET /api/admin/stats
exports.getStats = async (req, res) => {
  try {
    const [userCount, siteCount, publishedCount, contactCount] = await Promise.all([
      User.countDocuments(),
      Site.countDocuments(),
      Site.countDocuments({ status: 'published' }),
      Contact.countDocuments(),
    ]);
    res.json({ success: true, stats: { userCount, siteCount, publishedCount, contactCount } });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
};

// DELETE /api/admin/users/:id
exports.deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id, role: { $ne: 'admin' } });
    res.json({ success: true, message: 'User deleted' });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
};
