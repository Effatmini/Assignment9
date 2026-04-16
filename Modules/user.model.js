import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
{
username: {
type: String,
required: true,
trim: true,
minlength: 3,
maxlength: 30,
},
email: {
type: String,
required: true,
unique: true,
lowercase: true,
trim: true,
},
password: {
type: String,
required: true,
minlength: 6,
select: false,
},
resetToken: String,
  resetTokenExpiry: Date,
  
role: { type: String, default: "user" },

 avatar: { type: String, default: null },
 profileVisits: { type: Number, default: 0 },
 publicKey: { type: String, required: false } 

},
{
timestamps: true,
}
);


const User = mongoose.model("User", userSchema);
export default User;