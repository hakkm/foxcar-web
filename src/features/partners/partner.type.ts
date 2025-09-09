import { z } from "zod";

export const partnerStatuses = ["active", "inactive", "suspended"] as const;

export const partnerItemSchema = z.object({
  id: z.number().optional(),
  company_name: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  partnership_start_date: z.string().min(1), // DD/MM/YYYY
  partnership_end_date: z.string().min(1),   // DD/MM/YYYY
  status: z.enum(partnerStatuses),
  description: z.string().optional().nullable(),
});

export type PartnerItem = z.infer<typeof partnerItemSchema>;

export const partnerFormSchema = partnerItemSchema.extend({});
export type PartnerForm = z.infer<typeof partnerFormSchema>;
