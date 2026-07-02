import mongoose, { Schema, models, model } from "mongoose";

const JournalSchema = new Schema(
  {
    title: { type: String, default: "" },
    entry: { type: String, default: "" },
    type: {
      type: String,
      enum: ["certificate", "career", "project", "experience", "skill"],
      default: "project"
    }
  },
  { timestamps: true }
);

const Journal = models.Journal || model("Journal", JournalSchema);
export default Journal;