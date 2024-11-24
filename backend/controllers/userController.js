const User = require("../models/User");

// Controller to update user's avatar
const updateUserAvatar = async (req, res) => {
  const { name, avatar } = req.body;

  if (!name || !avatar) {
    return res
      .status(400)
      .json({ msg: "Please provide both username and avatar" });
  }

  try {
    // Find the user by username and update their avatar
    const user = await User.findOneAndUpdate(
      { name }, // Corrected to use 'username'
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
