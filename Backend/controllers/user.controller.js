const UserModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const UserService = require("../services/user.service");

module.exports.signUpUser = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { username, email, password } = req.body;

    const isAlreadyEmail = await UserModel.findOne({ email });

    if (isAlreadyEmail) {
       return res.status(400).json({ message: "User already exists with this email address" });
    }

    const isAlreadyUsername = await UserModel.findOne({ username });

    if (isAlreadyUsername) {
      return res
        .status(400)
        .json({ message: `User already exists with ${username}` });
    }

    const hashPassword = await UserModel.hashPassword(password);

    const user = await UserService.createUser({ username, email, password });

    const token = user.genAuthToken();


    res.status(201).json({ token, user });

};

module.exports.signInUser = async (req, res) => {
    
}