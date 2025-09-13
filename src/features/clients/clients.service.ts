import useSWR from "swr";
import type { ClientItem } from "./client.type";

// Use /api prefix so Vite proxy forwards to backend
const API_BASE = "/api";

function ddmmyyyyToIso(dateStr?: string): string | undefined {
  if (!dateStr) return undefined;
  // If already ISO, keep it
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const m = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return dateStr;
  const [, dd, mm, yyyy] = m;
  return `${yyyy}-${mm}-${dd}`;
}

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

export async function createClient(payload: Partial<ClientItem>): Promise<ClientItem> {
  // Convert date fields to YYYY-MM-DD as expected by backend
  const bodyPayload = {
    ...payload,
    date_of_birth: ddmmyyyyToIso(payload.date_of_birth),
    id_issue_date: ddmmyyyyToIso(payload.id_issue_date),
    id_expiry_date: ddmmyyyyToIso(payload.id_expiry_date),
    driver_license_issue_date: ddmmyyyyToIso(payload.driver_license_issue_date),
  };

  const res = await fetch(`${API_BASE}/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(bodyPayload),
  });

  if (!res.ok) {
    let details: any = undefined;
    try {
      details = await res.json();
    } catch {}
    const err: any = new Error(details?.message || "Échec de création du client");
    if (details?.errors) err.errors = details.errors;
    err.status = res.status;
    throw err;
  }
  const json = await res.json();
  // API returns { message, client }
  return (json?.client ?? json) as ClientItem;
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
