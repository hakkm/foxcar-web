import AddPartnerForm from "@/features/partners/components/add-partner-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function AddPartnerPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="mb-4 text-lg font-semibold">Create Partner</h1>
      <AddPartnerForm
        onCreated={() => {
          toast.success("Partner created");
          navigate("/partners");
        }}
      />
    </div>
  );
}
