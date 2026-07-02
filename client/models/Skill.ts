import mongoose, { Schema, models, model } from "mongoose";

const SkillSchema = new Schema(
  {
    name: { type: String, default: "" },
    category: {
      type: String,
      enum: ["technical", "soft"],
      default: "technical"
    }
  },
  { timestamps: true }
);

const Skill = models.Skill || model("Skill", SkillSchema);
export default Skill;