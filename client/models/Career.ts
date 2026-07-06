import mongoose, { Schema, models, model } from "mongoose";

const CareerSchema = new Schema(
  {
    institution: { type: String, default: "" },
    degree: { type: String, default: "" },
    from: { type: String, default: "" },
    to: { type: String, default: "" },
    cgpa: { type: String, default: "" },
  },
  { timestamps: true }
);

const Career = models.Career || model("Career", CareerSchema);
export default Career;
