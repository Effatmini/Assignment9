import mongoose from "mongoose";
import { env } from "./env.js";


const connectDB = async () => {
  try {
    await mongoose.connect(env.dbUri);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};


export { connectDB };