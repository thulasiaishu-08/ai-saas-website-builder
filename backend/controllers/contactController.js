const Contact = require('../models/Contact');
const Site = require('../models/Site');

// POST /api/contact  - visitor submits contact form
exports.submitContact = async (req, res) => {
  try {
    const { siteSlug, name, email, message } = req.body;
    if (!siteSlug || !name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    const site = await Site.findOne({ slug: siteSlug, status: 'published' });
    if (!site) return res.status(404).json({ success: false, message: 'Site not found' });

    const contact = await Contact.create({ siteId: site._id, siteSlug, name, email, message });

    // Update analytics
    site.analytics.contactRequests += 1;
    await site.save();

    res.status(201).json({ success: true, message: 'Message sent successfully!', contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
};

// GET /api/contact/:siteId  - site owner reads contact messages
exports.getContactMessages = async (req, res) => {
  try {
    const site = await Site.findOne({ _id: req.params.siteId, userId: req.user.id });
    if (!site) return res.status(404).json({ success: false, message: 'Site not found' });

    const messages = await Contact.find({ siteId: req.params.siteId }).sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch messages' });
  }
};

// PUT /api/contact/read/:id  - mark message as read
exports.markAsRead = async (req, res) => {
  try {
    const msg = await Contact.findById(req.params.id);
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });

    // Verify ownership via site
    const site = await Site.findOne({ _id: msg.siteId, userId: req.user.id });
    if (!site) return res.status(403).json({ success: false, message: 'Not authorized' });

    msg.read = true;
    await msg.save();
    res.json({ success: true, message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update message' });
  }
};
