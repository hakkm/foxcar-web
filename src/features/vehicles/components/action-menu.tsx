import {
  MoreHorizontal,
  TrashIcon,
  Loader2,
  PencilIcon,
  Calendar as CalendarIcon,
} from "lucide-react";
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
import { deleteVehicle, updateVehicle } from "../vehicles.service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  fuelTypes,
  gearboxTypes,
  statuses,
  vehicleTypes,
} from "../vehicle.type";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
        registration_number: String(editing.registration_number ?? ""),
        brand: String(editing.brand ?? ""),
        model: String(editing.model ?? ""),
        year: Number(editing.year ?? 0),
        vehicle_release_date: String(editing.vehicle_release_date ?? ""),
        mileage: Number(editing.mileage ?? 0),
        number_of_seats: Number(editing.number_of_seats ?? 1),
        fuel_type: editing.fuel_type,
        status: editing.status,
        rental_price_per_day: Number(editing.rental_price_per_day ?? 0),
        gearbox_type: editing.gearbox_type,
        air_conditioning: Boolean(editing.air_conditioning),
        vehicle_type: editing.vehicle_type,
      };
      await updateVehicle(editing.id, payload);
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
          <DropdownMenuItem
            onClick={() => {
              setEditing(item);
            }}
          >
            <div className="flex items-center gap-2">
              <PencilIcon className="w-4 h-4" /> Edit
            </div>
          </DropdownMenuItem>
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
              Are you sure you want to delete this vehicle? This action cannot
              be undone.
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
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle>Edit Vehicle</DialogTitle>
            <DialogDescription>Modify the fields and save.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex flex-col text-sm">
                <span className="mb-1">Registration</span>
                <Input
                  value={editing?.registration_number ?? ""}
                  onChange={(e) =>
                    setEditing((s: any) =>
                      s ? { ...s, registration_number: e.target.value } : s
                    )
                  }
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Brand</span>
                <Input
                  value={editing?.brand ?? ""}
                  onChange={(e) =>
                    setEditing((s: any) =>
                      s ? { ...s, brand: e.target.value } : s
                    )
                  }
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Model</span>
                <Input
                  value={editing?.model ?? ""}
                  onChange={(e) =>
                    setEditing((s: any) =>
                      s ? { ...s, model: e.target.value } : s
                    )
                  }
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Year</span>
                <Input
                  type="number"
                  value={editing?.year ?? ""}
                  onChange={(e) =>
                    setEditing((s: any) =>
                      s ? { ...s, year: Number(e.target.value) } : s
                    )
                  }
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Release date</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !editing?.vehicle_release_date &&
                          "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {editing?.vehicle_release_date ? (
                        editing.vehicle_release_date
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={parseDDMMYYYY(editing?.vehicle_release_date)}
                      captionLayout="dropdown"
                      onSelect={(d) =>
                        d &&
                        setEditing((s: any) =>
                          s
                            ? {
                                ...s,
                                vehicle_release_date: formatDateDDMMYYYY(d),
                              }
                            : s
                        )
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Mileage</span>
                <Input
                  type="number"
                  value={editing?.mileage ?? ""}
                  onChange={(e) =>
                    setEditing((s: any) =>
                      s ? { ...s, mileage: Number(e.target.value) } : s
                    )
                  }
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Seats</span>
                <Input
                  type="number"
                  value={editing?.number_of_seats ?? ""}
                  onChange={(e) =>
                    setEditing((s: any) =>
                      s ? { ...s, number_of_seats: Number(e.target.value) } : s
                    )
                  }
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Fuel</span>
                <Select
                  value={editing?.fuel_type ?? undefined}
                  onValueChange={(v) =>
                    setEditing((s: any) => (s ? { ...s, fuel_type: v } : s))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Fuel" />
                  </SelectTrigger>
                  <SelectContent>
                    {fuelTypes.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Status</span>
                <Select
                  value={editing?.status ?? undefined}
                  onValueChange={(v) =>
                    setEditing((s: any) => (s ? { ...s, status: v } : s))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((st) => (
                      <SelectItem key={st} value={st}>
                        {st}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Price/Day</span>
                <Input
                  type="number"
                  value={editing?.rental_price_per_day ?? ""}
                  onChange={(e) =>
                    setEditing((s: any) =>
                      s
                        ? { ...s, rental_price_per_day: Number(e.target.value) }
                        : s
                    )
                  }
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Gearbox</span>
                <Select
                  value={editing?.gearbox_type ?? undefined}
                  onValueChange={(v) =>
                    setEditing((s: any) => (s ? { ...s, gearbox_type: v } : s))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Gearbox" />
                  </SelectTrigger>
                  <SelectContent>
                    {gearboxTypes.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <label className="flex items-center gap-3 text-sm">
                <span>AC</span>
                <Switch
                  checked={!!editing?.air_conditioning}
                  onCheckedChange={(v) =>
                    setEditing((s: any) =>
                      s ? { ...s, air_conditioning: v } : s
                    )
                  }
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1">Vehicle type</span>
                <Select
                  value={editing?.vehicle_type ?? undefined}
                  onValueChange={(v) =>
                    setEditing((s: any) => (s ? { ...s, vehicle_type: v } : s))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleTypes.map((vt) => (
                      <SelectItem key={vt} value={vt}>
                        {vt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
