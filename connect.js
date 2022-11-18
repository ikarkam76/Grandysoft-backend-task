const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URL;

const connectMongo = async () => {
  await mongoose.connect(url);
  console.log("DB connected successfully");
};

module.exports = { connectMongo };
