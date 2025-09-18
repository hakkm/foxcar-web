import useSWR from 'swr';
import type { InsuranceItem } from './insurance.type';

const API_BASE = '/api';

export function useInsurances(search:string, page:number, perPage:number, keepPreviousData:boolean){
  const term = (search ?? '').trim();
  const shouldFetch = term.length >= 2 || term.length === 0;
  const { data, isLoading } = useSWR<{ data: InsuranceItem[]; pagination:any }>(
    shouldFetch ? `${API_BASE}/insurances?search=${encodeURIComponent(term)}&page=${page+1}&per_page=${perPage}` : null,
    { keepPreviousData, revalidateOnFocus:false, revalidateOnReconnect:false, dedupingInterval:700 }
  );
  return { data: data?.data ?? [], isLoading, pagination: data?.pagination };
}

export async function createInsurance(payload: Partial<InsuranceItem>){
  const res = await fetch(`${API_BASE}/insurances`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
  if(!res.ok) throw new Error('Création échouée');
  return res.json();
}
export async function updateInsurance(id:number, payload: Partial<InsuranceItem>){
  const res = await fetch(`${API_BASE}/insurances/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
  if(!res.ok) throw new Error('Mise à jour échouée');
  return res.json();
}
export async function deleteInsurance(id:number){
  const res = await fetch(`${API_BASE}/insurances/${id}`, { method:'DELETE' });
  if(!res.ok) throw new Error('Suppression échouée');
  return true;
}
