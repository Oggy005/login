require('dotenv').config(); // Load environment variables
const express = require('express');
const session = require('express-session');
const passport = require('passport'); // Import passport here
const mongoose = require('mongoose');
const keys = require('./config/keys');
const authRoutes = require('./routes/auth');
const path = require('path');

// Import passport configuration
require('./config/passport'); // Ensure this path is correct

const app = express();

// Connect to MongoDB
mongoose.connect(keys.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

app.use(session({
  secret: keys.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Use Routes
app.use('/auth', authRoutes);

// Serve the login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve the dashboard page
app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
  } else {
    res.redirect('/');
  }
});

// Define the port and start the server
const PORT = process.env.PORT || 5002; // Change to a different port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
