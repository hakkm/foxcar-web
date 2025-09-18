import { useState } from 'react';
import { useOilChanges } from '../oil-changes.service';
import { DataTable } from '@/components/data-table/data-table';
import { oilChangeColumns } from '../components/columns';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AddOilChangeForm } from '../components/add-oil-change-form';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';

export function OilChangesPage() {
  const [search, setSearch] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const debounced = useDebounce(search, 300);
  const { data, isLoading, pagination } = useOilChanges(debounced, pageIndex, pageSize, true);
  const [open, setOpen] = useState(false);
  const isTyping = debounced !== search;

  return <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold">Vidanges</h1>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Ajouter</Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader><DialogTitle>Nouvelle vidange</DialogTitle></DialogHeader>
          <AddOilChangeForm onCreated={()=> { setOpen(false); }} />
        </DialogContent>
      </Dialog>
    </div>
    <div className="flex gap-2">
      <Input placeholder="Recherche..." value={search} onChange={(e)=> setSearch(e.target.value)} className="max-w-xs" />
    </div>
    <DataTable
      columns={oilChangeColumns}
      data={data || []}
      isLoading={isLoading || isTyping}
      totalRows={pagination?.total || 0}
      currentPage={pageIndex}
      pageSize={pageSize}
      onPageChange={setPageIndex}
      onPageSizeChange={(s)=> { setPageSize(s); setPageIndex(0); }}
    />
  </div>;
}
