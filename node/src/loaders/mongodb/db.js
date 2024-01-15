const mongoose = require("mongoose");
const config = require("../../config/index");
const logger = require("../logger/index");

const connectDB = async () => {
  try {
    // mongodb connection string
    await mongoose.connect(config.mongoDB.URI, {});
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
