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
