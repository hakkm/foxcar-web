import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleFormSchema, type VehicleForm, fuelTypes, statuses, gearboxTypes, vehicleTypes } from "../vehicle.type";
import { createVehicle } from "../vehicles.service";
import { toast } from "sonner";

export default function AddVehicleForm({ onCreated }: { onCreated?: () => void }) {
  const form = useForm<VehicleForm>({
    resolver: zodResolver(vehicleFormSchema) as any,
    defaultValues: {
      registration_number: "",
      brand: "",
      model: "",
      year: undefined as unknown as number,
      vehicle_release_date: "",
      mileage: undefined as unknown as number,
      number_of_seats: undefined as unknown as number,
      fuel_type: "petrol",
      status: "available",
      rental_price_per_day: undefined as unknown as number,
      gearbox_type: "manual",
      air_conditioning: false,
      vehicle_type: "sedan",
    },
  });

  async function onSubmit(values: VehicleForm) {
    try {
      await createVehicle(values as any);
      toast.success("Vehicle created");
      form.reset();
      onCreated?.();
    } catch (e) {
      toast.error("Failed to create vehicle");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="registration_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Number</FormLabel>
                <FormControl>
                  <Input placeholder="123456WW" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Dacia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input placeholder="Duster" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="2024" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vehicle_release_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Release Date</FormLabel>
                <FormControl>
                  <Input placeholder="01/01/2024" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mileage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mileage</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="91400" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number_of_seats"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Seats</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fuel_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Type</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      {fuelTypes.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rental_price_per_day"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per Day</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="300" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gearbox_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gearbox Type</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gearbox" />
                    </SelectTrigger>
                    <SelectContent>
                      {gearboxTypes.map((g) => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vehicle_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Type</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleTypes.map((vt) => (
                        <SelectItem key={vt} value={vt}>{vt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="air_conditioning"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormLabel>AC</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Create Vehicle</Button>
      </form>
    </Form>
  );
}
