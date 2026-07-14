import { Pipeline } from "../models/pipeline.model";

const DEFAULT_STAGES = [
  { name: "new", order: 0 },
  { name: "qualified", order: 1 },
  { name: "proposal", order: 2 },
  { name: "negotiation", order: 3 },
  { name: "closed-won", order: 4 },
  { name: "closed-lost", order: 5 },
];

export async function seedDefaultPipeline() {
  const existing = await Pipeline.findOne({ isDefault: true });
  if (existing) return;

  await Pipeline.create({
    name: "Default Sales Pipeline",
    stages: DEFAULT_STAGES,
    isDefault: true,
  });
}
