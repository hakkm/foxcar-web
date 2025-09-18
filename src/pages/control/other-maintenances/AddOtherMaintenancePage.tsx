import { useNavigate } from 'react-router-dom';
import { AddOtherMaintenanceForm } from '@/features/other-maintenances/components/add-other-maintenance-form';
import { toast } from 'sonner';

export default function AddOtherMaintenancePage(){
  const navigate = useNavigate();
  function handleCreated(){ toast.success('Maintenance créée'); navigate('/control/other-maintenances'); }
  return (
    <div className='max-w-3xl'>
      <h1 className='text-lg font-semibold mb-4'>Nouvelle maintenance</h1>
      <AddOtherMaintenanceForm onCreated={handleCreated} />
    </div>
  );
}
