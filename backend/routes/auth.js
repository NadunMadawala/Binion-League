// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const dotenv = require("dotenv");

dotenv.config();

// Register route
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log("start");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors, "validation error");
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      console.log("new user creation");
      user = new User({ name, email, password });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      // const payload = { user: { id: user.id } };
      // jwt.sign(
      //   payload,
      //   process.env.JWT_SECRET,
      //   { expiresIn: 3600 },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.json({ token });
      //   }
      // );

      // Return success message
      res.json({ msg: "User registered successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// Login route
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      // Return jsonwebtoken
      const payload = { user: { id: user.id } };
      // jwt.sign(
      //   payload,
      //   process.env.JWT_SECRET,
      //   { expiresIn: 3600 },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.json({ token });
      //   }
      // );
      res.json({
        msg: "User login successfully",
        userId: user._id,
        username: user.name,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
