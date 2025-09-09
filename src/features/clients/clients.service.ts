import useSWR from "swr";
import type { ClientItem } from "./client.type";

// Use /api prefix so Vite proxy forwards to backend
const API_BASE = "/api";

export function useClients(
  search: string,
  page: number,
  perPage: number,
  keepPreviousData: boolean
) {
  const term = (search ?? "").trim();
  const shouldFetch = term.length >= 2 || term.length === 0;
  const { data, isLoading } = useSWR<{ data: ClientItem[]; pagination: any }>(
    shouldFetch
      ? `${API_BASE}/clients?search=${encodeURIComponent(term)}&page=${
          page + 1
        }&per_page=${perPage}`
      : null,
    {
      keepPreviousData,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 700,
    }
  );
  return {
    data: data?.data ?? [],
    isLoading,
    pagination: data?.pagination,
  };
}

export async function getClient(id: number) {
  const res = await fetch(`${API_BASE}/clients/${id}`);
  if (!res.ok) throw new Error("Failed to fetch client");
  return (await res.json()) as ClientItem;
}

export async function createClient(payload: Partial<ClientItem>) {
  const res = await fetch(`${API_BASE}/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  console.log("createClient", res, res.ok);
  if (!res.ok) throw new Error("Failed to create client");
  // return (await res.json()) as ClientItem;
}

export async function updateClient(id: number, payload: Partial<ClientItem>) {
  const res = await fetch(`${API_BASE}/clients/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update client");
  return (await res.json()) as ClientItem;
}

export async function deleteClient(id: number) {
  const res = await fetch(`${API_BASE}/clients/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete client");
  return true;
}
