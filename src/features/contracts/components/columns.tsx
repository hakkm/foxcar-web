import type { ColumnDef } from "@tanstack/react-table";
import type { ContractItem } from "../contract.type";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import ActionMenu from "./action-menu";

export const columns: ColumnDef<ContractItem>[] = [
  {
    accessorKey: "contract_number",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Numéro" />,
    cell: ({ row }) => <span className="font-medium">{row.original.contract_number}</span>,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "booking_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Réservation" />,
  },
  {
    accessorKey: "notes",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Notes" />,
    cell: ({ row }) => <span className="truncate inline-block max-w-[240px]">{row.original.notes || "—"}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionMenu item={row.original} />,
  },
];
