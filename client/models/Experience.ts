import mongoose, { Schema, models, model } from "mongoose";

const ExperienceSchema = new Schema(
  {
    companyName: { type: String, default: "" },
    role: { type: String, default: "" },
    description: { type: String, default: "" },
    proofImageUrl: { type: String, default: "" },
    skillsLearned: [{ type: String }]
  },
  { timestamps: true }
);

const Experience = models.Experience || model("Experience", ExperienceSchema);
export default Experience;