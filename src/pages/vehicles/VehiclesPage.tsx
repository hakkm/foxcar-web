import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/features/vehicles/components/columns";
import { useVehicles } from "@/features/vehicles/vehicles.service";
import { Input } from "@/components/ui/input";
import React from "react";

export default function VehiclesPage() {
  const [search, setSearch] = React.useState("");
  const { data, isLoading } = useVehicles(search, true);

  return (
    <div>
      <h1 className="mb-4 text-lg font-semibold">Vehicles</h1>

      <div className="mb-4 flex items-center justify-between">
        <div className="search-container flex-1  mr-8">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Vehicles..."
            autoFocus
            className="w-full"
          />
        </div>
        <div className="flex items-center py-4 gap-2">
          <Button variant="outline" size="sm">
            <Link to="/vehicles/create" className="inline-flex items-center gap-2">
              <Plus />
              <span className="hidden lg:inline">Add Vehicle</span>
            </Link>
          </Button>
        </div>
      </div>

      <DataTable data={data} columns={columns} isLoading={isLoading} />
    </div>
  );
}
