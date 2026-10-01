import fs from "node:fs";
import path from "node:path";

import config from "../config/index.js";

const checkDirectory = (directory) => {
  if (!fs.existsSync(directory)) {
    throw new Error(`Storage directory does not exist: ${directory}`);
  }

  if (!fs.statSync(directory).isDirectory()) {
    throw new Error(`Storage path is not a directory: ${directory}`);
  }
};

const basePaths = {
  videos: config.media.videosPath,
  images: config.media.imagesPath,
};

export const storageService = {
  initialize() {
    checkDirectory(config.media.videosPath);
    checkDirectory(config.media.imagesPath);
  },

  getVideosPath() {
    return config.media.videosPath;
  },

  getImagesPath() {
    return config.media.imagesPath;
  },

  getFilePath(type, filename) {
    const basePath = basePaths[type];

    if (!basePath) {
      throw new Error(`Unknown storage type: ${type}`);
    }

    const root = path.resolve(basePath);
    const filePath = path.resolve(root, filename);

    // Reject paths escaping the storage root (e.g. "../../etc/passwd")
    if (!filePath.startsWith(root + path.sep)) {
      throw new Error(`Invalid file path: ${filename}`);
    }

    return filePath;
  },

  fileExists(type, filename) {
    try {
      return fs.existsSync(this.getFilePath(type, filename));
    } catch {
      return false;
    }
  },
};
