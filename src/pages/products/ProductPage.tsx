import { Input } from "@/components/ui/input";
import { useProducts } from "@/features/products/products.service";
import React from "react";
import { columns } from "@/features/products/components/columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { DataTable } from "@/components/data-table/data-table";

export default function ProductsPage() {
  const [search, setSearch] = React.useState("Laptop");

  const { data, isLoading } = useProducts(search, true);

  return (
    <div>
      <h1 className="mb-4 text-lg font-semibold">Products</h1>

      <div className="mb-4 flex items-center justify-between">
        <div className="search-container flex-1  mr-8">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Products..."
            autoFocus
            className="w-full"
          />
        </div>

        <div className="flex items-center py-4 gap-2">
          <Button variant="outline" size="sm">
            <Link to="/posts/create" className="inline-flex items-center gap-2">
              <Plus />
              <span className="hidden lg:inline">Add Product</span>
            </Link>
          </Button>
        </div>
      </div>

      <DataTable
        data={data?.products ?? []}
        columns={columns}
        isLoading={isLoading}
      />
    </div>
  );
}
