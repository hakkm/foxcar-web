import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { oilChangeFormSchema, type OilChangeForm, oilTypes } from "../oil-change.type";
import { createOilChange } from "../oil-changes.service";

function formatDateYYYYMMDD(d: Date) { const yyyy=d.getFullYear(); const mm=String(d.getMonth()+1).padStart(2,'0'); const dd=String(d.getDate()).padStart(2,'0'); return `${yyyy}-${mm}-${dd}`; }

export function AddOilChangeForm({ onCreated }: { onCreated?: () => void }) {
  const form = useForm<OilChangeForm>({
    resolver: zodResolver(oilChangeFormSchema) as any,
    defaultValues: {
      vehicle_id: 1,
      service_center: "QuickLube Pro",
      last_oil_change_date: formatDateYYYYMMDD(new Date()),
      mileage_at_last_oil_change: 15000,
      oil_type: 'synthetic',
      oil_filter_replaced: true,
      air_filter_replaced: false,
      fuel_filter_replaced: false,
      cabin_filter_replaced: true,
      total_amount: 85.5,
      notes: "",
    }
  });

  async function onSubmit(values: OilChangeForm) {
    try {
      await createOilChange(values as any);
      toast.success("Vidange créée");
      onCreated?.();
      form.reset();
    } catch (e: any) { toast.error(e?.message || "Erreur création"); }
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={form.control} name="vehicle_id" render={({ field }) => <FormItem><FormLabel>ID Véhicule</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>} />
        <FormField control={form.control} name="service_center" render={({ field }) => <FormItem><FormLabel>Centre</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
        <FormField control={form.control} name="last_oil_change_date" render={({ field }) => <FormItem className="flex flex-col"><FormLabel>Date vidange</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant="outline" className={cn('w-full justify-start text-left font-normal', !field.value && 'text-muted-foreground')}>{field.value || <span>Sélectionner</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" captionLayout="dropdown" selected={field.value? new Date(field.value):undefined} onSelect={(d)=> d && field.onChange(formatDateYYYYMMDD(d))} /></PopoverContent></Popover><FormMessage /></FormItem>} />
        <FormField control={form.control} name="mileage_at_last_oil_change" render={({ field }) => <FormItem><FormLabel>Kilométrage</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>} />
        <FormField control={form.control} name="oil_type" render={({ field }) => <FormItem><FormLabel>Huile</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger></FormControl><SelectContent>{oilTypes.map(o=> <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>} />
        <FormField control={form.control} name="oil_filter_replaced" render={({ field }) => <FormItem className="flex flex-row items-center justify-between rounded border p-3"><FormLabel className="text-sm">Filtre huile</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>} />
        <FormField control={form.control} name="air_filter_replaced" render={({ field }) => <FormItem className="flex flex-row items-center justify-between rounded border p-3"><FormLabel className="text-sm">Filtre air</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>} />
        <FormField control={form.control} name="fuel_filter_replaced" render={({ field }) => <FormItem className="flex flex-row items-center justify-between rounded border p-3"><FormLabel className="text-sm">Filtre carburant</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>} />
        <FormField control={form.control} name="cabin_filter_replaced" render={({ field }) => <FormItem className="flex flex-row items-center justify-between rounded border p-3"><FormLabel className="text-sm">Filtre habitacle</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>} />
        <FormField control={form.control} name="total_amount" render={({ field }) => <FormItem><FormLabel>Montant</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>} />
        <FormField control={form.control} name="notes" render={({ field }) => <FormItem className="md:col-span-2"><FormLabel>Notes</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>} />
      </div>
      <div className="flex justify-end"><Button type="submit">Enregistrer</Button></div>
    </form>
  </Form>;
}
