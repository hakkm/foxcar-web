import type { ColumnDef } from "@tanstack/react-table";
import type { FranchiseItem } from "../franchise.type";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import ActionMenu from "./action-menu";

export const columns: ColumnDef<FranchiseItem>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Nom" />
		),
		cell: ({ row }) => (
			<span className="font-medium">{row.original.name}</span>
		),
		sortingFn: "alphanumeric",
	},
	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Statut" />
		),
		cell: ({ row }) => {
			const status = row.original.status as string | undefined;
			const map: Record<
				string,
				{ label: string; classes: string }
			> = {
				active: { label: "Actif", classes: "bg-green-100 text-green-800" },
				inactive: { label: "Inactif", classes: "bg-gray-200 text-gray-800" },
				suspended: {
					label: "Suspendu",
					classes: "bg-yellow-100 text-yellow-800",
				},
			};
			const info =
				status
					? map[status] ?? { label: status, classes: "bg-gray-100 text-gray-800" }
					: { label: "N/A", classes: "bg-gray-100 text-gray-800" };
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
		accessorKey: "franchise_start_date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Début" />
		),
	},
	{
		accessorKey: "franchise_end_date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Fin" />
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <ActionMenu item={row.original} />,
	},
];
