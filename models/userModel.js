// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic user details
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },

  // Additional details
  password: { type: String, required: true },
  bio: { type: String },
  avatarUrl: { type: String },
  joinedAt: { type: Date, default: Date.now },
  role : { type : String, default : 'user' },

});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;