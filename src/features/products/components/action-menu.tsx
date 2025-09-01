import { MoreHorizontal, PencilIcon, TrashIcon, Loader2 } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { deleteProduct } from "../products.service";

export default function ActionMenu<TItem>({
  item,
}: {
  item: TItem & { id?: number | undefined };
}) {
  if (item.id == null) return null;
  const [openId, setOpenId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<number | null>(null);

  // editing state for inline dialog
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const closeEditModal = () => {
    setSaveError(null);
    setEditing(null);
    setSaving(false);
  };

  const saveEditing = async () => {
    if (!editing) return;
    try {
      setSaveError(null);
      setSaving(true);
      window.dispatchEvent(
        new CustomEvent("content:save", { detail: editing })
      );
      closeEditModal();
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
          <DropdownMenuItem
            onClick={() => {
              setEditing(item);
            }}
          >
            <div className="flex items-center gap-2">
              <PencilIcon className="w-4 h-4" /> Edit
            </div>
          </DropdownMenuItem>

          {/* Delete: schedule opening the dialog after the menu closes */}
          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              setTimeout(() => setOpenId(item.id!), 50);
            }}
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
            <AlertDialogTitle>Delete post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this post? This action cannot be
              undone.
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
                  await deleteProduct(item.id!);
                  setOpenId(null);
                  window.location.reload();
                } catch (e: any) {
                  setDeleteError(
                    e?.message || "Failed to delete. Please try again."
                  );
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
        <DialogContent className="max-w-3xl w-full">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogDescription>Make changes and save.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex flex-col text-sm">
                <span className="mb-1">Date</span>
                <Input
                  type="date"
                  value={editing?.date ?? ""}
                  onChange={(e) =>
                    setEditing((s: any) =>
                      s
                        ? { ...s, date: (e.target as HTMLInputElement).value }
                        : s
                    )
                  }
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Time</span>
                <Input
                  type="time"
                  value={editing?.time ?? ""}
                  onChange={(e) =>
                    setEditing((s: any) =>
                      s
                        ? { ...s, time: (e.target as HTMLInputElement).value }
                        : s
                    )
                  }
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Platform</span>
                <Input
                  value={editing?.platform ?? ""}
                  onChange={(e) =>
                    setEditing((s: any) =>
                      s
                        ? {
                            ...s,
                            platform: (e.target as HTMLInputElement).value,
                          }
                        : s
                    )
                  }
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Day</span>
                <Input
                  value={(editing?.dayOfWeek as any) ?? ""}
                  onChange={(e) =>
                    setEditing((s: any) =>
                      s
                        ? {
                            ...s,
                            dayOfWeek: (e.target as HTMLInputElement).value,
                          }
                        : s
                    )
                  }
                />
              </label>
            </div>
            <label className="flex flex-col text-sm">
              <span className="mb-1">Content</span>
              <textarea
                className="rounded-md border px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full"
                rows={5}
                value={editing?.content ?? ""}
                onChange={(e) =>
                  setEditing((s: any) =>
                    s ? { ...s, content: e.target.value } : s
                  )
                }
              />
            </label>
            {saveError && <p className="text-sm text-red-600">{saveError}</p>}
          </div>

          <DialogFooter className="gap-2">
            <Button onClick={saveEditing} disabled={!editing || saving}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
            <Button onClick={closeEditModal} variant="secondary">
              Cancel
            </Button>
            {editing && (
              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-gray-500">Status:</span>
                <span className="text-sm font-medium">{editing.status}</span>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
