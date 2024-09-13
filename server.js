const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const tweetRoutes = require('./routes/tweet');  // <-- Ensure you have this
const profileRoutes = require('./routes/profile');  // <-- Ensure you have this
const notificationRoutes = require('./routes/notification');  // <-- Ensure you have this
// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tweet', tweetRoutes); 
app.use('/api/profile', profileRoutes); 
app.use('/api/notification', notificationRoutes); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

