import type { Product as ProductCollection } from "@/features/products/product.type";
import useSWR from "swr";

export function useProducts(search: string, keepPreviousData: boolean) {
  const { data, isLoading } = useSWR<ProductCollection>(
    `https://dummyjson.com/products/search?q=${search}`,
    {
      keepPreviousData,
    }
  );

  return { data, isLoading };
}
