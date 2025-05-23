import dotenv from "dotenv";

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("Couldn't find .env file");
}

process.env.NODE_ENV = process.env.NODE_ENV || "development";

//Configuration of the api
export default {
  port: process.env.PORT,
  api: {
    prefix: "/api/v1",
  },
  log: {
    level: process.env.LOG_LEVEL as string,
  },
  swagger: {
    path: "/documentation",
  },
  mongoDB: {
    URI: process.env.MONGO_URI as string,
  },
  redis: {
    URI: process.env.REDIS_URI as string,
  },
};
