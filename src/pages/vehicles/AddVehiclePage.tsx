import { useNavigate } from "react-router-dom";
import AddVehicleForm from "@/features/vehicles/components/add-vehicle-form";
import { toast } from "sonner";

export default function AddVehiclePage() {
  const navigate = useNavigate();

  function handleCreated() {
    toast.success("Vehicle created");
    navigate("/vehicles");
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-lg font-semibold mb-4">Add Vehicle</h1>
      <AddVehicleForm onCreated={handleCreated} />
    </div>
  );
}
