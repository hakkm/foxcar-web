import type { ColumnDef } from "@tanstack/react-table";
import type { BookingItem } from "../booking.type";

export const columns: ColumnDef<BookingItem>[] = [
  {
    accessorKey: "booking_number",
    header: "N° Réservation",
  },
  {
    accessorKey: "client_id",
    header: "Client",
    cell: ({ row }) => `#${row.original.client_id}`,
  },
  {
    accessorKey: "vehicle_id",
    header: "Véhicule",
    cell: ({ row }) => `#${row.original.vehicle_id}`,
  },
  {
    accessorKey: "status",
    header: "Statut",
  },
  {
    accessorKey: "pickup_timestamp",
    header: "Début",
  },
  {
    accessorKey: "dropoff_timestamp",
    header: "Fin",
  },
  {
    accessorKey: "total_amount",
    header: "Total",
  },
];
