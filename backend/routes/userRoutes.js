// // File: routes/userRoutes.js

// const express = require("express");
// const {
//   updateUserAvatar,
//   incrementWinCount,
//   getAllUsers,
// } = require("../controllers/userController");
// const router = express.Router();

// // Define the route for updating user avatar
// router.post("/update-avatar", updateUserAvatar);
// router.post("/increment-win", incrementWinCount);
// // Route to get all users
// router.get("/getAllUsers", getAllUsers);

// module.exports = router;
// File: routes/userRoutes.js

// File: routes/userRoutes.js

// File: routes/userRoutes.js

const express = require("express");
const {
  updateUserAvatar,
  incrementWinCount,
  getAllUsers,
  getUserDetails,
} = require("../controllers/userController");
const authenticateJWT = require("../middleware/authMiddleware");
const router = express.Router();

// Define the route for updating user avatar (protected route)
router.post("/update-avatar", authenticateJWT, updateUserAvatar);

// Define the route for incrementing win count (protected route)
router.post("/increment-win", authenticateJWT, incrementWinCount);

// Route to get all users (protected route)
router.get("/getAllUsers", authenticateJWT, getAllUsers);

// Get user details using the token (protected route)
router.get("/me", authenticateJWT, getUserDetails); // Ensure this route is defined

module.exports = router;
