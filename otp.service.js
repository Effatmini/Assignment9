import { transporter } from "./email.js";

export const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: "noreply@example.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}. It is valid for 5 minutes.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (err) {
    console.error("Error sending OTP:", err);
    throw new Error("Failed to send OTP");
  }
};