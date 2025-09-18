import { useNavigate } from 'react-router-dom';
import { AddInsuranceForm } from '@/features/insurances/components/add-insurance-form';
import { toast } from 'sonner';

export default function AddInsurancePage(){
  const navigate = useNavigate();
  function handleCreated(){ toast.success('Assurance créée'); navigate('/control/insurances'); }
  return (
    <div className='max-w-3xl'>
      <h1 className='text-lg font-semibold mb-4'>Nouvelle assurance</h1>
      <AddInsuranceForm onCreated={handleCreated} />
    </div>
  );
}
