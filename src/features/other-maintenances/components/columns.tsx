import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import type { OtherMaintenanceItem } from '../other-maintenance.type';
import { ActionMenuOtherMaintenance } from './action-menu';

function formatDate(val?: string){ if(!val) return ''; try { return new Date(val).toISOString().slice(0,10);} catch { return val || ''; } }

export const otherMaintenanceColumns: ColumnDef<OtherMaintenanceItem>[] = [
  { accessorKey:'id', header: ({column})=> <DataTableColumnHeader column={column} title='ID' />, cell: ({row})=> row.original.id, enableSorting:true, enableHiding:false, size:60 },
  { accessorKey:'vehicle_id', header: ({column})=> <DataTableColumnHeader column={column} title='Véhicule' />, cell: ({row})=> row.original.vehicle_id },
  { accessorKey:'service_center', header: ({column})=> <DataTableColumnHeader column={column} title='Centre' /> },
  { accessorKey:'maintenance_type', header: ({column})=> <DataTableColumnHeader column={column} title='Type' /> },
  { accessorKey:'maintenance_date', header: ({column})=> <DataTableColumnHeader column={column} title='Date' />, cell: ({row})=> formatDate(row.original.maintenance_date) },
  { accessorKey:'current_mileage', header: ({column})=> <DataTableColumnHeader column={column} title='Km' /> },
  { accessorKey:'total_amount', header: ({column})=> <DataTableColumnHeader column={column} title='Montant' />, cell: ({row})=> `${row.original.total_amount} €` },
  { id:'actions', header:'Actions', cell: ({row})=> <ActionMenuOtherMaintenance item={row.original} /> }
];
