import app from "./app.js";

import config from "./config/index.js";
import { storageService } from "./services/storage.service.js";
import { logger } from "./utils/logger.js";

const start = async () => {
  try {
    storageService.initialize();

    const server = app.listen(
      config.server.port,
      config.server.host,
      (error) => {
        if (error) {
          logger.error("Failed to start server", error);
          process.exit(1);
        }

        logger.info("Media Storage Server started");

        logger.info(
          `Server: http://${config.server.host}:${config.server.port}`
        );

        logger.info(
          `Videos: ${config.media.videosPath}`
        );

        logger.info(
          `Images: ${config.media.imagesPath}`
        );
      }
    );

    const shutdown = (signal) => {
      logger.info(`Received ${signal}, shutting down...`);

      server.close(() => {
        logger.info("Server stopped");
        process.exit(0);
      });

      // Force exit if open connections (e.g. long video streams) keep the server alive
      setTimeout(() => process.exit(0), 10000).unref();
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    logger.error("Failed to start server", error.message);
    process.exit(1);
  }
};

start();
