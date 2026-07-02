import mongoose, { Schema, models, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    projectName: { type: String, default: "" },
    projectLink: { type: String, default: "" },
    features: [{ type: String }],
    toolsUsed: [{ type: String }]
  },
  { timestamps: true }
);

const Project = models.Project || model("Project", ProjectSchema);
export default Project;