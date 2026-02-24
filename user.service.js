import User from "./user.model.js";
import bcrypt from "bcryptjs";
import Joi from "joi";

export const createUser = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already exists"); 

  // pass hash 
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, email, password: hashedPassword });
  return await user.save();
};

// Reg Validate
const LoginSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.pattern.base": "Email must be valid",
    }),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base": "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
    }),
})
// joi validate

// export const validateLogin = (data) => {
//   const schema = Joi.object({
//     email: Joi.string()
//       .email()
//       .required()
//       .messages({
//         "string.empty": "Email is required",
//         "string.email": "Email must be valid joi Validate--",  
//       }),
//     password: Joi.string()
//       .min(6)
//       .required()
//       .messages({
//         "string.empty": "Password is required",
//         "string.min": "Password must be at least 6 characters",
//       }),
//        username: Joi.string()
//     .optional()
  
  
//   });
  



//   const { error } = schema.validate(data, { abortEarly: false });
//   if (error) {
//     const errors = error.details.map(d => d.message);
//     throw new Error(JSON.stringify(errors));
//   }
// };
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("Invalid email or password");

  console.log("Password from request:", password);
console.log("Password in DB:", user.password);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password"); 



  return user;
};

