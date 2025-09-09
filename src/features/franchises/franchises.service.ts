import useSWR from "swr";
import type { FranchiseItem } from "./franchise.type";

const API_BASE = "/api";

export function useFranchises(search: string, page: number, perPage: number, keepPreviousData: boolean) {
  const term = (search ?? "").trim();
  const shouldFetch = term.length >= 2 || term.length === 0;
  const { data, isLoading } = useSWR<{ data: FranchiseItem[]; pagination: any }>(
    shouldFetch
      ? `${API_BASE}/franchises?search=${encodeURIComponent(term)}&page=${page + 1}&per_page=${perPage}`
      : null,
    {
      keepPreviousData,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 700,
    }
  );
  return { data: data?.data ?? [], isLoading, pagination: data?.pagination };
}

export async function getFranchise(id: number) {
  const res = await fetch(`${API_BASE}/franchises/${id}`);
  if (!res.ok) throw new Error("Failed to fetch franchise");
  return (await res.json()) as FranchiseItem;
}

export async function createFranchise(payload: Partial<FranchiseItem>) {
  const res = await fetch(`${API_BASE}/franchises`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create franchise");
  return (await res.json()) as FranchiseItem;
}

export async function updateFranchise(id: number, payload: Partial<FranchiseItem>) {
  const res = await fetch(`${API_BASE}/franchises/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update franchise");
  return (await res.json()) as FranchiseItem;
}

export async function deleteFranchise(id: number) {
  const res = await fetch(`${API_BASE}/franchises/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete franchise");
  return true;
}
