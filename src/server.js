import dotenv from "dotenv";
dotenv.config(); 

import app from "./app.js";
import { connectDB, env } from "../config/index.js";

dotenv.config();


connectDB();


app.listen(env.port, () => {
console.log(`Server running on port ${env.port}`);
});