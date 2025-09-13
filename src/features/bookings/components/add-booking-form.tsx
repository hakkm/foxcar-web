import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { bookingFormSchema, type BookingForm, bookingStatuses, paymentTypes } from "../booking.type";
import { createBooking } from "../bookings.service";
import { toast } from "sonner";

export function AddBookingForm() {
  const form = useForm<BookingForm>({
    resolver: zodResolver(bookingFormSchema) as any,
    defaultValues: {
      booking_number: "BC12354",
      client_id: 1,
      vehicle_id: 1,
      is_sub_rental: false,
      franchise_id: 1,
      pickup_location: "RAK",
      dropoff_location: "RAK",
      pickup_timestamp: "2025-09-01T10:00",
      dropoff_timestamp: "2025-09-30T10:00",
      number_of_days: 30,
      status: "confirmed",
      total_amount: 9000,
      additional_amount: 500,
      note: "Siège bébé",
      deposit_amount: 5000,
      flight_number: "BC1234",
      comment: null,
      payment_type: "cash",
    },
  });

  async function onSubmit(values: BookingForm) {
    try {
      await createBooking(values as any);
      toast.success("Réservation créée");
      form.reset();
    } catch (e) {
      toast.error("Échec de la création");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField name="booking_number" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>N° Réservation</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="client_id" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Client (ID)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="vehicle_id" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Véhicule (ID)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="is_sub_rental" control={form.control} render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel> Sous-location </FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="franchise_id" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Franchise (ID)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="pickup_location" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Lieu de prise en charge</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="dropoff_location" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Lieu de restitution</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="pickup_timestamp" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Date/heure de départ</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="dropoff_timestamp" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Date/heure de retour</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="number_of_days" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de jours</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="status" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Statut</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {bookingStatuses.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="total_amount" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Montant total</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="additional_amount" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Montant additionnel</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="note" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="deposit_amount" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Dépôt</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="flight_number" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Vol</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="payment_type" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Paiement</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {paymentTypes.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Enregistrer</Button>
        </div>
      </form>
    </Form>
  );
}
