const argon2 = require("argon2");
const userActions = require("./User");

async function login(data) {
    try {
        const user = await userActions.getUserMongo({ email: data.email });
        if (user == null) {
            throw new Error(`No user found with this email: '${data.email}'`);
        }
        if (await argon2.verify(user.password, data.password)) {
            return user;
        } else {
            throw new Error(`Authentication failed, please check the entered data`);
        }
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}

module.exports = {
    login
};
