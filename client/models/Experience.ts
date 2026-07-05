import mongoose, { Schema, models, model } from "mongoose";

const ExperienceSchema = new Schema(
  {
    company: { type: String, default: "" },
    location: { type: String, default: "" },
    employmentType: { type: String, default: "" },
    role: { type: String, default: "" },
    duration: { type: String, default: "" },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

const Experience = models.Experience || model("Experience", ExperienceSchema);
export default Experience;