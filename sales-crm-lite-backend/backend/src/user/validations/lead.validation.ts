import { z } from "zod";

export const createLeadValidation = z.object({
  body: z.object({
    title: z.string().min(1),
    company: z.string().min(1),
    contactEmail: z.string().email().optional(),
    value: z.number().nonnegative().optional(),
    stage: z.string().optional()
  })
});
