const redis = require("redis");
import util from "util";
import logger from "../logger";
import config from "../../config/index";

const REDIS_URI = config.redis.URI || "redis://localhost:6379";

const client = redis.createClient({
  url: REDIS_URI,
  legacyMode: true,
});

const connectRedis = async (): Promise<any> => {
  await client.connect();

  client.on("error", (err: Error) => {
    logger.error(`An error occurred with Redis: ${err}`);
  });

  logger.info("Redis connected successfully");
};

export const getAsync = util.promisify(client.get).bind(client);
export const setAsync = util.promisify(client.set).bind(client);
export const delAsync = util.promisify(client.del).bind(client);

export default connectRedis;
