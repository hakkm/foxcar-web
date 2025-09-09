import useSWR from "swr";
import type { SubRentalVehicleItem } from "./sub-rental-vehicle.type";

const API_BASE = "/api";

export function useSubRentalVehicles(search: string, page: number, perPage: number, keepPreviousData: boolean) {
  const term = (search ?? "").trim();
  const shouldFetch = term.length >= 2 || term.length === 0;
  const { data, isLoading } = useSWR<{ data: SubRentalVehicleItem[]; pagination: any }>(
    shouldFetch
      ? `${API_BASE}/sub-rental-vehicles?search=${encodeURIComponent(term)}&page=${page + 1}&per_page=${perPage}`
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

export async function getSubRentalVehicle(id: number) {
  const res = await fetch(`${API_BASE}/sub-rental-vehicles/${id}`);
  if (!res.ok) throw new Error("Failed to fetch sub-rental vehicle");
  return (await res.json()) as SubRentalVehicleItem;
}

export async function createSubRentalVehicle(payload: Partial<SubRentalVehicleItem>) {
  const res = await fetch(`${API_BASE}/sub-rental-vehicles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create sub-rental vehicle");
  return (await res.json()) as SubRentalVehicleItem;
}

export async function updateSubRentalVehicle(id: number, payload: Partial<SubRentalVehicleItem>) {
  const res = await fetch(`${API_BASE}/sub-rental-vehicles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update sub-rental vehicle");
  return (await res.json()) as SubRentalVehicleItem;
}

export async function deleteSubRentalVehicle(id: number) {
  const res = await fetch(`${API_BASE}/sub-rental-vehicles/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete sub-rental vehicle");
  return true;
}
