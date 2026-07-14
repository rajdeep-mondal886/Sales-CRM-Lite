import bcrypt from "bcryptjs";
import { Document, Model, Schema, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  comparePassword(rawPassword: string): Promise<boolean>;
}

interface UserModel extends Model<IUser> {}

const userSchema = new Schema<IUser, UserModel>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ["admin", "user"], default: "user" }
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function comparePassword(rawPassword: string) {
  return bcrypt.compare(rawPassword, this.password);
};

export const User = model<IUser, UserModel>("User", userSchema);
