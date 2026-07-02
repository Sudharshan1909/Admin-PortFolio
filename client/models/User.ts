import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    role: { type: String, default: "admin" }
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);