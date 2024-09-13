const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },  // e.g., 'like', 'follow', 'retweet', 'reply'
    tweet: { type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' },  // Optional, for tweet-related notifications
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Who triggered the notification
    createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
