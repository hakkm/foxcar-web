import * as React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otherMaintenanceFormSchema, type OtherMaintenanceForm, type OtherMaintenanceItem } from '../other-maintenance.type';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { updateOtherMaintenance, deleteOtherMaintenance } from '../other-maintenances.service';
import { toast } from 'sonner';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

function formatDateYYYYMMDD(d: Date){const yyyy=d.getFullYear();const mm=String(d.getMonth()+1).padStart(2,'0');const dd=String(d.getDate()).padStart(2,'0');return `${yyyy}-${mm}-${dd}`;}

export function ActionMenuOtherMaintenance({ item }: { item: OtherMaintenanceItem }){
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const form = useForm<OtherMaintenanceForm>({ resolver: zodResolver(otherMaintenanceFormSchema) as any, defaultValues: { ...item } });

  async function onSubmit(values: OtherMaintenanceForm){
    try { await updateOtherMaintenance(item.id as number, values as any); toast.success('Maintenance mise à jour'); setOpenEdit(false);} catch(e:any){ toast.error(e?.message || 'Erreur'); }
  }
  async function onDelete(){
    try { await deleteOtherMaintenance(item.id as number); toast.success('Maintenance supprimée'); setOpenDelete(false);} catch(e:any){ toast.error(e?.message || 'Erreur'); }
  }

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
        <DialogHeader><DialogTitle>Modifier maintenance</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 py-2'>
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
