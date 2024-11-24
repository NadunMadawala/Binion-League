const express = require("express");
const { updateUserAvatar } = require("../controllers/userController");
const router = express.Router();

router.post("/update-avatar", updateUserAvatar);

module.exports = router;
