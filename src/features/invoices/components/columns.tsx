import type { ColumnDef } from "@tanstack/react-table";
import type { InvoiceItem } from "../invoice.type";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import ActionMenu from "./action-menu";

export const columns: ColumnDef<InvoiceItem>[] = [
  {
    accessorKey: "invoice_number",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Numéro" />,
    cell: ({ row }) => <span className="font-medium">{row.original.invoice_number}</span>,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "client_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Client" />,
  },
  {
    accessorKey: "booking_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Réservation" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Statut" />,
    cell: ({ row }) => {
      const status = row.original.status as string | undefined;
      const map: Record<string, { label: string; classes: string }> = {
        draft: { label: "Brouillon", classes: "bg-gray-100 text-gray-800" },
        sent: { label: "Envoyée", classes: "bg-blue-100 text-blue-800" },
        paid: { label: "Payée", classes: "bg-green-100 text-green-800" },
        overdue: { label: "En retard", classes: "bg-red-100 text-red-800" },
        cancelled: { label: "Annulée", classes: "bg-yellow-100 text-yellow-800" },
      };
      const info = status ? map[status] ?? { label: status, classes: "bg-gray-100 text-gray-800" } : { label: "N/A", classes: "bg-gray-100 text-gray-800" };
      return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium ${info.classes}`}>{info.label}</span>;
    },
  },
  {
    accessorKey: "total_amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ row }) => <span>{Number(row.original.total_amount).toFixed(2)} €</span>,
    sortingFn: (a, b) => Number(a.original.total_amount) - Number(b.original.total_amount),
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionMenu item={row.original} />,
  },
];
