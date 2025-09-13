import { AddSubRentalVehicleForm } from "@/features/sub-rental-vehicles/components/add-sub-rental-vehicle-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AddSubRentalVehiclePage() {
  const navigate = useNavigate();
  function handleCreated() {
    toast.success("Véhicule sous-location créé");
    navigate("/partners/sub-rentals");
  }
  return (
    <div>
      <h1 className="mb-4 text-lg font-semibold">Ajouter un véhicule en sous-location</h1>
      <AddSubRentalVehicleForm onCreated={handleCreated} />
    </div>
  );
}
