const UserModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const UserService = require("../services/user.service");

module.exports.signUpUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    const isAlreadyEmail = await UserModel.findOne({ email });

    if (isAlreadyEmail) {
      return res
        .status(400)
        .json({ message: "User already exists with this email address" });
    }

    const isAlreadyUsername = await UserModel.findOne({ username });

    if (isAlreadyUsername) {
      return res
        .status(400)
        .json({ message: `User already exists with ${username}` });
    }

    const hashPassword = await UserModel.hashPassword(password);

    const user = await UserService.createUser({
      username,
      email,
      password: hashPassword,
    });

    const token = user.genAuthToken();

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.signInUser = async (req, res) => {
    try {
      
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = user.genAuthToken();

    res.cookie("token", token);

    res.status(200).json({ token, user });
  }
  catch (error) {
      
    res.status(400).json({ message: error });
  }
};


module.exports.getProfile = async (req, res) => {
    res.status(200).json(req.user);
} 