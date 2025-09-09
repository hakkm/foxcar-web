import { z } from "zod";
import { fuelTypes, statuses, gearboxTypes, vehicleTypes } from "../vehicles/vehicle.type";

export const subRentalVehicleItemSchema = z.object({
  id: z.number().optional(),
  registration_number: z.string().min(1),
  brand: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int().min(new Date().getFullYear() - 5).max(new Date().getFullYear()),
  vehicle_release_date: z.string().min(1), // DD/MM/YYYY
  mileage: z.number().int().nonnegative(),
  number_of_seats: z.number().int().positive(),
  fuel_type: z.enum(fuelTypes),
  status: z.enum(statuses),
  rental_price_per_day: z.number().nonnegative(),
  gearbox_type: z.enum(gearboxTypes),
  air_conditioning: z.boolean(),
  vehicle_type: z.enum(vehicleTypes),

  is_sub_rental: z.literal(true),
  partner_id: z.number().int().positive(),
  rental_price_per_day_from_partner: z.number().nonnegative(),
});

export type SubRentalVehicleItem = z.infer<typeof subRentalVehicleItemSchema>;

// Form schema: coerce string inputs to numbers where necessary
const currentYear = new Date().getFullYear();
export const subRentalVehicleFormSchema = z.object({
  registration_number: z.string().min(1),
  brand: z.string().min(1),
  model: z.string().min(1),
  year: z.coerce
    .number()
    .int()
    .min(currentYear - 5, { message: `L'année doit être >= ${currentYear - 5}` })
    .max(currentYear, { message: `L'année doit être <= ${currentYear}` }),
  vehicle_release_date: z.string().min(1), // DD/MM/YYYY
  mileage: z.coerce.number().int().nonnegative(),
  number_of_seats: z.coerce.number().int().positive(),
  fuel_type: z.enum(fuelTypes),
  status: z.enum(statuses),
  rental_price_per_day: z.coerce.number().nonnegative(),
  gearbox_type: z.enum(gearboxTypes),
  air_conditioning: z.boolean(),
  vehicle_type: z.enum(vehicleTypes),

  is_sub_rental: z.literal(true),
  partner_id: z.coerce.number().int().positive(),
  rental_price_per_day_from_partner: z.coerce.number().nonnegative(),
});
export type SubRentalVehicleForm = z.infer<typeof subRentalVehicleFormSchema>;
