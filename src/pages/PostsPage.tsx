import { Input } from "@/components/ui/input";
import { useProducts } from "@/features/products/products.service";
import React from "react";
import { DataTable } from "@/features/products/components/data-table";
import { columns } from "@/features/products/components/columns";

export default function PostsPage() {
  const [keepPreviousData, setKeepPreviousData] = React.useState(false);
  const [search, setSearch] = React.useState("Laptop");

  const { data, isLoading } = useProducts(search, keepPreviousData);

  return (
    <div>
      <h1 className="mb-4 text-lg font-semibold">Products</h1>

      <div className="search-container mb-4 flex items-center gap-3">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Products..."
          autoFocus
          className="max-w-sm"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={keepPreviousData}
            onChange={(e) => setKeepPreviousData(e.target.checked)}
          />
          Keep Previous Data
        </label>
      </div>

      <DataTable
        data={data?.products ?? []}
        columns={columns}
        isLoading={isLoading}
      />
    </div>
  );
}
