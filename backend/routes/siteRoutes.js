const express = require('express');
const router = express.Router();
const {
  getMySites, getSite, createSite, updateSite, deleteSite, getPublicSite, getSiteAnalytics,
} = require('../controllers/siteController');
const { protect } = require('../middlewares/auth');
const upload = require('../config/multer');

// Public
router.get('/public/:slug', getPublicSite);

// Protected
router.use(protect);
router.get('/', getMySites);
router.get('/analytics/:id', getSiteAnalytics);
router.get('/:id', getSite);
router.post('/create', upload.single('logo'), createSite);
router.put('/update/:id', upload.single('logo'), updateSite);
router.delete('/delete/:id', deleteSite);

module.exports = router;
