// routes/loginRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const router = express.Router();
const secretKey = 'secret@123'; // You can add any secret key here

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) 
      return res.status(401).json({ error: 'Invalid credentials', success: false });
    

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) 
      return res.status(401).json({ error: 'Invalid credentials', success: false });
     

    // Create and sign JWT token
    const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '2h' });

    res.json({ token, success: true });

  } catch (error) {
    console.error('Error in login route:', error);
    res.status(500).json({ error: 'Internal server error', success: false });
  }
});

module.exports = router;