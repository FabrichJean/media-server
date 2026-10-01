import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import healthRoutes from "./routes/health.routes.js";
import mediaRoutes from "./routes/media.routes.js";

import { notFound } from "./middleware/not-found.js";
import { errorHandler } from "./middleware/error-handler.js";

const app = express();

app.disable("x-powered-by");

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

app.use(express.json({ limit: "1mb" }));

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.json({
    service: "media-storage-server",
    status: "ok",
  });
});

app.use("/health", healthRoutes);

app.use("/files", mediaRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;
