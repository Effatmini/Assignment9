import { Router } from "express";
import { loginController , registerController } from "./user.controller.js";
import { authMiddleware } from "./auth.middleware.js";
import { uploadAvatar , uploadCover} from "../src/middlewares/multer.middleware.js";
import User from "./user.model.js";
import crypto from "node:crypto";  
import nodemailer from "nodemailer";

const router = Router();


router.post("/register", registerController);
router.post("/login", loginController);


router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "This is a protected route",
    user: req.user 
  });
});


// Upload Avatar
router.post(
  "/avatar",
  authMiddleware,
  uploadAvatar.single("avatar"),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      user.avatar = `/uploads/avatars/${req.file.filename}`;
      await user.save();
      res.status(201).json({ message: "profile Pic uploaded", avatar: user.avatar });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);


// Remove Avatar
router.delete(
  "/avatar",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      user.avatar = null;
      await user.save();
      res.json({ message: "Profile Pic removed" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);




//upload Cover
router.post(
  "/cover",
  authMiddleware,
  uploadCover.array("covers", 2), 
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const existing = user.coverImages || [];
      const newImages = req.files.map(f => `/uploads/covers/${f.filename}`);

      if (existing.length + newImages.length > 2)
        return res.status(400).json({ message: "Total cover images cannot exceed 2" });

      user.coverImages = [...existing, ...newImages];
      await user.save();

      res.status(201).json({ message: "Cover images uploaded", coverImages: user.coverImages });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);


// profile visit 
router.get("/profile/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $inc: { profileVisits: 1 } }, 
      { new: true } 
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      email: user.email,
      avatar: user.avatar,
      coverImages: user.coverImages,
      profileVisits: user.profileVisits
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});




router.get("/visits", authMiddleware, async (req, res) => {
  try {
   
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find({}, "email profileVisits"); 
    res.json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

  
});
router.post("/forgot-password", async (req,res)=>{
  const { email } = req.body;

  const user = await User.findOne({ email });
  if(!user) return res.status(404).json({ msg: "User not found" });


  const token = crypto.randomBytes(20).toString("hex");
  const expiry = Date.now() + 3600000; // ساعة

  user.resetToken = token;
  user.resetTokenExpiry = expiry;
  await user.save();

  const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",  
  port: 587,                  
  auth: { 
    user: "e8e3cc5cddf358",    
    pass: "022c68f2e1a5bf"    
  }
});
 const resetLink = `http://localhost:5000/reset-password/${token}`;

await transporter.sendMail({
  from: 'email@test.com',  
  to: email,
  subject: "Reset Password",
  text: `Click here to reset your password: ${resetLink}`
});

  res.json({ msg: "Reset link sent to email" });
});

router.post("/reset-password/:token", async (req,res)=>{
  const { token } = req.params;
  const { newPassword } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if(!user) return res.status(400).json({ msg: "Invalid or expired token" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.json({ msg: "Password reset successfully" });
});
export default router;