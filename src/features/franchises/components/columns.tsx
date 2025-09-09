import type { ColumnDef } from "@tanstack/react-table";
import type { FranchiseItem } from "../franchise.type";

export const columns: ColumnDef<FranchiseItem>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "franchise_start_date", header: "Start" },
  { accessorKey: "franchise_end_date", header: "End" },
];
