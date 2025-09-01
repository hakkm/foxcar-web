import useSWR from "swr";
import type { ProductCollection } from "./product.type";

export function useProducts(search: string, keepPreviousData: boolean) {
  const { data, isLoading } = useSWR<ProductCollection>(
    `https://dummyjson.com/products/search?q=${search}`,
    {
      keepPreviousData,
    }
  );

  return { data, isLoading };
}

export async function addProduct(payload: {
  title: string;
  description?: string;
  price?: number;
  thumbnail?: string;
  [k: string]: unknown;
}) {
  const res = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return res.json();
}

export async function deleteProduct(id: number) {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
  });

  return res.json();
}
