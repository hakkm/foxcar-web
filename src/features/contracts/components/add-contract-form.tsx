import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { contractFormSchema, type ContractForm } from "../contract.type";
import { createContract } from "../contracts.service";

export function AddContractForm({ onCreated }: { onCreated?: () => void }) {
  const form = useForm<ContractForm>({
    resolver: zodResolver(contractFormSchema) as any,
    defaultValues: {
      contract_number: "CON-2025-0001",
      booking_id: 1,
      notes: "",
    },
  });

  async function onSubmit(values: ContractForm) {
    try {
      await createContract(values as any);
      toast.success("Contrat créé");
      onCreated?.();
      form.reset();
    } catch (e: any) {
      toast.error(e?.message || "Erreur création");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="contract_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de contrat</FormLabel>
                <FormControl>
                  <Input placeholder="CON-2025-0001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="booking_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Réservation</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Notes..." {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Enregistrer</Button>
        </div>
      </form>
    </Form>
  );
}
