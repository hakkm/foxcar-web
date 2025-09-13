import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { invoiceFormSchema, type InvoiceForm, invoiceStatuses, paymentMethods } from "../invoice.type";
import { createInvoice } from "../invoices.service";

function formatDateYYYYMMDD(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function AddInvoiceForm({ onCreated }: { onCreated?: () => void }) {
  const form = useForm<InvoiceForm>({
    resolver: zodResolver(invoiceFormSchema) as any,
    defaultValues: {
      invoice_number: "INV-2025-0001",
      client_id: 1,
      booking_id: 1,
      invoice_date: formatDateYYYYMMDD(new Date()),
      due_date: formatDateYYYYMMDD(new Date()),
      subtotal: 100,
      tax_amount: 20,
      total_amount: 120,
      status: "draft",
      payment_date: null,
      payment_method: null,
      notes: "",
    }
  });

  async function onSubmit(values: InvoiceForm) {
    try {
      await createInvoice(values as any);
      toast.success("Facture créée");
      onCreated?.();
      form.reset();
    } catch (e: any) {
      toast.error(e?.message || "Erreur création");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="invoice_number" render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro</FormLabel>
              <FormControl><Input placeholder="INV-2025-0001" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="client_id" render={({ field }) => (
            <FormItem>
              <FormLabel>ID Client</FormLabel>
              <FormControl><Input type="number" placeholder="1" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="booking_id" render={({ field }) => (
            <FormItem>
              <FormLabel>ID Réservation</FormLabel>
              <FormControl><Input type="number" placeholder="1" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="invoice_date" render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date facture</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}> {field.value || <span>Sélectionner</span>} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" captionLayout="dropdown" selected={field.value ? new Date(field.value) : undefined} onSelect={(d) => d && field.onChange(formatDateYYYYMMDD(d))} />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="due_date" render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date d'échéance</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}> {field.value || <span>Sélectionner</span>} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" captionLayout="dropdown" selected={field.value ? new Date(field.value) : undefined} onSelect={(d) => d && field.onChange(formatDateYYYYMMDD(d))} />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="subtotal" render={({ field }) => (
            <FormItem>
              <FormLabel>Sous-total</FormLabel>
              <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="tax_amount" render={({ field }) => (
            <FormItem>
              <FormLabel>Taxe</FormLabel>
              <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="total_amount" render={({ field }) => (
            <FormItem>
              <FormLabel>Total</FormLabel>
              <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="status" render={({ field }) => (
            <FormItem>
              <FormLabel>Statut</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger></FormControl>
                <SelectContent>
                  {invoiceStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="payment_date" render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date de paiement</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}> {field.value || <span>Non payée</span>} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" captionLayout="dropdown" selected={field.value ? new Date(field.value) : undefined} onSelect={(d) => field.onChange(d ? formatDateYYYYMMDD(d) : null)} />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="payment_method" render={({ field }) => (
            <FormItem>
              <FormLabel>Méthode paiement</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
                <FormControl><SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger></FormControl>
                <SelectContent>
                  {paymentMethods.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="notes" render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Notes</FormLabel>
              <FormControl><Textarea {...field} value={field.value ?? ""} placeholder="Notes..." /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="flex justify-end"><Button type="submit">Enregistrer</Button></div>
      </form>
    </Form>
  );
}
