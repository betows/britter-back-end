const User = require('../models/User');
const Tweet = require('../models/Tweet');

// Update user profile (bio and avatar)
exports.updateProfile = async (req, res) => {
    const { bio, avatar } = req.body;

    try {
        let user = await User.findById(req.userId);

        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.bio = bio || user.bio;
        user.avatar = avatar || user.avatar;

        await user.save();
        res.json({ msg: 'Profile updated', user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Get profile with user’s tweets
exports.getProfileWithTweets = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('followers').populate('following');

        if (!user) return res.status(404).json({ msg: 'User not found' });

        const tweets = await Tweet.find({ user: req.params.id }).sort({ createdAt: -1 });

        res.json({ user, tweets });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Update user profile (bio and avatar)
exports.updateProfile = async (req, res) => {
    const { bio } = req.body;

    try {
        let user = await User.findById(req.userId);

        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.bio = bio || user.bio;

        if (req.file) {
            user.avatar = req.file.path; // Cloudinary automatically gives a URL for the image
        }

        await user.save();
        res.json({ msg: 'Profile updated', user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

