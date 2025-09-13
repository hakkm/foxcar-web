import useSWR from "swr";
import type { BookingItem } from "./booking.type";

const API_BASE = "/api";

export function useBookings(search: string, page: number, perPage: number, keepPreviousData: boolean) {
  const term = (search ?? "").trim();
  const shouldFetch = term.length >= 2 || term.length === 0;
  const { data, isLoading, mutate } = useSWR<{ data: BookingItem[]; pagination: any }>(
    shouldFetch
      ? `${API_BASE}/bookings?search=${encodeURIComponent(term)}&page=${page + 1}&per_page=${perPage}`
      : null,
    {
      keepPreviousData,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 700,
    }
  );
  return { data: data?.data ?? [], isLoading, mutate, pagination: data?.pagination };
}

export async function getBooking(id: number) {
  const res = await fetch(`${API_BASE}/bookings/${id}`);
  if (!res.ok) throw new Error("Échec du chargement de la réservation");
  return (await res.json()) as BookingItem;
}

export async function createBooking(payload: Partial<BookingItem>) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Échec de la création de la réservation");
  return (await res.json()) as BookingItem;
}

export async function updateBooking(id: number, payload: Partial<BookingItem>) {
  const res = await fetch(`${API_BASE}/bookings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Échec de la mise à jour de la réservation");
  return (await res.json()) as BookingItem;
}

export async function deleteBooking(id: number) {
  const res = await fetch(`${API_BASE}/bookings/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Échec de la suppression de la réservation");
  return true;
}
