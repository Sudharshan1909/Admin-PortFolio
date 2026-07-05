import mongoose, { Schema, models, model } from "mongoose";

const ContactLinkSchema = new Schema(
  {
    label: { type: String, default: "" },
    url: { type: String, default: "" },
  },
  { _id: false }
);

const ProfileSchema = new Schema(
  {
    name: { type: String, default: "" },
    role: { type: String, default: "" },
    location: { type: String, default: "" },
    email: { type: String, default: "" },
    summary: { type: String, default: "" },
    image: { type: String, default: "" },
    contactLinks: { type: [ContactLinkSchema], default: [] },
  },
  { timestamps: true }
);

const Profile = models.Profile || model("Profile", ProfileSchema);

export default Profile;