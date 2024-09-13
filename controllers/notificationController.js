const Notification = require('../models/Notification');

// Get notifications for the logged-in user
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.userId })
            .sort({ createdAt: -1 })
            .populate('fromUser', ['name', 'avatar'])
            .populate('tweet');

        res.json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
