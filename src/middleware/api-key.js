import crypto from "node:crypto";

import config from "../config/index.js";

const expectedKey = Buffer.from(config.security.apiKey);

const isValidKey = (apiKey) => {
  const provided = Buffer.from(apiKey);

  // Constant-time comparison to avoid timing attacks
  return (
    provided.length === expectedKey.length &&
    crypto.timingSafeEqual(provided, expectedKey)
  );
};

export const requireApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: "API key required",
    });
  }

  if (!isValidKey(apiKey)) {
    return res.status(403).json({
      success: false,
      error: "Invalid API key",
    });
  }

  next();
};
