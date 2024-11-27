// File: routes/userRoutes.js

const express = require("express");
const { updateUserAvatar } = require("../controllers/userController");
const router = express.Router();

// Define the route for updating user avatar
router.post("/update-avatar", updateUserAvatar);

module.exports = router;
