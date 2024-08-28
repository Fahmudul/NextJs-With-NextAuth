import mongoose from "mongoose";
interface User {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  verifyToken: string;
  verifyTokenExpires: Date;
  date: Date;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
}
const userSchema = new mongoose.Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    verifyToken: { type: String },
    verifyTokenExpires: { type: Date, default: Date.now() },
    date: { type: Date, default: Date.now() },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  {
    collection: "Users",
  }
);

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);
export default Users;
