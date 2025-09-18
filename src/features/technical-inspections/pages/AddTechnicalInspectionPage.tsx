import { AddTechnicalInspectionForm } from '../components/add-technical-inspection-form';

export function AddTechnicalInspectionPage(){
  return <div className='space-y-4'>
    <h1 className='text-xl font-semibold'>Nouvelle inspection</h1>
    <AddTechnicalInspectionForm />
  </div>;
}
