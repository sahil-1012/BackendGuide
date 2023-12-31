// middleware/reqAdmin.js
const reqAdmin = async (req, res, next) => {
    try {
        const role = req.user.role;
        console.log(role)
        if (role !== 'admin') {
            return res.status(403).json({ error: "User does not have admin privileges", success: false });
        }

        // If the user is an admin, proceed to the next middleware or route
        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error occurred while verifying user designation", success: false });
    }
};

module.exports = reqAdmin;