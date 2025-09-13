import type { ColumnDef } from "@tanstack/react-table";
import type { SubRentalVehicleItem } from "../sub-rental-vehicle.type";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import ActionMenu from "./action-menu";

export const columns: ColumnDef<SubRentalVehicleItem>[] = [
  {
    accessorKey: "registration_number",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Immatriculation" />,
    cell: ({ row }) => <span className="font-semibold">{row.original.registration_number}</span>,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "brand",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Marque" />,
    cell: ({ row }) => <span className="uppercase tracking-wide">{row.original.brand}</span>,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "model",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Modèle" />,
    cell: ({ row }) => <span>{row.original.model}</span>,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Statut" />,
    cell: ({ row }) => {
      const status = row.original.status as string | undefined;
      const map: Record<string, { label: string; classes: string }> = {
        available: { label: "Disponible", classes: "bg-green-100 text-green-800" },
        in_maintenance: { label: "Maintenance", classes: "bg-yellow-100 text-yellow-800" },
        reserved: { label: "Réservé", classes: "bg-blue-100 text-blue-800" },
        in_accident: { label: "Accident", classes: "bg-red-100 text-red-800" },
      };
      const info = status ? map[status] ?? { label: status, classes: "bg-gray-100 text-gray-800" } : { label: "N/A", classes: "bg-gray-100 text-gray-800" };
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium ${info.classes}`}>
          {info.label}
        </span>
      );
    },
  },
  {
    accessorKey: "rental_price_per_day",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Prix/jour" />,
    cell: ({ row }) => <span>{Number(row.original.rental_price_per_day).toFixed(2)} €</span>,
    sortingFn: (a, b) => Number(a.original.rental_price_per_day) - Number(b.original.rental_price_per_day),
  },
  {
    accessorKey: "rental_price_per_day_from_partner",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Coût part." />,
    cell: ({ row }) => <span>{Number(row.original.rental_price_per_day_from_partner).toFixed(2)} €</span>,
    sortingFn: (a, b) => Number(a.original.rental_price_per_day_from_partner) - Number(b.original.rental_price_per_day_from_partner),
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionMenu item={row.original} />,
  },
];
