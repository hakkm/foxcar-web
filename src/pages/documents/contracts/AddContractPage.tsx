import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AddContractForm } from "@/features/contracts/components/add-contract-form";

export default function AddContractPage() {
  const navigate = useNavigate();
  function handleCreated() {
    toast.success("Contrat créé");
    navigate("/documents/contracts");
  }
  return (
    <div className="max-w-2xl">
      <h1 className="text-lg font-semibold mb-4">Ajouter un contrat</h1>
      <AddContractForm onCreated={handleCreated} />
    </div>
  );
}
