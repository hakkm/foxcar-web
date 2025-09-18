import { useState } from 'react';
import { useTechnicalInspections } from '../technical-inspections.service';
import { DataTable } from '@/components/data-table/data-table';
import { technicalInspectionColumns } from '../components/columns';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AddTechnicalInspectionForm } from '../components/add-technical-inspection-form';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';

export function TechnicalInspectionsPage(){
  const [search, setSearch] = useState('');
  const [pageIndex, setPageIndex] = useState(0); const [pageSize, setPageSize] = useState(10); const debounced = useDebounce(search,300);
  const { data, isLoading, pagination } = useTechnicalInspections(debounced, pageIndex, pageSize, true);
  const [open,setOpen] = useState(false); const isTyping = debounced !== search;
  return <div className='space-y-4'>
    <div className='flex items-center justify-between'>
      <h1 className='text-xl font-semibold'>Inspections techniques</h1>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild><Button>Ajouter</Button></DialogTrigger>
        <DialogContent className='max-w-3xl'><DialogHeader><DialogTitle>Nouvelle inspection</DialogTitle></DialogHeader><AddTechnicalInspectionForm onCreated={()=> setOpen(false)} /></DialogContent>
      </Dialog>
    </div>
    <div className='flex gap-2'><Input placeholder='Recherche...' value={search} onChange={(e)=> setSearch(e.target.value)} className='max-w-xs' /></div>
    <DataTable columns={technicalInspectionColumns} data={data || []} isLoading={isLoading || isTyping} totalRows={pagination?.total || 0} currentPage={pageIndex} pageSize={pageSize} onPageChange={setPageIndex} onPageSizeChange={(s)=> { setPageSize(s); setPageIndex(0);} } />
  </div>;
}
