const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ name, email, password });
    await user.save();

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Follow a user
exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.userId);

    if (currentUser.following.includes(userToFollow._id)) {
      return res.status(400).json({ msg: 'Already following' });
    }

    currentUser.following.push(userToFollow._id);
    userToFollow.followers.push(currentUser._id);

    await currentUser.save();
    await userToFollow.save();

    res.json({ msg: 'Followed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.userId);

    currentUser.following = currentUser.following.filter(
      (user) => user.toString() !== userToUnfollow._id.toString()
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (user) => user.toString() !== currentUser._id.toString()
    );

    await currentUser.save();
    await userToUnfollow.save();

    res.json({ msg: 'Unfollowed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('followers')
      .populate('following');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Search users by name or email
exports.searchUsers = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const users = await User.find({
      $text: { $search: searchQuery },
    }).select('-password'); // Exclude password from results

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
