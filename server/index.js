require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const resumeRoutes = require("./resumeRoutes");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/resume", resumeRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Precision AI API running...");
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/precision-ai";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err.message);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (no database)`);
    });
  });
