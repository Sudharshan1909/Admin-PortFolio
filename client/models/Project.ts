import mongoose, { Schema, models, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, default: "" },
    demoText: { type: String, default: "" },
    link: { type: String, default: "" },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

const Project = models.Project || model("Project", ProjectSchema);
export default Project;