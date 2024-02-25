const redis = require("redis");
const util = require("util");
const logger = require("../logger");

const client = redis.createClient({
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
