import { useNavigate } from "react-router-dom";
import type { ProductItem } from "@/features/products/product.type";
import { toast } from "sonner";
import { AddProductForm } from "@/features/products/components/add-product-form";

export default function AddProductPage() {
  const navigate = useNavigate();

  async function handleCreated(created: ProductItem) {
    // Do not update SWR cache or call mutate — caller requested no cache usage.

    const label = created.title ?? `#${created.id ?? "unknown"}`;
    toast.success(`Product created: ${label}`, {
      description: `The product ${label} has been successfully created.`,
    });
    navigate("/posts");
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-lg font-semibold mb-4">Add Product</h1>
      <AddProductForm onCreated={handleCreated} />
    </div>
  );
}
