import { useNavigate } from 'react-router-dom';
import { AddTechnicalInspectionForm } from '@/features/technical-inspections/components/add-technical-inspection-form';
import { toast } from 'sonner';

export default function AddTechnicalInspectionPage(){
  const navigate = useNavigate();
  function handleCreated(){ toast.success('Inspection créée'); navigate('/control/technical-inspections'); }
  return (
    <div className='max-w-3xl'>
      <h1 className='text-lg font-semibold mb-4'>Nouvelle inspection</h1>
      <AddTechnicalInspectionForm onCreated={handleCreated} />
    </div>
  );
}
