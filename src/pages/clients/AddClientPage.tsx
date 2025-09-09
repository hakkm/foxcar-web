import { useNavigate } from "react-router-dom";
import AddClientForm from "@/features/clients/components/add-client-form";
import { toast } from "sonner";

export default function AddClientPage() {
  const navigate = useNavigate();

  function handleCreated() {
    toast.success("Client created");
    navigate("/clients");
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-lg font-semibold mb-4">Add Client</h1>
      <AddClientForm onCreated={handleCreated} />
    </div>
  );
}
