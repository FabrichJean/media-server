import express, { Router } from "express";

import config from "../config/index.js";
import { storageService } from "../services/storage.service.js";

const router = Router();

router.use(
  "/videos",
  express.static(storageService.getVideosPath(), {
    maxAge: config.cache.maxAge * 1000,
    etag: true,
    lastModified: true,
    acceptRanges: true,
    dotfiles: "deny",
    index: false,
  })
);

router.use(
  "/images",
  express.static(storageService.getImagesPath(), {
    maxAge: config.cache.maxAge * 1000,
    etag: true,
    lastModified: true,
    dotfiles: "deny",
    index: false,
  })
);

export default router;
