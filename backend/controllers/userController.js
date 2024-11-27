// File: controllers/userController.js

const User = require("../models/User");

// Controller to update user's avatar
const updateUserAvatar = async (req, res) => {
  const { userId, avatar } = req.body; // Changed 'name' to 'userId' to use userId instead

  if (!userId || !avatar) {
    return res
      .status(400)
      .json({ msg: "Please provide both userId and avatar" });
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

module.exports = {
  updateUserAvatar,
};
