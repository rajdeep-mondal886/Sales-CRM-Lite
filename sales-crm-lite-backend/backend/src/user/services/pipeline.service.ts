import { Pipeline } from "../../models/pipeline.model";

export const UserPipelineService = {
  getPipelines: async () => Pipeline.find().sort({ createdAt: -1 })
};
