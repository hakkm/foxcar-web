import useSWR from "swr";
import type { InvoiceItem } from "./invoice.type";

const API_BASE = "/api";

export function useInvoices(search: string, page: number, perPage: number, keepPreviousData: boolean) {
  const term = (search ?? "").trim();
  const shouldFetch = term.length >= 2 || term.length === 0;
  const { data, isLoading } = useSWR<{ data: InvoiceItem[]; pagination: any }>(
    shouldFetch ? `${API_BASE}/invoices?search=${encodeURIComponent(term)}&page=${page + 1}&per_page=${perPage}` : null,
    {
      keepPreviousData,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 700,
    }
  );
  return { data: data?.data ?? [], isLoading, pagination: data?.pagination };
}

export async function createInvoice(payload: Partial<InvoiceItem>) {
  const res = await fetch(`${API_BASE}/invoices`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Création échouée");
  return (await res.json()) as InvoiceItem;
}

export async function updateInvoice(id: number, payload: Partial<InvoiceItem>) {
  const res = await fetch(`${API_BASE}/invoices/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Mise à jour échouée");
  return (await res.json()) as InvoiceItem;
}

export async function deleteInvoice(id: number) {
  const res = await fetch(`${API_BASE}/invoices/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Suppression échouée");
  return true;
}
