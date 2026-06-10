const dns = require("dns");

// Force Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug
console.log("ENV Loaded");
console.log("MONGO_URI =", process.env.MONGO_URI);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected 🚀");
  })
  .catch((err) => {
    console.error("MongoDB Error:");
    console.error(err);
  });

// Routes
const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contact", contactRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
