import mongoose from "mongoose";
import config from "../../config/index";
import logger from "../logger/index";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Missing MONGO_URI in environment variables");
    }
    // mongodb connection string
    await mongoose.connect(config.mongoDB.URI, {});
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

export default connectDB;
