import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import type { OilChangeItem } from "../oil-change.type";
import { ActionMenuOilChange } from "./action-menu";

function formatDate(val?: string) {
	if (!val) return "";
	try {
		return new Date(val).toISOString().slice(0, 10);
	} catch {
		return val || "";
	}
}

export const oilChangeColumns: ColumnDef<OilChangeItem>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="ID" />
		),
		cell: ({ row }) => row.original.id,
		enableSorting: true,
		enableHiding: false,
		size: 60,
	},
	{
		accessorKey: "vehicle_id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Véhicule" />
		),
		cell: ({ row }) => row.original.vehicle_id,
	},
	{
		accessorKey: "service_center",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Centre" />
		),
	},
	{
		accessorKey: "last_oil_change_date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date" />
		),
		cell: ({ row }) => formatDate(row.original.last_oil_change_date),
	},
	{
		accessorKey: "mileage_at_last_oil_change",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Km" />
		),
	},
	{
		accessorKey: "oil_type",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Huile" />
		),
	},
	{
		accessorKey: "total_amount",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Montant" />
		),
		cell: ({ row }) => `${row.original.total_amount} €`,
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => <ActionMenuOilChange oilChange={row.original} />,
		size: 80,
	},
];
