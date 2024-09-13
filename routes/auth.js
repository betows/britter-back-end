const express = require('express');
const { followUser, unfollowUser, registerUser, loginUser, getUserProfile, searchUsers } = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = express.Router();

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

router.post('/follow/:id', auth, followUser);

router.post('/unfollow/:id', auth, unfollowUser);

// Get user profile
router.get('/profile/:id', auth, getUserProfile);

// Search for users
router.get('/search', searchUsers);


module.exports = router;
