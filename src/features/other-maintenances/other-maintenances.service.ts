import useSWR from 'swr';
import type { OtherMaintenanceItem } from './other-maintenance.type';

const API_BASE = '/api';

export function useOtherMaintenances(search: string, page: number, perPage: number, keepPreviousData: boolean){
  const term = (search ?? '').trim();
  const shouldFetch = term.length >= 2 || term.length === 0;
  const { data, isLoading } = useSWR<{ data: OtherMaintenanceItem[]; pagination: any}>(
    shouldFetch ? `${API_BASE}/other-maintenances?search=${encodeURIComponent(term)}&page=${page+1}&per_page=${perPage}` : null,
    { keepPreviousData, revalidateOnFocus:false, revalidateOnReconnect:false, dedupingInterval:700 }
  );
  return { data: data?.data ?? [], isLoading, pagination: data?.pagination };
}

export async function createOtherMaintenance(payload: Partial<OtherMaintenanceItem>){
  const res = await fetch(`${API_BASE}/other-maintenances`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
  if(!res.ok) throw new Error('Création échouée');
  return res.json();
}
export async function updateOtherMaintenance(id:number, payload: Partial<OtherMaintenanceItem>){
  const res = await fetch(`${API_BASE}/other-maintenances/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
  if(!res.ok) throw new Error('Mise à jour échouée');
  return res.json();
}
export async function deleteOtherMaintenance(id:number){
  const res = await fetch(`${API_BASE}/other-maintenances/${id}`, { method:'DELETE' });
  if(!res.ok) throw new Error('Suppression échouée');
  return true;
}
