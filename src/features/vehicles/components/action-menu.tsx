import { MoreHorizontal, TrashIcon, Loader2 } from "lucide-react";
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
import { deleteVehicle } from "../vehicles.service";

export default function ActionMenu<TItem>({
  item,
}: {
  item: TItem & { id?: number | undefined };
}) {
  if (item.id == null) return null;
  const [openId, setOpenId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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
            <AlertDialogTitle>Delete vehicle</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this vehicle? This action cannot be undone.
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
                  await deleteVehicle(item.id!);
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
    </div>
  );
}
