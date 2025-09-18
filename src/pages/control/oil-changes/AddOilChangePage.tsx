import { useNavigate } from 'react-router-dom';
import { AddOilChangeForm } from '@/features/oil-changes/components/add-oil-change-form';
import { toast } from 'sonner';

export default function AddOilChangePage(){
  const navigate = useNavigate();
  function handleCreated(){ toast.success('Vidange créée'); navigate('/control/oil-changes'); }
  return (
    <div className='max-w-3xl'>
      <h1 className='text-lg font-semibold mb-4'>Nouvelle vidange</h1>
      <AddOilChangeForm onCreated={handleCreated} />
    </div>
  );
}
