import { Router } from "express";
import { loginController , registerController } from "./user.controller.js";
import { authMiddleware } from "./auth.middleware.js";

const router = Router();


router.post("/register", registerController);
router.post("/login", loginController);


router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "This is a protected route",
    user: req.user 
  });
});
export default router;