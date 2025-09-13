import { z } from "zod";

export const contractItemSchema = z.object({
  id: z.number().optional(),
  contract_number: z.string().min(1),
  booking_id: z.number().int().positive(),
  notes: z.string().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type ContractItem = z.infer<typeof contractItemSchema>;

export const contractFormSchema = z.object({
  contract_number: z.string().min(1, "Numéro requis"),
  booking_id: z.coerce.number().int().positive(),
  notes: z.string().optional().nullable(),
});
export type ContractForm = z.infer<typeof contractFormSchema>;
