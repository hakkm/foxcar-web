import useSWR from "swr";
import type { VehicleItem } from "./vehicle.type";

const BASE = "http://127.0.0.1:8080";

export function useVehicles(search: string, keepPreviousData: boolean) {
  const { data, isLoading, mutate } = useSWR<VehicleItem[]>(`${BASE}/vehicles`, {
    keepPreviousData,
  });

  const q = (search ?? "").trim().toLowerCase();
  const list = data ?? [];
  const filtered = q
    ? list.filter((v) => {
        const hay = `${v.registration_number} ${v.brand} ${v.model} ${v.status} ${v.vehicle_type}`.toLowerCase();
        return hay.includes(q);
      })
    : list;

  return { data: filtered, isLoading, mutate };
}

export async function getVehicle(id: number) {
  const res = await fetch(`${BASE}/vehicles/${id}`);
  if (!res.ok) throw new Error("Failed to fetch vehicle");
  return (await res.json()) as VehicleItem;
}

export async function createVehicle(payload: Partial<VehicleItem>) {
  const res = await fetch(`${BASE}/vehicles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create vehicle");
  return (await res.json()) as VehicleItem;
}

export async function updateVehicle(id: number, payload: Partial<VehicleItem>) {
  const res = await fetch(`${BASE}/vehicles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update vehicle");
  return (await res.json()) as VehicleItem;
}

export async function deleteVehicle(id: number) {
  const res = await fetch(`${BASE}/vehicles/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete vehicle");
  return true;
}
