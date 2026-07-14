import { z } from "zod";

export const updateLeadStageValidation = z.object({
  body: z.object({
    stage: z.string().min(1),
    status: z.string().optional()
  })
});
