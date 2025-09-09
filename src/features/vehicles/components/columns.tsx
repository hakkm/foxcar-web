import type { ColumnDef } from "@tanstack/react-table";
import type { VehicleItem } from "../vehicle.type";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import ActionMenu from "./action-menu";

export const columns: ColumnDef<VehicleItem>[] = [
	{
		accessorKey: "registration_number",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Registration" />
		),
		cell: ({ row }) => {
			const item = row.original;
			return <div className="font-medium">{item.registration_number}</div>;
    },
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "brand",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Brand" />,
  },
  {
    accessorKey: "model",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Model" />,
  },
  {
    accessorKey: "year",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Year" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status as string | undefined;

      const map: Record<
        string,
        { label: string; classes: string }
      > = {
        available: { label: "Disponible", classes: "bg-green-100 text-green-800" },
        in_maintenance: { label: "En entretien", classes: "bg-yellow-100 text-yellow-800" },
        reserved: { label: "Réservé", classes: "bg-blue-100 text-blue-800" },
        in_accident: { label: "En accident", classes: "bg-red-100 text-red-800" },
      };

      const info = status ? map[status] ?? { label: status, classes: "bg-gray-100 text-gray-800" } : { label: "N/A", classes: "bg-gray-100 text-gray-800" };

      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium ${info.classes}`}
        >
          {info.label}
        </span>
      );
    },
  },
  {
    accessorKey: "rental_price_per_day",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price/Day" />,
    cell: ({ row }) => {
			const v = row.original.rental_price_per_day;
			return <span>{v}</span>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const item = row.original;
			return <ActionMenu item={item} />;
		},
	},
];
