
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, loginUser } from "./user.service.js";
import { sendOTP } from "./otp.service.js"; // فايل الـ OTP
import { generateKeyPair } from "./cryptoHelper.js";
// -------------------------
// Register Controller
// -------------------------
export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
      // create keys
    const { publicKey, privateKey } = generateKeyPair();

    // createUser
    console.log({ username, email, password });
console.log({ publicKey, privateKey });

    const user = await createUser({ username, email, password, publicKey });


     const otp = Math.floor(100000 + Math.random() * 900000);

    // send otp
    await sendOTP(email, otp);

    res.status(201).json({
      message: "User registered successfully. OTP sent to email ",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        publicKey: user.publicKey
      },
      privateKey,
    });
  } catch (err) {
    if (err.message === "Email already exists") {
      return res.status(409).json({ message: err.message });
    }
     console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------
// Login Controller
// -------------------------
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // login check
    const user = await loginUser({ email, password });

    // gen JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
