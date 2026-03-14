const express = require('express');
const router = express.Router();
const { submitContact, getContactMessages, markAsRead } = require('../controllers/contactController');
const { protect } = require('../middlewares/auth');

router.post('/', submitContact);
router.get('/:siteId', protect, getContactMessages);
router.put('/read/:id', protect, markAsRead);

module.exports = router;
