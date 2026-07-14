import { Document, Schema, Types, model } from "mongoose";

export interface ILead extends Document {
  title: string;
  company: string;
  contactEmail?: string;
  value: number;
  status: string;
  stage: string;
  owner: Types.ObjectId;
}

const leadSchema = new Schema<ILead>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    contactEmail: { type: String },
    value: { type: Number, default: 0 },
    status: { type: String, default: "new" },
    stage: { type: String, default: "qualified" },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export const Lead = model<ILead>("Lead", leadSchema);
