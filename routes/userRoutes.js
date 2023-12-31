//  routes/userRoutes.js
const express = require('express');
const UserModel = require('../models/userModel');
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;

const reqAuth = require('../middlewares/reqAuth');  // Import requireAuth middleware
const reqAdmin = require('../middlewares/reqAdmin');      // Import reqAdmin middleware
const userValidations = require('../validations/userValidations');  // Import userValidations middleware

// Adding requireAuth middleware to ensure authentication is required everywhere
// and no action can be performed without being logged in.
router.use(reqAuth);

// Adding reqAdmin middleware to ensure that only admins can perform certain actions.
router.post('/users', reqAdmin, userValidations, async (req, res) => {
    const { username, email, fullName, password, bio, avatarUrl, role } = req.body;

    try {
        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new UserModel({
            username,
            email,
            fullName,
            password: hashedPassword, // Save the hashed password
            bio,
            avatarUrl,
            role,
        });

        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create a new user', error: error.message });
    }
});

// Get all users
router.get('/users', reqAdmin, async (req, res) => {
    try {
        const users = await UserModel.find();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Get a specific user by ID
router.get('/users/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, fullName, /* other fields as needed */ } = req.body;

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, {
            username,
            email,
            fullName,
            /* other fields as needed */
        }, { new: true }); // Setting { new: true } returns the updated document

        return res.json(updatedUser);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// Delete a user by ID
router.delete('/users/:id', reqAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json({ message: 'User deleted' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
module.exports = router;