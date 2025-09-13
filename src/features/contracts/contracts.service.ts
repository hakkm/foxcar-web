import useSWR from "swr";
import type { ContractItem } from "./contract.type";

const API_BASE = "/api";

export function useContracts(search: string, page: number, perPage: number, keepPreviousData: boolean) {
  const term = (search ?? "").trim();
  const shouldFetch = term.length >= 2 || term.length === 0;
  const { data, isLoading } = useSWR<{ data: ContractItem[]; pagination: any }>(
    shouldFetch ? `${API_BASE}/contracts?search=${encodeURIComponent(term)}&page=${page + 1}&per_page=${perPage}` : null,
    {
      keepPreviousData,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 700,
    }
  );
  return { data: data?.data ?? [], isLoading, pagination: data?.pagination };
}

export async function createContract(payload: Partial<ContractItem>) {
  const res = await fetch(`${API_BASE}/contracts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Création échouée");
  return (await res.json()) as ContractItem;
}

export async function updateContract(id: number, payload: Partial<ContractItem>) {
  const res = await fetch(`${API_BASE}/contracts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Mise à jour échouée");
  return (await res.json()) as ContractItem;
}

export async function deleteContract(id: number) {
  const res = await fetch(`${API_BASE}/contracts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Suppression échouée");
  return true;
}
