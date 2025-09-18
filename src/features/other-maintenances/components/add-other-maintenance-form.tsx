import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otherMaintenanceFormSchema, type OtherMaintenanceForm } from '../other-maintenance.type';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { createOtherMaintenance } from '../other-maintenances.service';

function formatDateYYYYMMDD(d: Date){const yyyy=d.getFullYear();const mm=String(d.getMonth()+1).padStart(2,'0');const dd=String(d.getDate()).padStart(2,'0');return `${yyyy}-${mm}-${dd}`;}

export function AddOtherMaintenanceForm({ onCreated }: { onCreated?: () => void }){
  const form = useForm<OtherMaintenanceForm>({ resolver: zodResolver(otherMaintenanceFormSchema) as any, defaultValues:{ vehicle_id:1, service_center:'AutoCare Center', service_center_phone:'+1234567890', service_center_address:'123 Service St', maintenance_type:'brake_service', maintenance_date: formatDateYYYYMMDD(new Date()), current_mileage:15500, total_amount:350, description:'' } });

  async function onSubmit(values: OtherMaintenanceForm){
    try { await createOtherMaintenance(values as any); toast.success('Maintenance ajoutée'); onCreated?.(); form.reset(); } catch(e:any){ toast.error(e?.message || 'Erreur'); }
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <FormField control={form.control} name='vehicle_id' render={({field})=> <FormItem><FormLabel>ID Véhicule</FormLabel><FormControl><Input type='number' {...field} /></FormControl><FormMessage/></FormItem>} />
        <FormField control={form.control} name='service_center' render={({field})=> <FormItem><FormLabel>Centre</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
        <FormField control={form.control} name='service_center_phone' render={({field})=> <FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
        <FormField control={form.control} name='service_center_address' render={({field})=> <FormItem><FormLabel>Adresse</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
        <FormField control={form.control} name='maintenance_type' render={({field})=> <FormItem><FormLabel>Type</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
        <FormField control={form.control} name='maintenance_date' render={({field})=> <FormItem className='flex flex-col'><FormLabel>Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant='outline' className={cn('w-full justify-start text-left font-normal', !field.value && 'text-muted-foreground')}>{field.value || <span>Sélectionner</span>}<CalendarIcon className='ml-auto h-4 w-4 opacity-50' /></Button></FormControl></PopoverTrigger><PopoverContent className='w-auto p-0' align='start'><Calendar mode='single' captionLayout='dropdown' selected={field.value? new Date(field.value):undefined} onSelect={(d)=> d && field.onChange(formatDateYYYYMMDD(d))} /></PopoverContent></Popover><FormMessage/></FormItem>} />
        <FormField control={form.control} name='current_mileage' render={({field})=> <FormItem><FormLabel>Kilométrage</FormLabel><FormControl><Input type='number' {...field} /></FormControl><FormMessage/></FormItem>} />
        <FormField control={form.control} name='total_amount' render={({field})=> <FormItem><FormLabel>Montant</FormLabel><FormControl><Input type='number' step='0.01' {...field} /></FormControl><FormMessage/></FormItem>} />
        <FormField control={form.control} name='description' render={({field})=> <FormItem className='md:col-span-2'><FormLabel>Description</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} /></FormControl><FormMessage/></FormItem>} />
      </div>
      <div className='flex justify-end'><Button type='submit'>Enregistrer</Button></div>
    </form>
  </Form>;
}
