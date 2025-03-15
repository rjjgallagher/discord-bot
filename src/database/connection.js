const mongoose = require("mongoose");

async function connectToDatabase() {
  const dbUrl = process.env.MONGO_DB_URL || "mongodb://localhost:27017/sevbot";

  if (!dbUrl) {
    throw new Error("MONGO_DB_URL is not defined in environment variables.");
  }

  try {
    await mongoose.connect(dbUrl);
    console.log("Database connected");
  } catch (err) {
    console.error("Connection error:", err);
  }
}

module.exports = { connectToDatabase };
