import type { ColumnDef } from "@tanstack/react-table";
import type { ClientItem } from "../client.type";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import ActionMenu from "./action-menu.tsx";

export const columns: ColumnDef<ClientItem>[] = [
	{
		accessorKey: "first_name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="First name" />
		),
	},
	{
		accessorKey: "last_name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Last name" />
		),
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
	},
	{
		accessorKey: "phone",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Phone" />
		),
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const item = row.original;
			return <ActionMenu item={item} />;
		},
	},
];
