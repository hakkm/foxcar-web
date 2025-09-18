import { z } from 'zod';

export const technicalInspectionItemSchema = z.object({
  id: z.number().optional(),
  vehicle_id: z.number().int().positive(),
  inspection_center: z.string().min(1),
  inspection_center_phone: z.string().min(1),
  inspection_center_address: z.string().min(1),
  last_inspection_date: z.string().min(1),
  next_inspection_date: z.string().min(1),
  total_amount: z.number().nonnegative(),
  notes: z.string().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});
export type TechnicalInspectionItem = z.infer<typeof technicalInspectionItemSchema>;

export const technicalInspectionFormSchema = z.object({
  vehicle_id: z.coerce.number().int().positive(),
  inspection_center: z.string().min(1),
  inspection_center_phone: z.string().min(1),
  inspection_center_address: z.string().min(1),
  last_inspection_date: z.string().min(1),
  next_inspection_date: z.string().min(1),
  total_amount: z.coerce.number().nonnegative(),
  notes: z.string().optional().nullable(),
});
export type TechnicalInspectionForm = z.infer<typeof technicalInspectionFormSchema>;
