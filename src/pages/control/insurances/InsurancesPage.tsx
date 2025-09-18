import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataTable } from '@/components/data-table/data-table';
import { insuranceColumns } from '@/features/insurances/components/columns';
import { useInsurances } from '@/features/insurances/insurances.service';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';

export default function InsurancesPage(){
  const [search, setSearch] = React.useState('');
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const debounced = useDebounce(search, 300);
  const { data, isLoading, pagination } = useInsurances(debounced, pageIndex, pageSize, true);
  const isTyping = search !== debounced;

  return (
    <div>
      <h1 className='mb-4 text-lg font-semibold'>Assurances</h1>

      <div className='mb-4 flex items-center justify-between'>
        <div className='search-container flex-1 mr-8'>
          <Input type='text' value={search} onChange={(e)=> setSearch(e.target.value)} placeholder='Rechercher...' autoFocus className='w-full' />
        </div>
        <div className='flex items-center py-4 gap-2'>
          <Link to='/control/insurances/create' className='inline-flex items-center gap-2'>
            <Button variant='outline' size='sm'><Plus /><span className='hidden lg:inline'>Ajouter</span></Button>
          </Link>
        </div>
      </div>

      <DataTable data={data ?? []} columns={insuranceColumns} isLoading={isLoading || isTyping} totalRows={pagination?.total || 0} currentPage={pageIndex} pageSize={pageSize} onPageChange={setPageIndex} onPageSizeChange={(s)=> { setPageSize(s); setPageIndex(0); }} />
    </div>
  );
}
