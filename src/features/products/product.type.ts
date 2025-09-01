import { z } from "zod";

export const productItemSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  price: z.number().optional(),
});

export type ProductItem = z.infer<typeof productItemSchema>;

export const productCollectionSchema = z.object({
  products: z.array(productItemSchema),
});

export type ProductCollection = z.infer<typeof productCollectionSchema>;

export const productFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  // Accept empty string from inputs and coerce to number where possible
  price: z.preprocess((val) => {
    if (val === undefined || val === "") return undefined;
    const n = Number(val);
    return Number.isNaN(n) ? val : n;
  }, z.number().min(0).optional()),
  thumbnail: z.string().url().optional(),
});

export type ProductForm = z.infer<typeof productFormSchema>;

