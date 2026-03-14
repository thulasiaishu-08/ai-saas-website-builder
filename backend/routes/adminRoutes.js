const express = require('express');
const router = express.Router();
const { getAllUsers, getAllSites, getAllContacts, getStats, deleteUser } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middlewares/auth');

router.use(protect, adminOnly);
router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.get('/sites', getAllSites);
router.get('/contacts', getAllContacts);
router.delete('/users/:id', deleteUser);

module.exports = router;
