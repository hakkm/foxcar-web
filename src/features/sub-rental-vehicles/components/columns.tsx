import type { ColumnDef } from "@tanstack/react-table";
import type { SubRentalVehicleItem } from "../sub-rental-vehicle.type";

export const columns: ColumnDef<SubRentalVehicleItem>[] = [
  { accessorKey: "registration_number", header: "Immatriculation" },
  { accessorKey: "brand", header: "Marque" },
  { accessorKey: "model", header: "Modèle" },
  { accessorKey: "status", header: "Statut" },
  { accessorKey: "rental_price_per_day", header: "Prix/jour" },
];
