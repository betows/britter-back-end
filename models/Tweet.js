const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    retweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
    createdAt: { type: Date, default: Date.now }
});

tweetSchema.index({ content: 'text' });

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;
