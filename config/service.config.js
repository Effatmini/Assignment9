import { env } from "./env.js";

export const serviceConfig = {
  isProduction: env.nodeEnv === "production",
  isDevelopment: env.nodeEnv === "development",

  jwt: {
    secret: env.jwtSecret,
    expiresIn: env.nodeEnv === "production" ? "7d" : "1d",
  },

  server: {
    port: env.port,
  },
};
