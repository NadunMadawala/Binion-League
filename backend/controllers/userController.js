const User = require("../models/User");

// Controller to update user's avatar
const updateUserAvatar = async (req, res) => {
  const { userId, avatar } = req.body;
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

const incrementWinCount = async (req, res) => {
  const { userId, winCount } = req.body;
  //const { userId } = new ObjectId(req.params);

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { winCount }, // Increment winCount by 1
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "Win count incremented", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};
// Controller to get all users
const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}).sort({ winCount: -1 }); // Fetch all users without any filters

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

module.exports = {
  updateUserAvatar,
  incrementWinCount,
  getAllUsers,
};
