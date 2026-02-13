import User from "./user.model.js";
import bcrypt from "bcryptjs";

export const createUser = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already exists"); 

  // pass hash 
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, email, password: hashedPassword });
  return await user.save();
};


export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("Invalid email or password");

  console.log("Password from request:", password);
console.log("Password in DB:", user.password);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password"); 



  return user;
};

