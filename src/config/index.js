import "dotenv/config";

const required = (name) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const config = {
  env: process.env.NODE_ENV || "development",

  server: {
    host: process.env.HOST || "0.0.0.0",
    port: Number(process.env.PORT || 4000),
  },

  media: {
    videosPath: required("MEDIA_VIDEOS_PATH"),
    imagesPath: required("MEDIA_IMAGES_PATH"),
    publicUrl: required("MEDIA_PUBLIC_URL"),
  },

  security: {
    apiKey: required("API_KEY"),
  },

  cache: {
    maxAge: Number(process.env.MAX_AGE || 86400),
  },
};

export default config;
