import { MoreHorizontal, TrashIcon, Loader2, PencilIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ContractItem } from "../contract.type";
import { deleteContract, updateContract } from "../contracts.service";

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
        contract_number: String(editing.contract_number ?? ""),
        booking_id: Number(editing.booking_id ?? 0),
        notes: editing.notes ?? null,
      } as Partial<ContractItem>;
      await updateContract(editing.id, payload);
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
            <AlertDialogTitle>Supprimer le contrat</AlertDialogTitle>
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
                  await deleteContract(item.id!);
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
        <DialogContent className="max-w-lg w-full">
          <DialogHeader>
            <DialogTitle>Modifier contrat</DialogTitle>
            <DialogDescription>Mettez à jour les informations et enregistrez.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex flex-col text-sm">
                <span className="mb-1">Numéro</span>
                <Input value={editing?.contract_number ?? ""} onChange={(e) => setEditing((s: any) => s ? { ...s, contract_number: e.target.value } : s)} />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">ID Réservation</span>
                <Input type="number" value={editing?.booking_id ?? ""} onChange={(e) => setEditing((s: any) => s ? { ...s, booking_id: Number(e.target.value) } : s)} />
              </label>
              <label className="flex flex-col text-sm sm:col-span-2">
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
