const ExpressServer = require("./server/expressServer");
const config = require("../config");
const logger = require("./logger");
const connectDB = require("./mongodb/db");
const { connectRedis } = require("./redis/redis");

module.exports = async () => {
  try {
    await connectDB();
    logger.info("Connection to the database has been established.");
    await connectRedis();
    const server = new ExpressServer();
    logger.info("Express Loaded");

    server.start();
    logger.info(
      `#################################
        Server listening on port ${config.port}
        #############################`
    );
  } catch (error) {
    logger.info("Unable to start the server:", error);
  }
};
