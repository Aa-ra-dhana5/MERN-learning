const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/test", (req, res) => {
  res.send("user Test route");
});

//User Register Routs

// .get method to show form

router.get("/register", (req, res) => {
  res.render("register");
});

//as data is from /user/register so we need to get it from there
/* router.post("/register", (req, res) => {
  console.log(req.body);
  res.send("user registered");
});
*/

router.post(
  "/register",
  //tese all are custome middlewares
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 3 }),
  async (req, res) => {
    //Data Validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid Data",
      });
    }

    const { email, username, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      email,
      username,
      password: hashPassword,
    });

    res.json(newUser);

    //console.log(req.body);
    //res.send("User Registered");
  }
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  body("username").trim().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
        message: "Invalid data",
      });
    }

    const { username, password } = req.body;

    const user = await userModel.findOne({
      username: username,
    });

    if (!user) {
      return res.status(400).json({
        message: "username or password is incorrect",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "username or password is incorrect",
      });
    }

    /** creating token for this user by using jasonwebtoken (JWT) */

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);
    res.send("Loged in");
  }
);

module.exports = router;
