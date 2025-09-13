import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import { createSubRentalVehicle } from "@/features/sub-rental-vehicles/sub-rental-vehicles.service";
import { subRentalVehicleFormSchema, type SubRentalVehicleForm } from "@/features/sub-rental-vehicles/sub-rental-vehicle.type";

const formSchema = subRentalVehicleFormSchema;

type FormValues = SubRentalVehicleForm;

export function AddSubRentalVehicleForm({ partnerId, onCreated }: { partnerId?: number; onCreated?: () => void }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      registration_number: "123456WW",
      brand: "Dacia",
      model: "Duster",
      year: new Date().getFullYear(),
      vehicle_release_date: format(new Date(), "dd/MM/yyyy"),
      mileage: 91400,
      number_of_seats: 5,
      fuel_type: "petrol",
      status: "available",
      rental_price_per_day: 300,
      gearbox_type: "manual",
      air_conditioning: true,
      vehicle_type: "suv",
      is_sub_rental: true,
      partner_id: partnerId ?? 1,
      rental_price_per_day_from_partner: 250,
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      await createSubRentalVehicle(values as any);
      toast.success("Véhicule ajouté avec succès");
      onCreated?.();
      form.reset();
    } catch (e: any) {
      toast.error(e?.message || "Erreur lors de la création");
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
                <FormLabel>Immatriculation</FormLabel>
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
                <FormLabel>Marque</FormLabel>
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
                <FormLabel>Modèle</FormLabel>
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
                <FormLabel>Année</FormLabel>
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
              <FormItem className="flex flex-col">
                <FormLabel>Date de mise en circulation</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          field.value
                        ) : (
                          <span>Sélectionner une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value.split("/").reverse().join("-")) : undefined}
                      onSelect={(date) =>
                        field.onChange(date ? format(date, "dd/MM/yyyy") : "")
                      }
                      initialFocus
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mileage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kilométrage</FormLabel>
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
                <FormLabel>Nombre de sièges</FormLabel>
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
                <FormLabel>Carburant</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="petrol">Essence</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Électrique</SelectItem>
                    <SelectItem value="hybrid">Hybride</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statut</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="available">Disponible</SelectItem>
                    <SelectItem value="in_maintenance">En maintenance</SelectItem>
                    <SelectItem value="reserved">Réservé</SelectItem>
                    <SelectItem value="in_accident">En accident</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rental_price_per_day"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix/jour</FormLabel>
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
                <FormLabel>Boîte</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="manual">Manuelle</SelectItem>
                    <SelectItem value="automatic">Automatique</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="air_conditioning"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Climatisation</FormLabel>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vehicle_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de véhicule</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sedan">Berline</SelectItem>
                    <SelectItem value="hatchback">Hatchback</SelectItem>
                    <SelectItem value="wagon">Break</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="crossover">Crossover</SelectItem>
                    <SelectItem value="minivan">Monospace</SelectItem>
                    <SelectItem value="luxury">Luxe</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="partner_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Partenaire (ID)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rental_price_per_day_from_partner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix/jour (partenaire)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="250" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Enregistrer</Button>
        </div>
      </form>
    </Form>
  );
}
