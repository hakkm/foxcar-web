import AddPartnerForm from "@/features/partners/components/add-partner-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function AddPartnerPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="mb-4 text-lg font-semibold">Créer un partenaire</h1>
      <AddPartnerForm
        onCreated={() => {
          toast.success("Partenaire créé");
          navigate("/partners/list");
        }}
      />
    </div>
  );
}
