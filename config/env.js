import dotenv from "dotenv";

dotenv.config(); 

export const env = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV || "development", 
  dbUri: process.env.DB_URI,
  jwtSecret: process.env.JWT_SECRET,
  mailHost: process.env.MAILTRAP_HOST,
  mailPort: process.env.MAILTRAP_PORT,
  mailUser: process.env.MAILTRAP_USER,
  mailPass: process.env.MAILTRAP_PASS,
  saltRounds: process.env.SALT_ROUNDS || 12
};
