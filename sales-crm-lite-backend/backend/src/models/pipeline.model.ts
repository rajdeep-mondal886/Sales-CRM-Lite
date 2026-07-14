import { Document, Schema, model } from "mongoose";

export interface IPipelineStage {
  name: string;
  order: number;
}

export interface IPipeline extends Document {
  name: string;
  stages: IPipelineStage[];
  isDefault: boolean;
}

const stageSchema = new Schema<IPipelineStage>(
  {
    name: { type: String, required: true },
    order: { type: Number, required: true }
  },
  { _id: false }
);

const pipelineSchema = new Schema<IPipeline>(
  {
    name: { type: String, required: true },
    stages: { type: [stageSchema], default: [] },
    isDefault: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Pipeline = model<IPipeline>("Pipeline", pipelineSchema);
