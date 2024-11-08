import jwt from 'jsonwebtoken';
require("dotenv").config();

async function generateToken(user){
    const payload = { userId: user._id };
    return jwt.sign(payload, process.env.SECRET, {expiresIn: '55m'});
}

module.exports = {
    generateToken
};  
