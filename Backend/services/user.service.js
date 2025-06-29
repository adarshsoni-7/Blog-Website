const UserModel = require("../models/user.model");


module.exports.createUser = async ({ username, email, password }) => {
    if (!username || !email || !password) {
        throw new Error("All fields must be filled");
    }

    const user = await UserModel.create({username, email, password});
    return user;
}