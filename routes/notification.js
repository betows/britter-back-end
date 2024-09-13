const express = require('express');
const { getNotifications } = require('../controllers/notificationController');
const router = express.Router();
const auth = require('../middleware/auth');

// Get notifications for the user
router.get('/', auth, getNotifications);

module.exports = router;
