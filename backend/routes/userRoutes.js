// File: routes/userRoutes.js

const express = require("express");
const {
  updateUserAvatar,
  incrementWinCount,
  getAllUsers,
} = require("../controllers/userController");
const router = express.Router();

// Define the route for updating user avatar
router.post("/update-avatar", updateUserAvatar);
router.post("/increment-win", incrementWinCount);
// Route to get all users
router.get("/getAllUsers", getAllUsers);

module.exports = router;
