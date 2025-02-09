const mongoose = require("mongoose");
require("dotenv").config(); // env variables from .env file

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI; // MONGODB_URI from .env

    await mongoose.connect(mongoURI);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); 
  }
};

module.exports = { connectDB };