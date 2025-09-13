import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AddInvoiceForm } from "@/features/invoices/components/add-invoice-form";

export default function AddInvoicePage() {
  const navigate = useNavigate();
  function handleCreated() {
    toast.success("Facture créée");
    navigate("/documents/invoices");
  }
  return (
    <div className="max-w-3xl">
      <h1 className="text-lg font-semibold mb-4">Ajouter une facture</h1>
      <AddInvoiceForm onCreated={handleCreated} />
    </div>
  );
}
