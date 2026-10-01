import { Router } from "express";

import config from "../config/index.js";
import { storageService } from "../services/storage.service.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    service: "media-storage-server",
    status: "ok",
    environment: config.env,
    storage: {
      videos: storageService.getVideosPath(),
      images: storageService.getImagesPath(),
    },
    timestamp: new Date().toISOString(),
  });
});

export default router;
