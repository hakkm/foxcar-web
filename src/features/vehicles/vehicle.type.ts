import { z } from "zod";

export const fuelTypes = ["petrol", "diesel", "electric", "hybrid"] as const;
export const statuses = [
  "available",
  "in_maintenance",
  "reserved",
  "in_accident",
] as const;
export const gearboxTypes = ["automatic", "manual"] as const;
export const vehicleTypes = [
  "sedan",
  "hatchback",
  "wagon",
  "suv",
  "crossover",
  "minivan",
  "luxury",
] as const;

const currentYear = new Date().getFullYear();

export const vehicleItemSchema = z.object({
  id: z.number().optional(),
  registration_number: z.string().min(1),
  brand: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int().min(currentYear - 5).max(currentYear),
  vehicle_release_date: z.string().min(1), // keep as string (backend sample uses DD/MM/YYYY)
  mileage: z.number().int().nonnegative(),
  number_of_seats: z.number().int().positive(),
  fuel_type: z.enum(fuelTypes),
  status: z.enum(statuses),
  rental_price_per_day: z.number().nonnegative(),
  gearbox_type: z.enum(gearboxTypes),
  air_conditioning: z.boolean(),
  vehicle_type: z.enum(vehicleTypes),
});

export type VehicleItem = z.infer<typeof vehicleItemSchema>;

export const vehicleFormSchema = z.object({
  registration_number: z.string().min(1, "Required"),
  brand: z.string().min(1, "Required"),
  model: z.string().min(1, "Required"),
  year: z.preprocess(
    (v) => (v === "" || v === undefined ? undefined : Number(v)),
    z
      .number()
      .int()
      .min(currentYear - 5, { message: `Year must be >= ${currentYear - 5}` })
      .max(currentYear, { message: `Year must be <= ${currentYear}` })
  ),
  vehicle_release_date: z.string().min(1, "Required"),
  mileage: z.preprocess(
    (v) => (v === "" || v === undefined ? undefined : Number(v)),
    z.number().int().nonnegative()
  ),
  number_of_seats: z.preprocess(
    (v) => (v === "" || v === undefined ? undefined : Number(v)),
    z.number().int().positive()
  ),
  fuel_type: z.enum(fuelTypes),
  status: z.enum(statuses),
  rental_price_per_day: z.preprocess(
    (v) => (v === "" || v === undefined ? undefined : Number(v)),
    z.number().nonnegative()
  ),
  gearbox_type: z.enum(gearboxTypes),
  air_conditioning: z.boolean(),
  vehicle_type: z.enum(vehicleTypes),
});

export type VehicleForm = z.infer<typeof vehicleFormSchema>;
