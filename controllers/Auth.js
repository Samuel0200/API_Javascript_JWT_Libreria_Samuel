const { login } = require("../actions/auth");
const { generateToken } = require("../actions/token");

async function loginUser(data) {
    try {
        const user = await login(data);
        const token = await generateToken(user);
        return { token, user };
    } catch (e) {
        throw e;
    }
}

module.exports = {
    loginUser
};
