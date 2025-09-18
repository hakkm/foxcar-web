import { z } from 'zod';

export const insuranceVehicleUsages = ['rental','personal','mixed'] as const; // include possible enums
export const insuranceTypes = ['comprehensive','liability','collision','theft'] as const;

export const insuranceItemSchema = z.object({
  id: z.number().optional(),
  vehicle_id: z.number().int().positive(),
  vehicle_usage: z.enum(insuranceVehicleUsages),
  order_number: z.string().min(1),
  insurance_type: z.enum(insuranceTypes),
  insurance_company: z.string().min(1),
  insurance_company_phone_number: z.string().min(1),
  policy_number: z.string().min(1),
  insurance_intermediary: z.string().nullable().optional(),
  insurance_start_date: z.string().min(1),
  insurance_end_date: z.string().min(1),
  number_of_covered_seats: z.number().int().positive(),
  total_amount: z.number().nonnegative(),
  notes: z.string().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});
export type InsuranceItem = z.infer<typeof insuranceItemSchema>;

export const insuranceFormSchema = z.object({
  vehicle_id: z.coerce.number().int().positive(),
  vehicle_usage: z.enum(insuranceVehicleUsages),
  order_number: z.string().min(1),
  insurance_type: z.enum(insuranceTypes),
  insurance_company: z.string().min(1),
  insurance_company_phone_number: z.string().min(1),
  policy_number: z.string().min(1),
  insurance_intermediary: z.string().optional().nullable(),
  insurance_start_date: z.string().min(1),
  insurance_end_date: z.string().min(1),
  number_of_covered_seats: z.coerce.number().int().positive(),
  total_amount: z.coerce.number().nonnegative(),
  notes: z.string().optional().nullable(),
});
export type InsuranceForm = z.infer<typeof insuranceFormSchema>;
