import useSWR from "swr";
import type { PartnerItem } from "./partner.type";

const API_BASE = "/api";

export function usePartners(search: string, page: number, perPage: number, keepPreviousData: boolean) {
  const term = (search ?? "").trim();
  const shouldFetch = term.length >= 2 || term.length === 0;
  const { data, isLoading } = useSWR<{ data: PartnerItem[]; pagination: any }>(
    shouldFetch
      ? `${API_BASE}/partners?search=${encodeURIComponent(term)}&page=${page + 1}&per_page=${perPage}`
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

export async function getPartner(id: number) {
  const res = await fetch(`${API_BASE}/partners/${id}`);
  if (!res.ok) throw new Error("Failed to fetch partner");
  return (await res.json()) as PartnerItem;
}

export async function createPartner(payload: Partial<PartnerItem>) {
  const res = await fetch(`${API_BASE}/partners`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create partner");
  return (await res.json()) as PartnerItem;
}

export async function updatePartner(id: number, payload: Partial<PartnerItem>) {
  const res = await fetch(`${API_BASE}/partners/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update partner");
  return (await res.json()) as PartnerItem;
}

export async function deletePartner(id: number) {
  const res = await fetch(`${API_BASE}/partners/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete partner");
  return true;
}
