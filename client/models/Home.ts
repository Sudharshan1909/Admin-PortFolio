import mongoose, { Schema, models, model } from "mongoose";

const ProfileSchema = new Schema(
  {
    fullName: { type: String, default: "" },
    title: { type: String, default: "" },
    about: { type: String, default: "" },
    phone: { type: String, default: "" },
    gmail: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

const Profile = models.Profile || model("Profile", ProfileSchema);

export default Profile;