const Tweet = require('../models/Tweet');

// Create a new tweet
exports.createTweet = async (req, res) => {
    try {
        const newTweet = new Tweet({
            user: req.userId,
            content: req.body.content,
        });
        const tweet = await newTweet.save();
        res.status(201).json(tweet);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Get tweets for the user feed (from followed users)
exports.getFeed = async (req, res) => {
    try {
        const tweets = await Tweet.find()
            .sort({ createdAt: -1 }) // Newest tweets first
            .populate('user', ['name', 'avatar']);
        res.json(tweets);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Like a tweet
exports.likeTweet = async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id);
        if (!tweet) return res.status(404).json({ msg: 'Tweet not found' });

        if (tweet.likes.includes(req.userId)) {
            return res.status(400).json({ msg: 'Already liked' });
        }

        tweet.likes.push(req.userId);
        await tweet.save();
        res.json(tweet);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Retweet a tweet
exports.retweet = async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id);
        if (!tweet) return res.status(404).json({ msg: 'Tweet not found' });

        if (tweet.retweets.includes(req.userId)) {
            return res.status(400).json({ msg: 'Already retweeted' });
        }

        tweet.retweets.push(req.userId);
        await tweet.save();
        res.json(tweet);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Reply to a tweet
exports.replyToTweet = async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id);
        if (!tweet) return res.status(404).json({ msg: 'Tweet not found' });

        const newReply = new Tweet({
            user: req.userId,
            content: req.body.content,
            replies: [],
        });

        const savedReply = await newReply.save();
        tweet.replies.push(savedReply._id);
        await tweet.save();

        res.status(201).json(savedReply);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Search tweets by content
exports.searchTweets = async (req, res) => {
    try {
        const searchQuery = req.query.q;
        const tweets = await Tweet.find({
            $text: { $search: searchQuery }
        }).populate('user', ['name', 'avatar']);

        res.json(tweets);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
