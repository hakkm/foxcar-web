import { z } from "zod";

export const franchiseStatuses = ["active", "inactive", "suspended"] as const;

export const franchiseItemSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  franchise_start_date: z.string().min(1), // DD/MM/YYYY
  franchise_end_date: z.string().min(1),   // DD/MM/YYYY
  status: z.enum(franchiseStatuses),
  description: z.string().optional().nullable(),
});

export type FranchiseItem = z.infer<typeof franchiseItemSchema>;

export const franchiseFormSchema = franchiseItemSchema.extend({});
export type FranchiseForm = z.infer<typeof franchiseFormSchema>;
