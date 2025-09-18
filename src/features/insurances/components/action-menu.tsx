import * as React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insuranceFormSchema, type InsuranceForm, type InsuranceItem, insuranceTypes, insuranceVehicleUsages } from '../insurance.type';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { updateInsurance, deleteInsurance } from '../insurances.service';
import { toast } from 'sonner';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

function formatDateYYYYMMDD(d: Date){const yyyy=d.getFullYear();const mm=String(d.getMonth()+1).padStart(2,'0');const dd=String(d.getDate()).padStart(2,'0');return `${yyyy}-${mm}-${dd}`;}

export function ActionMenuInsurance({ item }: { item: InsuranceItem }){
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const form = useForm<InsuranceForm>({ resolver: zodResolver(insuranceFormSchema) as any, defaultValues: { ...item } });

  async function onSubmit(values: InsuranceForm){
    try { await updateInsurance(item.id as number, values as any); toast.success('Assurance mise à jour'); setOpenEdit(false);} catch(e:any){ toast.error(e?.message || 'Erreur'); }
  }
  async function onDelete(){
    try { await deleteInsurance(item.id as number); toast.success('Assurance supprimée'); setOpenDelete(false);} catch(e:any){ toast.error(e?.message || 'Erreur'); }
  }

  const dateField = (name: 'insurance_start_date'|'insurance_end_date', label: string) => <FormField control={form.control} name={name} render={({field})=> <FormItem className='flex flex-col'><FormLabel>{label}</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant='outline' className={cn('w-full justify-start text-left font-normal', !field.value && 'text-muted-foreground')}>{field.value || <span>Sélectionner</span>}<CalendarIcon className='ml-auto h-4 w-4 opacity-50' /></Button></FormControl></PopoverTrigger><PopoverContent className='w-auto p-0' align='start'><Calendar mode='single' captionLayout='dropdown' selected={field.value? new Date(field.value):undefined} onSelect={(d)=> d && field.onChange(formatDateYYYYMMDD(d))} /></PopoverContent></Popover><FormMessage/></FormItem>} />;

  return <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'><MoreHorizontal className='h-4 w-4' /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onSelect={()=> setOpenEdit(true)}>Modifier</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-destructive' onSelect={()=> setOpenDelete(true)}>Supprimer</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Dialog open={openEdit} onOpenChange={setOpenEdit}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader><DialogTitle>Modifier assurance</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 py-2'>
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
            <DialogFooter className='gap-2'><Button type='button' variant='outline' onClick={()=> setOpenEdit(false)}>Annuler</Button><Button type='submit'>Enregistrer</Button></DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>

    <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer ?</AlertDialogTitle>
          <AlertDialogDescription>Action irréversible.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>;
}
