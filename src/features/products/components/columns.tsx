import type { ColumnDef } from "@tanstack/react-table";
import type { ProductItem } from "../product.type";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

export const columns: ColumnDef<ProductItem>[] = [
 {
    accessorKey: "thumbnail",
    id: "thumbnail",
    header: () => <span>Image</span>,
    cell: ({ row }) => {
      const item = row.original;
      return (
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-36 w-36 rounded object-cover"
        />
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const item = row.original;
      return <div className="font-medium text-gray-900 dark:text-gray-100">{item.title}</div>;
    },
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="text-sm text-gray-600 whitespace-normal break-words">
          {item.description || ""}
        </div>
      );
    },
    enableSorting: false,
  }
];
