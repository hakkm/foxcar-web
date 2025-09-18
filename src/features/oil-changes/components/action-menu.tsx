import * as React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { oilChangeFormSchema, type OilChangeForm, type OilChangeItem, oilTypes } from '../oil-change.type';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { updateOilChange, deleteOilChange } from '../oil-changes.service';
import { toast } from 'sonner';

function formatDateYYYYMMDD(d: Date) { const yyyy=d.getFullYear(); const mm=String(d.getMonth()+1).padStart(2,'0'); const dd=String(d.getDate()).padStart(2,'0'); return `${yyyy}-${mm}-${dd}`; }

export function ActionMenuOilChange({ oilChange }: { oilChange: OilChangeItem }) {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const form = useForm<OilChangeForm>({
    resolver: zodResolver(oilChangeFormSchema) as any,
    defaultValues: { ...oilChange }
  });

  async function onSubmit(values: OilChangeForm) {
    try {
      await updateOilChange(oilChange.id as number, values as any);
      toast.success('Vidange mise à jour');
      setOpenEdit(false);
    } catch(e: any) { toast.error(e?.message || 'Erreur mise à jour'); }
  }

  async function onDelete() {
    try {
      await deleteOilChange(oilChange.id as number);
      toast.success('Vidange supprimée');
      setOpenDelete(false);
    } catch(e: any) { toast.error(e?.message || 'Erreur suppression'); }
  }

  return <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onSelect={() => setOpenEdit(true)}>Modifier</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive" onSelect={() => setOpenDelete(true)}>Supprimer</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Dialog open={openEdit} onOpenChange={setOpenEdit}>
      <DialogContent className="max-w-2xl">
        <DialogHeader><DialogTitle>Modifier vidange</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
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
            <DialogFooter className="gap-2"><Button type="button" variant="outline" onClick={()=> setOpenEdit(false)}>Annuler</Button><Button type="submit">Enregistrer</Button></DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>

    <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer la vidange ?</AlertDialogTitle>
          <AlertDialogDescription>Action irréversible.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>;
}
