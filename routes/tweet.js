const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createTweet, getFeed, likeTweet, retweet, replyToTweet, searchTweets } = require('../controllers/tweetController');

// Create a new tweet
router.post('/create', auth, createTweet);

// Get user feed
router.get('/feed', auth, getFeed);

// Like a tweet
router.post('/like/:id', auth, likeTweet);

// Retweet
router.post('/retweet/:id', auth, retweet);

// Reply to a tweet
router.post('/reply/:id', auth, replyToTweet);

// Search for tweets
router.get('/search', searchTweets);


module.exports = router;
