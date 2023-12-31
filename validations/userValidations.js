// validations/userValidations.js
const userValidations = (req, res, next) => {
    const { username, email, password, role } = req.body;

    // Basic validations
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required', success: false });
    }

    // Validate the role to ensure it's a valid value
    const validRoles = ['user', 'admin'];
    if (role && !validRoles.includes(role)) {
        return res.status(400).json({ error: 'Invalid role provided', success: false });
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format', success: false });
    }

    // Add more specific validations as needed

    next();
};

module.exports = userValidations;