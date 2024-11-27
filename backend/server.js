// File: server.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();

// Middlewares
app.use(express.json()); // Parse incoming JSON requests
app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:5173"],
  })
);

// Mount routes
app.use("/api/users", userRoutes);

// Routes for authentication
app.use("/api/auth", require("./routes/auth"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
