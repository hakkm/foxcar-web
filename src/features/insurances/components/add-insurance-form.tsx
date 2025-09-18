import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insuranceFormSchema, type InsuranceForm, insuranceTypes, insuranceVehicleUsages } from '../insurance.type';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { createInsurance } from '../insurances.service';

function formatDateYYYYMMDD(d: Date){const yyyy=d.getFullYear();const mm=String(d.getMonth()+1).padStart(2,'0');const dd=String(d.getDate()).padStart(2,'0');return `${yyyy}-${mm}-${dd}`;}

export function AddInsuranceForm({ onCreated }: { onCreated?: () => void }){
  const today = formatDateYYYYMMDD(new Date());
  const form = useForm<InsuranceForm>({ resolver: zodResolver(insuranceFormSchema) as any, defaultValues:{ vehicle_id:1, vehicle_usage:'rental', order_number:'ORD2024001', insurance_type:'comprehensive', insurance_company:'Assureur SA', insurance_company_phone_number:'+1234567890', policy_number:'POL123', insurance_intermediary:'', insurance_start_date: today, insurance_end_date: today, number_of_covered_seats:5, total_amount:1200, notes:'' } });

  async function onSubmit(values: InsuranceForm){
    try { await createInsurance(values as any); toast.success('Assurance ajoutée'); onCreated?.(); form.reset(); } catch(e:any){ toast.error(e?.message || 'Erreur'); }
  }

  const dateField = (name: 'insurance_start_date'|'insurance_end_date', label: string) => <FormField control={form.control} name={name} render={({field})=> <FormItem className='flex flex-col'><FormLabel>{label}</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant='outline' className={cn('w-full justify-start text-left font-normal', !field.value && 'text-muted-foreground')}>{field.value || <span>Sélectionner</span>}<CalendarIcon className='ml-auto h-4 w-4 opacity-50' /></Button></FormControl></PopoverTrigger><PopoverContent className='w-auto p-0' align='start'><Calendar mode='single' captionLayout='dropdown' selected={field.value? new Date(field.value):undefined} onSelect={(d)=> d && field.onChange(formatDateYYYYMMDD(d))} /></PopoverContent></Popover><FormMessage/></FormItem>} />;

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <FormField control={form.control} name='vehicle_id' render={({field})=> <FormItem><FormLabel>ID Véhicule</FormLabel><FormControl><Input type='number' {...field} /></FormControl><FormMessage/></FormItem>} />
        <FormField control={form.control} name='vehicle_usage' render={({field})=> <FormItem><FormLabel>Usage</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder='Sélectionner' /></SelectTrigger></FormControl><SelectContent>{insuranceVehicleUsages.map(v=> <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>} />
        <FormField control={form.control} name='order_number' render={({field})=> <FormItem><FormLabel>N° commande</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
        <FormField control={form.control} name='insurance_type' render={({field})=> <FormItem><FormLabel>Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder='Sélectionner' /></SelectTrigger></FormControl><SelectContent>{insuranceTypes.map(v=> <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>} />
        <FormField control={form.control} name='insurance_company' render={({field})=> <FormItem><FormLabel>Compagnie</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
        <FormField control={form.control} name='insurance_company_phone_number' render={({field})=> <FormItem><FormLabel>Téléphone compagnie</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
        <FormField control={form.control} name='policy_number' render={({field})=> <FormItem><FormLabel>N° police</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
        <FormField control={form.control} name='insurance_intermediary' render={({field})=> <FormItem><FormLabel>Intermédiaire</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage/></FormItem>} />
        {dateField('insurance_start_date','Début')}
        {dateField('insurance_end_date','Fin')}
        <FormField control={form.control} name='number_of_covered_seats' render={({field})=> <FormItem><FormLabel>Sièges couverts</FormLabel><FormControl><Input type='number' {...field} /></FormControl><FormMessage/></FormItem>} />
        <FormField control={form.control} name='total_amount' render={({field})=> <FormItem><FormLabel>Montant</FormLabel><FormControl><Input type='number' step='0.01' {...field} /></FormControl><FormMessage/></FormItem>} />
        <FormField control={form.control} name='notes' render={({field})=> <FormItem className='md:col-span-2'><FormLabel>Notes</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} /></FormControl><FormMessage/></FormItem>} />
      </div>
      <div className='flex justify-end'><Button type='submit'>Enregistrer</Button></div>
    </form>
  </Form>;
}
