import { z } from "zod";

export const createTaskValidation = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    dueDate: z.string().optional(),
    lead: z.string().optional()
  })
});
