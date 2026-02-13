import nodemailer from "nodemailer";
import { env } from "../config/env.js";

export const transporter = nodemailer.createTransport({
  host: env.mailHost,
  port: Number(env.mailPort),
  secure: false, 
  auth: {
    user: env.mailUser,
    pass: env.mailPass
  },
  logger: true
});