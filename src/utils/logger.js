const timestamp = () => {
  return new Date().toISOString();
};

export const logger = {
  info(message, data = "") {
    console.log(`[${timestamp()}] INFO  ${message}`, data);
  },

  warn(message, data = "") {
    console.warn(`[${timestamp()}] WARN  ${message}`, data);
  },

  error(message, data = "") {
    console.error(`[${timestamp()}] ERROR ${message}`, data);
  },
};
