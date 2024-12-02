// File: server.js

const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");
const jwt = require("jsonwebtoken");

dotenv.config();
const app = express();

// Middlewares
app.use(express.json()); // Parse incoming JSON requests
app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:5173"],
  })
);

// JWT Middleware for verifying token
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach the decoded user to the request
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// Mount routes
app.use("/api/auth", authRoutes); // Authentication routes do not need JWT verification

// Protected user routes using authenticateJWT middleware
app.use("/api/users", authenticateJWT, userRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Proxy to Banana API
app.get("/api/banana", async (req, res) => {
  try {
    const response = await axios.get(
      "https://marcconrad.com/uob/banana/api.php"
    );
    if (response && response.data) {
      res.json(response.data);
    } else {
      res.status(500).send("Error: Invalid response from Banana API");
    }
  } catch (error) {
    console.error("Error fetching Banana API data:", error.message);
    res.status(500).send("Error fetching data from Banana API");
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
