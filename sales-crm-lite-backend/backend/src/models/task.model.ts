import { Document, Schema, Types, model } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  dueDate?: Date;
  isDone: boolean;
  assignedTo: Types.ObjectId;
  lead?: Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    isDone: { type: Boolean, default: false },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
    lead: { type: Schema.Types.ObjectId, ref: "Lead" }
  },
  { timestamps: true }
);

export const Task = model<ITask>("Task", taskSchema);
