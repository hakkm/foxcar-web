import type { ColumnDef } from "@tanstack/react-table";
import type { PartnerItem } from "../partner.type";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { ActionMenu } from "./action-menu";

export const columns: ColumnDef<PartnerItem>[] = [
  {
    accessorKey: "company_name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Société" />,
    cell: ({ row }) => <span className="font-medium">{row.original.company_name}</span>,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <span className="truncate inline-block max-w-[220px]">{row.original.email}</span>,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Téléphone" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Statut" />,
    cell: ({ row }) => {
      const status = row.original.status as string | undefined;
      const map: Record<string, { label: string; classes: string }> = {
        active: { label: "Actif", classes: "bg-green-100 text-green-800" },
        inactive: { label: "Inactif", classes: "bg-gray-200 text-gray-800" },
        suspended: { label: "Suspendu", classes: "bg-yellow-100 text-yellow-800" },
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
    id: "actions",
    cell: (ctx) => <ActionMenu row={ctx.row as any} />,
  },
];
