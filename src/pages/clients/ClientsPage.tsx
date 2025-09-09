import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/features/clients/components/columns";
import { useClients } from "@/features/clients/clients.service";
import { Input } from "@/components/ui/input";
import React from "react";
import { useDebounce } from "@/hooks/use-debounce";

export default function ClientsPage() {
  const [search, setSearch] = React.useState("");
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const debounced = useDebounce(search, 300);
  const { data, isLoading, pagination } = useClients(debounced, pageIndex, pageSize, true);
  const isTyping = search !== debounced;

  const handlePageChange = (newPage: number) => {
    setPageIndex(newPage);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageIndex(0); // Reset to first page
  };

  return (
    <div>
      <h1 className="mb-4 text-lg font-semibold">Clients</h1>

      <div className="mb-4 flex items-center justify-between">
        <div className="search-container flex-1  mr-8">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Clients..."
            autoFocus
            className="w-full"
          />
        </div>
        <div className="flex items-center py-4 gap-2">
          <Link to="/clients/create" className="inline-flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Plus />
              <span className="hidden lg:inline">Add Client</span>
            </Button>
          </Link>
        </div>
      </div>

      <DataTable
        data={data ?? []}
        columns={columns}
        isLoading={isLoading || isTyping}
        totalRows={pagination?.total || 0}
        currentPage={pageIndex}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
