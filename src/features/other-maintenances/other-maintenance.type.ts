import { z } from 'zod';

export const otherMaintenanceItemSchema = z.object({
  id: z.number().optional(),
  vehicle_id: z.number().int().positive(),
  service_center: z.string().min(1),
  service_center_phone: z.string().min(1),
  service_center_address: z.string().min(1),
  maintenance_type: z.string().min(1),
  maintenance_date: z.string().min(1), // YYYY-MM-DD
  current_mileage: z.number().int().nonnegative(),
  total_amount: z.number().nonnegative(),
  description: z.string().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});
export type OtherMaintenanceItem = z.infer<typeof otherMaintenanceItemSchema>;

export const otherMaintenanceFormSchema = z.object({
  vehicle_id: z.coerce.number().int().positive(),
  service_center: z.string().min(1),
  service_center_phone: z.string().min(1),
  service_center_address: z.string().min(1),
  maintenance_type: z.string().min(1),
  maintenance_date: z.string().min(1),
  current_mileage: z.coerce.number().int().nonnegative(),
  total_amount: z.coerce.number().nonnegative(),
  description: z.string().optional().nullable(),
});
export type OtherMaintenanceForm = z.infer<typeof otherMaintenanceFormSchema>;
