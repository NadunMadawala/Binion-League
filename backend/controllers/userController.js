// File: controllers/userController.js

const User = require("../models/User");

// Controller to update user's avatar
const updateUserAvatar = async (req, res) => {
  const { avatar } = req.body; // Fetch avatar from request body
  const userId = req.user.id; // Get userId from JWT payload after authentication

  if (!avatar) {
    return res.status(400).json({ msg: "Please provide an avatar" });
  }

  try {
    // Find the user by userId and update their avatar
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "Avatar updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

// Controller to increment user's win count
const incrementWinCount = async (req, res) => {
  const userId = req.user.id; // Get userId from JWT payload after authentication

  try {
    // Increment winCount by 1
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { winCount: 1 } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "Win count incremented successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

// Controller to get all users (e.g., for leaderboard)
const getAllUsers = async (req, res) => {
  try {
    // Fetch all users sorted by winCount in descending order
    const users = await User.find({}).sort({ winCount: -1 });

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};
// Controller to get user details based on the authenticated user
const getUserDetails = async (req, res) => {
  try {
    // req.user should have the userId if JWT authentication was successful
    const userId = req.user.id;

    // Find the user by ID
    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user details:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  updateUserAvatar,
  incrementWinCount,
  getAllUsers,
  getUserDetails,
};
