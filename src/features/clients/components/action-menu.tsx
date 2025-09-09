import { MoreHorizontal, TrashIcon, Loader2, PencilIcon, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { deleteClient, updateClient } from "../clients.service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { idDocumentTypes } from "../client.type";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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
        last_name: String(editing.last_name ?? ""),
        first_name: String(editing.first_name ?? ""),
        phone: String(editing.phone ?? ""),
        email: String(editing.email ?? ""),
        address: String(editing.address ?? ""),
        date_of_birth: String(editing.date_of_birth ?? ""),
        id_document_type: editing.id_document_type,
        id_document_number: String(editing.id_document_number ?? ""),
        id_issue_date: String(editing.id_issue_date ?? ""),
        id_expiry_date: String(editing.id_expiry_date ?? ""),
        nationality: String(editing.nationality ?? ""),
        driver_license_number: String(editing.driver_license_number ?? ""),
        driver_license_issue_date: String(editing.driver_license_issue_date ?? ""),
      };
      await updateClient(editing.id, payload);
      closeEditModal();
      window.location.reload();
    } catch (e: any) {
      setSaveError(e?.message || "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditing(item)}>
            <div className="flex items-center gap-2">
              <PencilIcon className="w-4 h-4" /> Edit
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setTimeout(() => setOpenId(item.id!), 50)}
          >
            <div className="flex items-center gap-2">
              <TrashIcon className="w-4 h-4 text-red-600" /> Delete
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
            <AlertDialogTitle>Delete client</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this client? This action cannot be undone.
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
                Cancel
              </Button>
            </AlertDialogCancel>

            <Button
              variant="destructive"
              disabled={deletingId === item.id}
              onClick={async () => {
                try {
                  setDeleteError(null);
                  setDeletingId(item.id!);
                  await deleteClient(item.id!);
                  setOpenId(null);
                  window.location.reload();
                } catch (e: any) {
                  setDeleteError(e?.message || "Failed to delete. Please try again.");
                } finally {
                  setDeletingId(null);
                }
              }}
            >
              {deletingId === item.id ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting…
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Modal */}
      <Dialog
        open={!!editing}
        onOpenChange={(open) => {
          if (!open) closeEditModal();
        }}
      >
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
            <DialogDescription>Modify the fields and save.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex flex-col text-sm">
                <span className="mb-1">First name</span>
                <Input
                  value={editing?.first_name ?? ""}
                  onChange={(e) => setEditing((s: any) => (s ? { ...s, first_name: e.target.value } : s))}
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Last name</span>
                <Input
                  value={editing?.last_name ?? ""}
                  onChange={(e) => setEditing((s: any) => (s ? { ...s, last_name: e.target.value } : s))}
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Email</span>
                <Input
                  type="email"
                  value={editing?.email ?? ""}
                  onChange={(e) => setEditing((s: any) => (s ? { ...s, email: e.target.value } : s))}
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Phone</span>
                <Input
                  value={editing?.phone ?? ""}
                  onChange={(e) => setEditing((s: any) => (s ? { ...s, phone: e.target.value } : s))}
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Address</span>
                <Input
                  value={editing?.address ?? ""}
                  onChange={(e) => setEditing((s: any) => (s ? { ...s, address: e.target.value } : s))}
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Date of birth</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !editing?.date_of_birth && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {editing?.date_of_birth ? editing.date_of_birth : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      selected={parseDDMMYYYY(editing?.date_of_birth)}
                      onSelect={(d) =>
                        d &&
                        setEditing((s: any) =>
                          s ? { ...s, date_of_birth: formatDateDDMMYYYY(d) } : s
                        )
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">ID Document Type</span>
                <Select
                  value={editing?.id_document_type ?? undefined}
                  onValueChange={(v) => setEditing((s: any) => (s ? { ...s, id_document_type: v } : s))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {idDocumentTypes.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">ID Number</span>
                <Input
                  value={editing?.id_document_number ?? ""}
                  onChange={(e) =>
                    setEditing((s: any) => (s ? { ...s, id_document_number: e.target.value } : s))
                  }
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">ID Issue Date</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !editing?.id_issue_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {editing?.id_issue_date ? editing.id_issue_date : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      selected={parseDDMMYYYY(editing?.id_issue_date)}
                      onSelect={(d) =>
                        d &&
                        setEditing((s: any) =>
                          s ? { ...s, id_issue_date: formatDateDDMMYYYY(d) } : s
                        )
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">ID Expiry Date</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !editing?.id_expiry_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {editing?.id_expiry_date ? editing.id_expiry_date : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      selected={parseDDMMYYYY(editing?.id_expiry_date)}
                      onSelect={(d) =>
                        d &&
                        setEditing((s: any) =>
                          s ? { ...s, id_expiry_date: formatDateDDMMYYYY(d) } : s
                        )
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Nationality</span>
                <Input
                  value={editing?.nationality ?? ""}
                  onChange={(e) => setEditing((s: any) => (s ? { ...s, nationality: e.target.value } : s))}
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Driver License Number</span>
                <Input
                  value={editing?.driver_license_number ?? ""}
                  onChange={(e) =>
                    setEditing((s: any) => (s ? { ...s, driver_license_number: e.target.value } : s))
                  }
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Driver License Issue Date</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !editing?.driver_license_issue_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {editing?.driver_license_issue_date
                        ? editing.driver_license_issue_date
                        : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      selected={parseDDMMYYYY(editing?.driver_license_issue_date)}
                      onSelect={(d) =>
                        d &&
                        setEditing((s: any) =>
                          s
                            ? { ...s, driver_license_issue_date: formatDateDDMMYYYY(d) }
                            : s
                        )
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </label>
            </div>
            {saveError && <p className="text-sm text-red-600">{saveError}</p>}
          </div>

          <DialogFooter className="gap-2">
            <Button onClick={saveEditing} disabled={!editing || saving}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
            <Button onClick={closeEditModal} variant="secondary">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
