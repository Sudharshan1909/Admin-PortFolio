import mongoose, { Schema, models, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    organizationName: { type: String, default: "" },
    certificateName: { type: String, default: "" },
    credentialLink: { type: String, default: "" },
    journalNote: { type: String, default: "" },
    proofImageUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

const Certificate = models.Certificate || model("Certificate", CertificateSchema);
export default Certificate;