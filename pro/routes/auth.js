const express = require('express');
const router = express.Router();
const passport = require('passport');

// Start Google authentication
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// Google authentication callback
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/dashboard'); // Redirect to a dashboard or another route after successful login
});

// Log out user
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
