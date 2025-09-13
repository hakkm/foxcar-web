import { MoreHorizontal, TrashIcon, Loader2, PencilIcon, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import type { InvoiceItem } from "../invoice.type";
import { invoiceStatuses, paymentMethods } from "../invoice.type";
import { deleteInvoice, updateInvoice } from "../invoices.service";

function formatDateYYYYMMDD(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
function parseYYYYMMDD(s?: string): Date | undefined {
  if (!s) return undefined;
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return undefined;
  const [, yyyy, mm, dd] = m;
  const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  return isNaN(d.getTime()) ? undefined : d;
}

export default function ActionMenu<TItem>({ item }: { item: TItem & { id?: number | undefined } & Record<string, any> }) {
  if (item.id == null) return null;

  const [openDeleteId, setOpenDeleteId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const closeEdit = () => {
    setEditing(null);
    setSaving(false);
    setSaveError(null);
  };

  async function saveEditing() {
    if (!editing?.id) return;
    try {
      setSaving(true);
      setSaveError(null);
      const payload = {
        invoice_number: String(editing.invoice_number ?? ""),
        client_id: Number(editing.client_id ?? 0),
        booking_id: Number(editing.booking_id ?? 0),
        invoice_date: String(editing.invoice_date ?? ""),
        due_date: String(editing.due_date ?? ""),
        subtotal: Number(editing.subtotal ?? 0),
        tax_amount: Number(editing.tax_amount ?? 0),
        total_amount: Number(editing.total_amount ?? 0),
        status: editing.status,
        payment_date: editing.payment_date || null,
        payment_method: editing.payment_method || null,
        notes: editing.notes ?? null,
      } as Partial<InvoiceItem>;
      await updateInvoice(editing.id, payload);
      closeEdit();
      window.location.reload();
    } catch (e: any) {
      setSaveError(e?.message || "Échec de l'enregistrement. Réessayez.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Ouvrir le menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditing(item)}>
            <div className="flex items-center gap-2">
              <PencilIcon className="w-4 h-4" /> Modifier
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={() => setTimeout(() => setOpenDeleteId(item.id!), 50)}>
            <div className="flex items-center gap-2">
              <TrashIcon className="w-4 h-4 text-red-600" /> Supprimer
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={openDeleteId === item.id} onOpenChange={(isOpen) => setOpenDeleteId(isOpen ? item.id! : null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer la facture</AlertDialogTitle>
            <AlertDialogDescription>Action irréversible. Confirmez la suppression.</AlertDialogDescription>
            {deleteError && <p className="mt-2 text-sm text-red-600">{deleteError}</p>}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="secondary" disabled={deletingId === item.id} onClick={() => setOpenDeleteId(null)}>
                Annuler
              </Button>
            </AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={deletingId === item.id}
              onClick={async () => {
                try {
                  setDeleteError(null);
                  setDeletingId(item.id!);
                  await deleteInvoice(item.id!);
                  setOpenDeleteId(null);
                  window.location.reload();
                } catch (e: any) {
                  setDeleteError(e?.message || "Échec de la suppression. Réessayez.");
                } finally {
                  setDeletingId(null);
                }
              }}
            >
              {deletingId === item.id ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Suppression…
                </>
              ) : (
                "Supprimer"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={!!editing} onOpenChange={(open) => { if (!open) closeEdit(); }}>
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle>Modifier facture</DialogTitle>
            <DialogDescription>Mettez à jour les informations et enregistrez.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex flex-col text-sm">
                <span className="mb-1">Numéro</span>
                <Input value={editing?.invoice_number ?? ""} onChange={(e) => setEditing((s: any) => s ? { ...s, invoice_number: e.target.value } : s)} />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Client ID</span>
                <Input type="number" value={editing?.client_id ?? ""} onChange={(e) => setEditing((s: any) => s ? { ...s, client_id: Number(e.target.value) } : s)} />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Réservation ID</span>
                <Input type="number" value={editing?.booking_id ?? ""} onChange={(e) => setEditing((s: any) => s ? { ...s, booking_id: Number(e.target.value) } : s)} />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Date facture</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("justify-start text-left font-normal", !editing?.invoice_date && "text-muted-foreground")}> {editing?.invoice_date || <span>Choisir</span>} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" captionLayout="dropdown" selected={parseYYYYMMDD(editing?.invoice_date)} onSelect={(d) => d && setEditing((s: any) => s ? { ...s, invoice_date: formatDateYYYYMMDD(d) } : s)} />
                  </PopoverContent>
                </Popover>
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Date échéance</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("justify-start text-left font-normal", !editing?.due_date && "text-muted-foreground")}> {editing?.due_date || <span>Choisir</span>} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" captionLayout="dropdown" selected={parseYYYYMMDD(editing?.due_date)} onSelect={(d) => d && setEditing((s: any) => s ? { ...s, due_date: formatDateYYYYMMDD(d) } : s)} />
                  </PopoverContent>
                </Popover>
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Sous-total</span>
                <Input type="number" step="0.01" value={editing?.subtotal ?? ""} onChange={(e) => setEditing((s: any) => s ? { ...s, subtotal: Number(e.target.value) } : s)} />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Taxe</span>
                <Input type="number" step="0.01" value={editing?.tax_amount ?? ""} onChange={(e) => setEditing((s: any) => s ? { ...s, tax_amount: Number(e.target.value) } : s)} />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Total</span>
                <Input type="number" step="0.01" value={editing?.total_amount ?? ""} onChange={(e) => setEditing((s: any) => s ? { ...s, total_amount: Number(e.target.value) } : s)} />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Statut</span>
                <Select value={editing?.status ?? undefined} onValueChange={(v) => setEditing((s: any) => s ? { ...s, status: v } : s)}>
                  <SelectTrigger><SelectValue placeholder="Statut" /></SelectTrigger>
                  <SelectContent>
                    {invoiceStatuses.map(st => <SelectItem key={st} value={st}>{st}</SelectItem>)}
                  </SelectContent>
                </Select>
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Date paiement</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("justify-start text-left font-normal", !editing?.payment_date && "text-muted-foreground")}> {editing?.payment_date || <span>—</span>} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" captionLayout="dropdown" selected={parseYYYYMMDD(editing?.payment_date)} onSelect={(d) => setEditing((s: any) => s ? { ...s, payment_date: d ? formatDateYYYYMMDD(d) : null } : s)} />
                  </PopoverContent>
                </Popover>
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Méthode paiement</span>
                <Select value={editing?.payment_method ?? undefined} onValueChange={(v) => setEditing((s: any) => s ? { ...s, payment_method: v } : s)}>
                  <SelectTrigger><SelectValue placeholder="Méthode" /></SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </label>
              <label className="flex flex-col text-sm sm:col-span-3">
                <span className="mb-1">Notes</span>
                <Textarea value={editing?.notes ?? ""} onChange={(e) => setEditing((s: any) => s ? { ...s, notes: e.target.value } : s)} />
              </label>
            </div>
            {saveError && <p className="text-sm text-red-600">{saveError}</p>}
          </div>

          <DialogFooter className="gap-2">
            <Button onClick={saveEditing} disabled={!editing || saving}>{saving ? "Enregistrement…" : "Enregistrer"}</Button>
            <Button onClick={closeEdit} variant="secondary">Annuler</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
