import useSWR from "swr";
import type { VehicleItem } from "./vehicle.type";

// Use /api prefix so Vite proxy forwards to backend
const API_BASE = "/api";

export function useVehicles(
  search: string,
  page: number,
  perPage: number,
  keepPreviousData: boolean
) {
  const term = (search ?? "").trim();
  const shouldFetch = term.length >= 2 || term.length === 0;
  const { data, isLoading, mutate } = useSWR<{
    data: VehicleItem[];
    pagination: any;
  }>(
    shouldFetch
      ? `${API_BASE}/vehicles?search=${encodeURIComponent(term)}&page=${
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
  console.log("useVehicles", { term, shouldFetch, data, isLoading });

  return {
    data: data?.data ?? [],
    isLoading,
    mutate,
    pagination: data?.pagination,
  };
}

export async function getVehicle(id: number) {
  const res = await fetch(`${API_BASE}/vehicles/${id}`);
  if (!res.ok) throw new Error("Failed to fetch vehicle");
  return (await res.json()) as VehicleItem;
}

export async function createVehicle(payload: Partial<VehicleItem>) {
  const res = await fetch(`${API_BASE}/vehicles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create vehicle");
  return (await res.json()) as VehicleItem;
}

export async function updateVehicle(id: number, payload: Partial<VehicleItem>) {
  const res = await fetch(`${API_BASE}/vehicles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update vehicle");
  return (await res.json()) as VehicleItem;
}

export async function deleteVehicle(id: number) {
  const res = await fetch(`${API_BASE}/vehicles/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete vehicle");
  return true;
}
