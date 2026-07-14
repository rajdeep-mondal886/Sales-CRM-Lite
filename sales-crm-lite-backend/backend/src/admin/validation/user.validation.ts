import { z } from "zod";

export const updateUserRoleValidation = z.object({
  body: z.object({
    role: z.enum(["admin", "user"])
  })
});
