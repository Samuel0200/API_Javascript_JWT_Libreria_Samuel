const jwt = require("jsonwebtoken");
const User = require('../models/User'); // Assuming User model is in '../models/User'

function authorizeWithPermissions(requiredPermissions = [], allowSelf = false) {
    return async (req, res, next) => {
        const accessToken = req.headers['authorization'];
        if (!accessToken) {
            return res.status(401).send("Access token is required.");
        }

        jwt.verify(accessToken, process.env.SECRET, async (err, decodedToken) => {
            if (err) {
                return res.status(403).send('Access denied: invalid or expired token.');
            }
            
            req.userId = decodedToken.userId;

            // Allow access if `allowSelf` is true and the user is updating their own data
            if (allowSelf && req.userId === req.params.id) {
                return next();
            }

            // Retrieve the user's permissions from the database
            const user = await User.findById(req.userId);
            if (!user) {
                return res.status(403).send("User not found.");
            }

            // Check if the user has all required permissions
            for (const permission of requiredPermissions) {
                if (!user.permissions[permission]) {
                    return res.status(403).send(`Access denied: missing permission '${permission}'.`);
                }
            }

            next();
        });
    };
}

module.exports = {
    authorizeWithPermissions
};
