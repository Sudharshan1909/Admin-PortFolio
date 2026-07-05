import mongoose, { Schema, models, model } from "mongoose";

const CareerEntrySchema = new Schema(
  {
    institution: { type: String, default: "" },
    degree: { type: String, default: "" },
    from: { type: String, default: "" },
    to: { type: String, default: "" },
    cgpa: { type: String, default: "" },
  },
  { _id: false }
);

const CareerSchema = new Schema(
  {
    careerEducation: { type: [CareerEntrySchema], default: [] },
  },
  { timestamps: true }
);

const Career = models.Career || model("Career", CareerSchema);
export default Career;