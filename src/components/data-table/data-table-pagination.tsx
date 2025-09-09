import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export function DataTablePagination<TData>({
  table,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps<TData>) {
  const handlePageSizeChange = (value: string) => {
    const newSize = Number(value);
    if (onPageSizeChange) {
      onPageSizeChange(newSize);
    } else {
      table.setPageSize(newSize);
    }
  };

  const handleFirstPage = () => {
    if (onPageChange) {
      onPageChange(0);
    } else {
      table.setPageIndex(0);
    }
  };

  const handlePreviousPage = () => {
    if (onPageChange) {
      onPageChange(table.getState().pagination.pageIndex - 1);
    } else {
      table.previousPage();
    }
  };

  const handleNextPage = () => {
    if (onPageChange) {
      onPageChange(table.getState().pagination.pageIndex + 1);
    } else {
      table.nextPage();
    }
  };

  const handleLastPage = () => {
    if (onPageChange) {
      onPageChange(table.getPageCount() - 1);
    } else {
      table.setPageIndex(table.getPageCount() - 1);
    }
  };

  return (
    <div className="flex items-center justify-between px-1">
      <div className="text-muted-foreground flex-1 text-xs sm:text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="hidden sm:block text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="h-7 w-[65px] sm:h-8 sm:w-[90px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[80px] sm:w-[100px] items-center justify-center text-xs sm:text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden lg:flex lg:h-8 lg:w-8"
            onClick={handleFirstPage}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8"
            onClick={handlePreviousPage}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8"
            onClick={handleNextPage}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden lg:flex lg:h-8 lg:w-8"
            onClick={handleLastPage}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
