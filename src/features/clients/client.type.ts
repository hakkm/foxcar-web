import { z } from "zod";

export const idDocumentTypes = [
  "passport",
  "residence_permit",
  "drivers_license",
  "identity_card",
] as const;

export const clientItemSchema = z.object({
  id: z.number().optional(),
  last_name: z.string().min(1),
  first_name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),
  date_of_birth: z.string().min(1), // DD/MM/YYYY
  id_document_type: z.enum(idDocumentTypes),
  id_document_number: z.string().min(1),
  id_issue_date: z.string().min(1), // DD/MM/YYYY
  id_expiry_date: z.string().min(1), // DD/MM/YYYY
  nationality: z.string().min(1),
  driver_license_number: z.string().min(1),
  driver_license_issue_date: z.string().min(1), // DD/MM/YYYY
});

export type ClientItem = z.infer<typeof clientItemSchema>;

export const clientFormSchema = z.object({
  last_name: z.string().min(1, "Required"),
  first_name: z.string().min(1, "Required"),
  phone: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  address: z.string().min(1, "Required"),
  date_of_birth: z.string().min(1, "Required"),
  id_document_type: z.enum(idDocumentTypes),
  id_document_number: z.string().min(1, "Required"),
  id_issue_date: z.string().min(1, "Required"),
  id_expiry_date: z.string().min(1, "Required"),
  nationality: z.string().min(1, "Required"),
  driver_license_number: z.string().min(1, "Required"),
  driver_license_issue_date: z.string().min(1, "Required"),
});

export type ClientForm = z.infer<typeof clientFormSchema>;
