const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  googleId: {
    type: String,
    required: true,
  },
  // You can add more fields here as needed
});

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
