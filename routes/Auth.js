const express = require('express');
const router = express.Router();
const { loginUser } = require("../controllers/Auth");
const { respondWithError } = require('../utils/FunctionsResponses');

async function authenticateUser(req, res) {
    try {
        // calling controller with the filters
        const tokenAndUser = await loginUser(req.body);
        res.status(200).header('authorization', tokenAndUser.token).json({
            token: tokenAndUser.token,
            userId: tokenAndUser.user._id,
            message: "Success. 👍"
        })
    } catch (e) {
        const errorMessage = e.message;
        res.status(500).json({
            message: `Authentication error: ${errorMessage}`,
        });
    }
}

router.post("/", authenticateUser);

module.exports = router;
