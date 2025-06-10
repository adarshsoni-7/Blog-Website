const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const UserController = require("../controllers/user.controller")
const authMiddleware = require("../middlewares/auth.middleware");



router.post("/signup", [
  body("username").isLength({ min: 4 }).withMessage("Username must be at least 4 charaters long"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
    .matches(/(?=.*[A-Z])/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/(?=.*[@])/)
    .withMessage("Password must contain at least one @ symbol"),
], UserController.signUpUser);


router.post(
  "/login",
  [
     
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/(?=.*[A-Z])/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/(?=.*[@])/)
      .withMessage("Password must contain at least one @ symbol"),
  ],
    UserController.signInUser);
  


router.get("/profile", authMiddleware.authUser, UserController.getProfile);



module.exports = router;