import {
  MoreHorizontal,
  TrashIcon,
  Loader2,
  PencilIcon,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { franchiseStatuses } from "../franchise.type";
import { deleteFranchise, updateFranchise } from "../franchises.service";

function formatDateDDMMYYYY(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function parseDDMMYYYY(s?: string): Date | undefined {
  if (!s) return undefined;
  const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return undefined;
  const [_, dd, mm, yyyy] = m;
  const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  return isNaN(d.getTime()) ? undefined : d;
}

export default function ActionMenu<TItem>({
  item,
}: {
  item: TItem & { id?: number | undefined } & Record<string, any>;
}) {
  if (item.id == null) return null;
  const [openId, setOpenId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Edit state
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const closeEditModal = () => {
    setSaveError(null);
    setEditing(null);
    setSaving(false);
  };

  const saveEditing = async () => {
    if (!editing?.id) return;
    try {
      setSaveError(null);
      setSaving(true);
      const payload = {
        name: String(editing.name ?? ""),
        status: editing.status,
        franchise_start_date: String(editing.franchise_start_date ?? ""),
        franchise_end_date: String(editing.franchise_end_date ?? ""),
        description: editing.description ?? null,
      };
      await updateFranchise(editing.id, payload);
      closeEditModal();
      window.location.reload();
    } catch (e: any) {
      setSaveError(e?.message || "Échec de l'enregistrement. Réessayez.");
    } finally {
      setSaving(false);
    }
  };

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
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setTimeout(() => setOpenId(item.id!), 50)}
          >
            <div className="flex items-center gap-2">
              <TrashIcon className="w-4 h-4 text-red-600" /> Supprimer
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={openId === item.id}
        onOpenChange={(isOpen) => setOpenId(isOpen ? item.id! : null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer la franchise</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Confirmez la suppression.
            </AlertDialogDescription>
            {deleteError && (
              <p className="mt-2 text-sm text-red-600">{deleteError}</p>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button
                variant="secondary"
                disabled={deletingId === item.id}
                onClick={() => setOpenId(null)}
              >
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
                  await deleteFranchise(item.id!);
                  setOpenId(null);
                  window.location.reload();
                } catch (e: any) {
                  setDeleteError(
                    e?.message || "Échec de la suppression. Réessayez."
                  );
                } finally {
                  setDeletingId(null);
                }
              }}
            >
              {deletingId === item.id ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Suppression…
                </>
              ) : (
                "Supprimer"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={!!editing}
        onOpenChange={(open) => {
          if (!open) closeEditModal();
        }}
      >
        <DialogContent className="max-w-3xl w-full">
          <DialogHeader>
            <DialogTitle>Modifier la franchise</DialogTitle>
            <DialogDescription>Mettre à jour les informations et enregistrer.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex flex-col text-sm">
                <span className="mb-1">Nom</span>
                <Input
                  value={editing?.name ?? ""}
                  onChange={(e) =>
                    setEditing((s: any) => (s ? { ...s, name: e.target.value } : s))
                  }
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Statut</span>
                <Select
                  value={editing?.status ?? undefined}
                  onValueChange={(v) =>
                    setEditing((s: any) => (s ? { ...s, status: v } : s))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    {franchiseStatuses.map((st) => (
                      <SelectItem key={st} value={st}>
                        {st}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Date début</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !editing?.franchise_start_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {editing?.franchise_start_date ? (
                        editing.franchise_start_date
                      ) : (
                        <span>Choisir</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={parseDDMMYYYY(editing?.franchise_start_date)}
                      captionLayout="dropdown"
                      onSelect={(d) =>
                        d &&
                        setEditing((s: any) =>
                          s
                            ? {
                                ...s,
                                franchise_start_date: formatDateDDMMYYYY(d),
                              }
                            : s
                        )
                      }
                    />
                  </PopoverContent>
                </Popover>
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Date fin</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !editing?.franchise_end_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {editing?.franchise_end_date ? (
                        editing.franchise_end_date
                      ) : (
                        <span>Choisir</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={parseDDMMYYYY(editing?.franchise_end_date)}
                      captionLayout="dropdown"
                      onSelect={(d) =>
                        d &&
                        setEditing((s: any) =>
                          s
                            ? {
                                ...s,
                                franchise_end_date: formatDateDDMMYYYY(d),
                              }
                            : s
                        )
                      }
                    />
                  </PopoverContent>
                </Popover>
              </label>
              <label className="flex flex-col sm:col-span-2 text-sm">
                <span className="mb-1">Description</span>
                <Input
                  value={editing?.description ?? ""}
                  onChange={(e) =>
                    setEditing((s: any) =>
                      s ? { ...s, description: e.target.value } : s
                    )
                  }
                />
              </label>
            </div>
            {saveError && <p className="text-sm text-red-600">{saveError}</p>}
          </div>

          <DialogFooter className="gap-2">
            <Button onClick={saveEditing} disabled={!editing || saving}>
              {saving ? "Enregistrement…" : "Enregistrer"}
            </Button>
            <Button onClick={closeEditModal} variant="secondary">
              Annuler
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
