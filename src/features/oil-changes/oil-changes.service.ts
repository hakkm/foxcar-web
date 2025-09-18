import useSWR from "swr";
import type { OilChangeItem } from "./oil-change.type";

const API_BASE = "/api";

export function useOilChanges(search: string, page: number, perPage: number, keepPreviousData: boolean) {
  const term = (search ?? "").trim();
  const shouldFetch = term.length >= 2 || term.length === 0;
  const { data, isLoading } = useSWR<{ data: OilChangeItem[]; pagination: any }>(
    shouldFetch ? `${API_BASE}/oil-changes?search=${encodeURIComponent(term)}&page=${page + 1}&per_page=${perPage}` : null,
    {
      keepPreviousData,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 700,
    }
  );
  return { data: data?.data ?? [], isLoading, pagination: data?.pagination };
}

export async function createOilChange(payload: Partial<OilChangeItem>) {
  const res = await fetch(`${API_BASE}/oil-changes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Création échouée");
  return (await res.json()) as OilChangeItem;
}

export async function updateOilChange(id: number, payload: Partial<OilChangeItem>) {
  const res = await fetch(`${API_BASE}/oil-changes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Mise à jour échouée");
  return (await res.json()) as OilChangeItem;
}

export async function deleteOilChange(id: number) {
  const res = await fetch(`${API_BASE}/oil-changes/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Suppression échouée");
  return true;
}
