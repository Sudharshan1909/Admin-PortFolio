import mongoose, { Schema, models, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    organization: { type: String, default: "" },
    title: { type: String, default: "" },
    link: { type: String, default: "" },
    issueId: { type: String, default: "" }
  },
  { timestamps: true }
);

const Certificate = models.Certificate || model("Certificate", CertificateSchema);
export default Certificate;