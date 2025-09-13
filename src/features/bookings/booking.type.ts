import { z } from "zod";

export const bookingStatuses = [
  "confirmed",
  "cancelled",
  "completed",
  "pending",
] as const;

export const paymentTypes = [
  "cash",
  "bank_transfer",
  "cheque",
  "credit_card",
] as const;

export const bookingItemSchema = z.object({
  id: z.number().optional(),
  booking_number: z.string().min(1),
  client_id: z.number().int().positive(),
  vehicle_id: z.number().int().positive(),
  is_sub_rental: z.boolean(),
  franchise_id: z.number().int().positive(),
  pickup_location: z.string().min(1),
  dropoff_location: z.string().min(1),
  pickup_timestamp: z.string().min(1), // YYYY-MM-DDTHH:mm
  dropoff_timestamp: z.string().min(1),
  number_of_days: z.number().int().positive(),
  status: z.enum(bookingStatuses),
  total_amount: z.number().nonnegative(),
  additional_amount: z.number().nonnegative(),
  note: z.string().optional().nullable(),
  deposit_amount: z.number().nonnegative(),
  flight_number: z.string().optional().nullable(),
  comment: z.string().optional().nullable(),
  payment_type: z.enum(paymentTypes),
});

export type BookingItem = z.infer<typeof bookingItemSchema>;

export const bookingFormSchema = z.object({
  booking_number: z.string().min(1, "Champ requis"),
  client_id: z.coerce.number().int().positive(),
  vehicle_id: z.coerce.number().int().positive(),
  is_sub_rental: z.boolean(),
  franchise_id: z.coerce.number().int().positive(),
  pickup_location: z.string().min(1, "Champ requis"),
  dropoff_location: z.string().min(1, "Champ requis"),
  pickup_timestamp: z.string().min(1, "Champ requis"),
  dropoff_timestamp: z.string().min(1, "Champ requis"),
  number_of_days: z.coerce.number().int().positive(),
  status: z.enum(bookingStatuses),
  total_amount: z.coerce.number().nonnegative(),
  additional_amount: z.coerce.number().nonnegative(),
  note: z.string().optional().nullable(),
  deposit_amount: z.coerce.number().nonnegative(),
  flight_number: z.string().optional().nullable(),
  comment: z.string().optional().nullable(),
  payment_type: z.enum(paymentTypes),
});
export type BookingForm = z.infer<typeof bookingFormSchema>;
