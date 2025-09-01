import { addProduct } from "@/features/products/products.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import type { ProductItem } from "@/features/products/product.type";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema } from "@/features/products/product.type";
import type { ProductForm } from "@/features/products/product.type";

export function AddProductForm({ onCreated }: { onCreated?: (p: ProductItem) => void }) {
  const form = useForm<ProductForm>({
    // cast resolver to any to avoid type incompatibilities between RHF and the zod resolver
    resolver: zodResolver(productFormSchema) as any,
    defaultValues: { title: "", description: "", price: undefined, thumbnail: "" },
  });

  async function onSubmit(values: ProductForm) {
    try {
      const created = (await addProduct(values)) as ProductItem;
      onCreated?.(created);
      form.reset();
      toast.success("Created product");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create product");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Product title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Product description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Product price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <Input placeholder="Image URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add product</Button>
      </form>
    </Form>
  );
}
