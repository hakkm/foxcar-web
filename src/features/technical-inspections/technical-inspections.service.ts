import useSWR from 'swr';
import type { TechnicalInspectionItem } from './technical-inspection.type';

const API_BASE = '/api';

export function useTechnicalInspections(search: string, page:number, perPage:number, keepPreviousData:boolean){
  const term = (search ?? '').trim();
  const shouldFetch = term.length >= 2 || term.length === 0;
  const { data, isLoading } = useSWR<{ data: TechnicalInspectionItem[]; pagination:any }>(
    shouldFetch ? `${API_BASE}/technical-inspections?search=${encodeURIComponent(term)}&page=${page+1}&per_page=${perPage}` : null,
    { keepPreviousData, revalidateOnFocus:false, revalidateOnReconnect:false, dedupingInterval:700 }
  );
  return { data: data?.data ?? [], isLoading, pagination: data?.pagination };
}

export async function createTechnicalInspection(payload: Partial<TechnicalInspectionItem>){
  const res = await fetch(`${API_BASE}/technical-inspections`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
  if(!res.ok) throw new Error('Création échouée');
  return res.json();
}
export async function updateTechnicalInspection(id:number, payload: Partial<TechnicalInspectionItem>){
  const res = await fetch(`${API_BASE}/technical-inspections/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
  if(!res.ok) throw new Error('Mise à jour échouée');
  return res.json();
}
export async function deleteTechnicalInspection(id:number){
  const res = await fetch(`${API_BASE}/technical-inspections/${id}`, { method:'DELETE' });
  if(!res.ok) throw new Error('Suppression échouée');
  return true;
}
