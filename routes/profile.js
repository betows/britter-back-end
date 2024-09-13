const express = require('express');
const { updateProfile, getProfileWithTweets } = require('../controllers/profileController');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });


// Get user profile and tweets
router.get('/:id', getProfileWithTweets);

// Update profile with avatar
router.put('/update', auth, upload.single('avatar'), updateProfile);

module.exports = router;
