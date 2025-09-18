import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { technicalInspectionFormSchema, type TechnicalInspectionForm } from '../technical-inspection.type';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { createTechnicalInspection } from '../technical-inspections.service';

function formatDateYYYYMMDD(d: Date){const yyyy=d.getFullYear();const mm=String(d.getMonth()+1).padStart(2,'0');const dd=String(d.getDate()).padStart(2,'0');return `${yyyy}-${mm}-${dd}`;}

export function AddTechnicalInspectionForm({ onCreated }: { onCreated?: () => void }){
  const today = formatDateYYYYMMDD(new Date());
  const form = useForm<TechnicalInspectionForm>({ resolver: zodResolver(technicalInspectionFormSchema) as any, defaultValues:{ vehicle_id:1, inspection_center:'Inspection Center', inspection_center_phone:'+1234567890', inspection_center_address:'789 Inspection Blvd', last_inspection_date: today, next_inspection_date: today, total_amount:45, notes:'' } });

  async function onSubmit(values: TechnicalInspectionForm){
    try { await createTechnicalInspection(values as any); toast.success('Inspection ajoutée'); onCreated?.(); form.reset(); } catch(e:any){ toast.error(e?.message || 'Erreur'); }
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <FormField control={form.control} name='vehicle_id' render={({field})=> <FormItem><FormLabel>ID Véhicule</FormLabel><FormControl><Input type='number' {...field} /></FormControl><FormMessage/></FormItem>} />
        <FormField control={form.control} name='inspection_center' render={({field})=> <FormItem><FormLabel>Centre</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
        <FormField control={form.control} name='inspection_center_phone' render={({field})=> <FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
        <FormField control={form.control} name='inspection_center_address' render={({field})=> <FormItem><FormLabel>Adresse</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>} />
        <FormField control={form.control} name='last_inspection_date' render={({field})=> <FormItem className='flex flex-col'><FormLabel>Dernière inspection</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant='outline' className={cn('w-full justify-start text-left font-normal', !field.value && 'text-muted-foreground')}>{field.value || <span>Sélectionner</span>}<CalendarIcon className='ml-auto h-4 w-4 opacity-50' /></Button></FormControl></PopoverTrigger><PopoverContent className='w-auto p-0' align='start'><Calendar mode='single' captionLayout='dropdown' selected={field.value? new Date(field.value):undefined} onSelect={(d)=> d && field.onChange(formatDateYYYYMMDD(d))} /></PopoverContent></Popover><FormMessage/></FormItem>} />
        <FormField control={form.control} name='next_inspection_date' render={({field})=> <FormItem className='flex flex-col'><FormLabel>Prochaine inspection</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant='outline' className={cn('w-full justify-start text-left font-normal', !field.value && 'text-muted-foreground')}>{field.value || <span>Sélectionner</span>}<CalendarIcon className='ml-auto h-4 w-4 opacity-50' /></Button></FormControl></PopoverTrigger><PopoverContent className='w-auto p-0' align='start'><Calendar mode='single' captionLayout='dropdown' selected={field.value? new Date(field.value):undefined} onSelect={(d)=> d && field.onChange(formatDateYYYYMMDD(d))} /></PopoverContent></Popover><FormMessage/></FormItem>} />
        <FormField control={form.control} name='total_amount' render={({field})=> <FormItem><FormLabel>Montant</FormLabel><FormControl><Input type='number' step='0.01' {...field} /></FormControl><FormMessage/></FormItem>} />
        <FormField control={form.control} name='notes' render={({field})=> <FormItem className='md:col-span-2'><FormLabel>Notes</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} /></FormControl><FormMessage/></FormItem>} />
      </div>
      <div className='flex justify-end'><Button type='submit'>Enregistrer</Button></div>
    </form>
  </Form>;
}
