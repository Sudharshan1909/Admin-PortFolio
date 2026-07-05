import mongoose, { Schema, models, model } from "mongoose";

const SettingsSchema = new Schema(
  {
    publicTheme: { type: String, default: "midnight" },
  },
  { timestamps: true }
);

const Settings = models.Settings || model("Settings", SettingsSchema);
export default Settings;
