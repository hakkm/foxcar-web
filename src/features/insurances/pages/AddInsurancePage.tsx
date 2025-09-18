import { AddInsuranceForm } from '../components/add-insurance-form';

export function AddInsurancePage(){
  return <div className='space-y-4'>
    <h1 className='text-xl font-semibold'>Nouvelle assurance</h1>
    <AddInsuranceForm />
  </div>;
}
