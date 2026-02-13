import { sendOTP } from "./otp.service.js";

export const sendOTPController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    // create otp random
    const otp = Math.floor(100000 + Math.random() * 900000); 

  

    await sendOTP(email, otp);

    res.status(200).json({ message: "OTP sent to your email", otp }); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
