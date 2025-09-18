import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import type { InsuranceItem } from '../insurance.type';
import { ActionMenuInsurance } from './action-menu';

function formatDate(val?: string){ if(!val) return ''; try { return new Date(val).toISOString().slice(0,10);} catch { return val || ''; } }

export const insuranceColumns: ColumnDef<InsuranceItem>[] = [
  { accessorKey:'id', header: ({column})=> <DataTableColumnHeader column={column} title='ID' />, cell: ({row})=> row.original.id, enableSorting:true, enableHiding:false, size:60 },
  { accessorKey:'vehicle_id', header: ({column})=> <DataTableColumnHeader column={column} title='Véhicule' />, cell: ({row})=> row.original.vehicle_id },
  { accessorKey:'insurance_type', header: ({column})=> <DataTableColumnHeader column={column} title='Type' /> },
  { accessorKey:'vehicle_usage', header: ({column})=> <DataTableColumnHeader column={column} title='Usage' /> },
  { accessorKey:'insurance_start_date', header: ({column})=> <DataTableColumnHeader column={column} title='Début' />, cell: ({row})=> formatDate(row.original.insurance_start_date) },
  { accessorKey:'insurance_end_date', header: ({column})=> <DataTableColumnHeader column={column} title='Fin' />, cell: ({row})=> formatDate(row.original.insurance_end_date) },
  { accessorKey:'total_amount', header: ({column})=> <DataTableColumnHeader column={column} title='Montant' />, cell: ({row})=> `${row.original.total_amount} €` },
  { id:'actions', header:'Actions', cell: ({row})=> <ActionMenuInsurance item={row.original} /> }
];
