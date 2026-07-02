import mongoose, { Schema, models, model } from "mongoose";

const CareerSchema = new Schema(
  {
    institutionName: { type: String, default: "" },
    courseName: { type: String, default: "" },
    from: { type: String, default: "" },
    to: { type: String, default: "" },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

const Career = models.Career || model("Career", CareerSchema);
export default Career;