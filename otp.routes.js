import { Router } from "express";
import { sendOTPController } from "./otp.controller.js";

const router = Router();

router.post("/send-otp", sendOTPController);

export default router;
