import type { ColumnDef } from "@tanstack/react-table";
import type { PartnerItem } from "../partner.type";

export const columns: ColumnDef<PartnerItem>[] = [
  { accessorKey: "company_name", header: "Company" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "status", header: "Status" },
];
