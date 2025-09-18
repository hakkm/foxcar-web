import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import type { TechnicalInspectionItem } from '../technical-inspection.type';
import { ActionMenuTechnicalInspection } from './action-menu';

function formatDate(val?: string){ if(!val) return ''; try { return new Date(val).toISOString().slice(0,10);} catch { return val || ''; } }

export const technicalInspectionColumns: ColumnDef<TechnicalInspectionItem>[] = [
  { accessorKey:'id', header: ({column})=> <DataTableColumnHeader column={column} title='ID' />, cell: ({row})=> row.original.id, enableSorting:true, enableHiding:false, size:60 },
  { accessorKey:'vehicle_id', header: ({column})=> <DataTableColumnHeader column={column} title='Véhicule' />, cell: ({row})=> row.original.vehicle_id },
  { accessorKey:'inspection_center', header: ({column})=> <DataTableColumnHeader column={column} title='Centre' /> },
  { accessorKey:'last_inspection_date', header: ({column})=> <DataTableColumnHeader column={column} title='Dernière' />, cell: ({row})=> formatDate(row.original.last_inspection_date) },
  { accessorKey:'next_inspection_date', header: ({column})=> <DataTableColumnHeader column={column} title='Prochaine' />, cell: ({row})=> formatDate(row.original.next_inspection_date) },
  { accessorKey:'total_amount', header: ({column})=> <DataTableColumnHeader column={column} title='Montant' />, cell: ({row})=> `${row.original.total_amount} €` },
  { id:'actions', header:'Actions', cell: ({row})=> <ActionMenuTechnicalInspection item={row.original} /> }
];
