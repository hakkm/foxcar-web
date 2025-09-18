import { z } from "zod";

export const oilTypes = ["synthetic","semi_synthetic","mineral"] as const;

export const oilChangeItemSchema = z.object({
  id: z.number().optional(),
  vehicle_id: z.number().int().positive(),
  service_center: z.string().min(1),
  last_oil_change_date: z.string().min(1), // YYYY-MM-DD
  mileage_at_last_oil_change: z.number().int().nonnegative(),
  oil_type: z.enum(oilTypes),
  oil_filter_replaced: z.boolean(),
  air_filter_replaced: z.boolean(),
  fuel_filter_replaced: z.boolean(),
  cabin_filter_replaced: z.boolean(),
  total_amount: z.number().nonnegative(),
  notes: z.string().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});
export type OilChangeItem = z.infer<typeof oilChangeItemSchema>;

export const oilChangeFormSchema = z.object({
  vehicle_id: z.coerce.number().int().positive(),
  service_center: z.string().min(1),
  last_oil_change_date: z.string().min(1),
  mileage_at_last_oil_change: z.coerce.number().int().nonnegative(),
  oil_type: z.enum(oilTypes),
  oil_filter_replaced: z.boolean(),
  air_filter_replaced: z.boolean(),
  fuel_filter_replaced: z.boolean(),
  cabin_filter_replaced: z.boolean(),
  total_amount: z.coerce.number().nonnegative(),
  notes: z.string().optional().nullable(),
});
export type OilChangeForm = z.infer<typeof oilChangeFormSchema>;
