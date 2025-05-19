const redis = require("redis");
const util = require("util");
const logger = require("../logger");
const config = require("../../config/index");

const REDIS_URI = config.redis.URI || "redis://localhost:6379"; // Usa variable de entorno o valor por defecto

const client = redis.createClient({
  url: REDIS_URI,
  legacyMode: true,
});

const connectRedis = async () => {
  await client.connect();

  client.on("error", (err) => {
    logger.error(`An error occurred with Redis: ${err}`);
  });

  logger.info("Redis connected successfully");
};

const getAsync = util.promisify(client.get).bind(client);
const setAsync = util.promisify(client.set).bind(client);
const delAsync = util.promisify(client.del).bind(client);

module.exports = { connectRedis, getAsync, setAsync, delAsync };
