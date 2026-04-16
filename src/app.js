import dotenv from "dotenv";
dotenv.config();

import express from "express";
import userRoutes from "../Modules/user.routes.js";
import otpRoutes from "../modules/otp.routes.js";
import messageRoutes from "../Modules/message.routes.js"; 


const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

// OTP routes
app.use("/", otpRoutes); 

// User routes
app.use("/users", userRoutes);

//multer
app.use("/uploads", express.static("src/uploads"));

// Message routes
app.use("/api/messages", messageRoutes); 
// Test route
app.get("/", (req, res) => {
    res.json({ message: "Saraha API Running" });
});

export default app;
