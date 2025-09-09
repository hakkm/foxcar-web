import AddFranchiseForm from "@/features/franchises/components/add-franchise-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function AddFranchisePage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="mb-4 text-lg font-semibold">Create Franchise</h1>
      <AddFranchiseForm
        onCreated={() => {
          toast.success("Franchise created");
          navigate("/franchises");
        }}
      />
    </div>
  );
}
