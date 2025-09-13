import { z } from "zod";

export const invoiceStatuses = ["draft","sent","paid","overdue","cancelled"] as const;
export const paymentMethods = ["credit_card","cash","bank_transfer","other"] as const;

export const invoiceItemSchema = z.object({
  id: z.number().optional(),
  invoice_number: z.string().min(1),
  client_id: z.number().int().positive(),
  booking_id: z.number().int().positive(),
  invoice_date: z.string().min(1), // YYYY-MM-DD
  due_date: z.string().min(1),
  subtotal: z.number().nonnegative(),
  tax_amount: z.number().nonnegative(),
  total_amount: z.number().nonnegative(),
  status: z.enum(invoiceStatuses),
  payment_date: z.string().nullable().optional(),
  payment_method: z.enum(paymentMethods).nullable().optional(),
  notes: z.string().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type InvoiceItem = z.infer<typeof invoiceItemSchema>;

export const invoiceFormSchema = z.object({
  invoice_number: z.string().min(1, "Numéro requis"),
  client_id: z.coerce.number().int().positive(),
  booking_id: z.coerce.number().int().positive(),
  invoice_date: z.string().min(1),
  due_date: z.string().min(1),
  subtotal: z.coerce.number().nonnegative(),
  tax_amount: z.coerce.number().nonnegative(),
  total_amount: z.coerce.number().nonnegative(),
  status: z.enum(invoiceStatuses),
  payment_date: z.string().optional().nullable(),
  payment_method: z.enum(paymentMethods).optional().nullable(),
  notes: z.string().optional().nullable(),
});
export type InvoiceForm = z.infer<typeof invoiceFormSchema>;
