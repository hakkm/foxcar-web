import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import useSWR from "swr";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import type { VehicleItem } from "@/features/vehicles/vehicle.type";
import type { ClientItem } from "@/features/clients/client.type";
import { useClients } from "@/features/clients/clients.service";
import { useFranchises } from "@/features/franchises/franchises.service";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription } from "@/components/ui/dialog";
import AddClientForm from "@/features/clients/components/add-client-form";
import { PlusIcon, Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const steps = [
	{ id: 1, label: "Véhicule" },
	{ id: 2, label: "Client" },
	{ id: 3, label: "Réservation" },
	{ id: 4, label: "Conducteurs" },
	{ id: 5, label: "Contrat" },
] as const;

export function BookingWizard() {
	const [step, setStep] = React.useState(0);

	// Sélections
	const [selectedVehicle, setSelectedVehicle] = React.useState<VehicleItem | null>(null);
	const [selectedClient, setSelectedClient] = React.useState<ClientItem | null>(null);

	// Détails réservation (résumé)
	const [reservationSummary, setReservationSummary] = React.useState<{ pickup?: string; dropoff?: string; days?: number; total?: number }>({});

	// Validations par étape
	const isVehicleSelected = !!selectedVehicle;
	const isClientSelected = !!selectedClient;
	const [isReservationValid, setIsReservationValid] = React.useState(false);
	const [driversValid] = React.useState(true); // facultatif

	const guards = [
		() => isVehicleSelected,
		() => isClientSelected,
		() => isReservationValid,
		() => driversValid,
		() => true,
	];

	const canNext = guards[step]();
	const canPrev = step > 0;

	const progress = ((step + 1) / steps.length) * 100;

	const next = () => {
		if (!canNext) return;
		setStep((s) => Math.min(s + 1, steps.length - 1));
	};
	const prev = () => setStep((s) => Math.max(s - 1, 0));

	return (
		<div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
			<div>
				<div className="mb-4 space-y-2">
					<div className="flex items-center justify-between">
						<h2 className="text-base font-medium">Assistant de réservation</h2>
						<span className="text-sm text-muted-foreground">
							Étape {step + 1} / {steps.length}
						</span>
					</div>
					<Progress value={progress} />
					<div className="flex items-center gap-3 pt-1">
						{steps.map((st, i) => (
							<div key={st.id} className="flex items-center gap-2">
								<div
									className={
										"size-6 rounded-full text-xs grid place-items-center " +
										(i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")
									}
								>
									{i + 1}
								</div>
								<div className={"text-xs " + (i === step ? "font-semibold" : "text-muted-foreground")}>{st.label}</div>
								{i < steps.length - 1 && <div className="w-6 h-px bg-border" />}
							</div>
						))}
					</div>
				</div>

				<Card>
					<CardContent className="pt-4">
						{step === 0 && (
							<StepVehicle onSelect={(v) => setSelectedVehicle(v)} />
						)}
						{step === 1 && (
							<StepClient
								onSelect={(c) => setSelectedClient(c)}
								onProceed={() => setStep((s) => Math.min(s + 1, steps.length - 1))}
							/>
						)}
						{step === 2 && (
							<StepReservation
								vehicle={selectedVehicle!}
								onValidChange={setIsReservationValid}
								onSummaryChange={setReservationSummary}
							/>
						)}
						{step === 3 && <StepDrivers />}
						{step === 4 && <StepContract />}

						<div className="mt-6 flex justify-between">
							<Button variant="outline" onClick={prev} disabled={!canPrev}>
								Précédent
							</Button>
							<Button onClick={next} disabled={!canNext}>
								{step === steps.length - 1 ? "Terminer" : "Suivant"}
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>

			<aside className="space-y-3">
				<Card>
					<CardContent className="pt-4 text-sm">
						<div className="font-medium mb-2">Résumé</div>
						<ul className="space-y-1 text-muted-foreground">
							<li>
								Véhicule: {selectedVehicle ? (
									<span>
										{selectedVehicle.registration_number} · {selectedVehicle.brand} {selectedVehicle.model}
									</span>
								) : (
									"—"
								)}
							</li>
							<li>
								Client: {selectedClient ? (
									<span>
										{selectedClient.first_name} {selectedClient.last_name}
									</span>
								) : (
									"—"
								)}
							</li>
							<li>
								Dates: {reservationSummary.pickup && reservationSummary.dropoff ? (
									<span>{reservationSummary.pickup} → {reservationSummary.dropoff} ({reservationSummary.days} j)</span>
								) : (
									"—"
								)}
							</li>
							<li>
								Total: {reservationSummary.total != null ? reservationSummary.total : "—"}
							</li>
						</ul>
					</CardContent>
				</Card>
			</aside>
		</div>
	);
}

function StepVehicle({ onSelect }: { onSelect: (v: VehicleItem) => void }) {
	const [search, setSearch] = React.useState("");
	const [pageIndex, setPageIndex] = React.useState(0);
	const [pageSize, setPageSize] = React.useState(10);
	const debounced = useDebounce(search, 300);

	const term = (debounced ?? "").trim();
	// const shouldFetch = term.length >= 2 || term.length === 0;
	const shouldFetch = true;
	const { data, isLoading, error } = useSWR<{ data: VehicleItem[]; pagination: any }>(
		shouldFetch
			? `/api/vehicles?status=available&search=${encodeURIComponent(term)}&page=${pageIndex + 1}&per_page=${pageSize}`
			: null,
		{ keepPreviousData: true, revalidateOnFocus: false, revalidateOnReconnect: false, dedupingInterval: 700 }
	);

	const vehicles = (data?.data ?? []).filter((v) => v.status === "available");
	const total = data?.pagination?.total ?? 0;
	const isTyping = search !== debounced;

	const columns = React.useMemo<ColumnDef<VehicleItem>[]>(
		() => [
			{
				id: "select",
				enableSorting: false,
				enableHiding: false,
				size: 36,
				header: () => null,
				cell: ({ row, table }) => (
					<div className="flex items-center justify-center">
						<Checkbox
							checked={row.getIsSelected()}
							onCheckedChange={(v) => {
								table.resetRowSelection();
								row.toggleSelected(!!v);
								if (v) onSelect(row.original);
							}}
							aria-label="Sélectionner le véhicule"
						/>
					</div>
				),
			},
			{
				accessorKey: "registration_number",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Immatriculation" />
				),
				cell: ({ row }) => row.original.registration_number,
			},
			{
				id: "modele",
				accessorFn: (row) => `${row.brand} ${row.model}`,
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Modèle" />
				),
				cell: ({ row }) => (
					<span>
						{row.original.brand} {row.original.model}
					</span>
				),
			},
			{
				accessorKey: "gearbox_type",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Boîte" />
				),
			},
			{
				accessorKey: "rental_price_per_day",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Prix/jour" />
				),
				cell: ({ row }) => <span>{row.original.rental_price_per_day}</span>,
			},
		],
		[onSelect]
	);

	return (
		<div className="space-y-4">
			<div className="text-sm text-muted-foreground">
				Étape 1: choisissez un véhicule disponible dans votre flotte ou passez par la sous‑location.
			</div>

			<div className="flex items-center gap-2">
				<Input
					placeholder="Rechercher un véhicule..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="max-w-md"
				/>
				<div className="flex-1" />
				<Button variant="outline">Sous‑location (partenaires)</Button>
			</div>

			{error ? (
				<div className="p-3 text-sm text-destructive">Erreur de chargement</div>
			) : (
				<DataTable
					columns={columns}
					data={vehicles}
					isLoading={isLoading || isTyping}
					totalRows={total}
					currentPage={pageIndex}
					pageSize={pageSize}
					onPageChange={(idx) => setPageIndex(idx)}
					onPageSizeChange={(size) => setPageSize(size)}
					onSelectionChange={(rows) => {
						const first = (rows as VehicleItem[])[0];
						if (first) onSelect(first);
					}}
				/>
			)}
		</div>
	);
}

function StepClient({ onSelect, onProceed }: { onSelect: (c: ClientItem) => void; onProceed: () => void }) {
	const [search, setSearch] = React.useState("");
	const [pageIndex, setPageIndex] = React.useState(0);
	const [pageSize, setPageSize] = React.useState(10);
	const [open, setOpen] = React.useState(false);
	const debounced = useDebounce(search, 300);
	const { data, isLoading, pagination } = useClients(debounced, pageIndex, pageSize, true);
	const isTyping = search !== debounced;
	const clients = data ?? [];

	const columns = React.useMemo<ColumnDef<ClientItem>[]>(
		() => [
			{
				id: "select",
				enableSorting: false,
				enableHiding: false,
				size: 36,
				header: () => null,
				cell: ({ row, table }) => (
					<div className="flex items-center justify-center">
						<Checkbox
							checked={row.getIsSelected()}
							onCheckedChange={(v) => {
								table.resetRowSelection();
								row.toggleSelected(!!v);
								if (v) onSelect(row.original);
							}}
							aria-label="Sélectionner le client"
						/>
					</div>
				),
			},
			{
				id: "nom",
				accessorFn: (row) => `${row.first_name} ${row.last_name}`,
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Nom" />
				),
				cell: ({ row }) => (
					<span>
						{row.original.first_name} {row.original.last_name}
					</span>
				),
			},
			{
				accessorKey: "phone",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Téléphone" />
				),
			},
			{
				accessorKey: "email",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Email" />
				),
				cell: ({ row }) => <span className="truncate inline-block max-w-[240px]">{row.original.email}</span>,
			},
		],
		[onSelect]
	);

	return (
		<div className="space-y-4">
			<div className="text-sm text-muted-foreground">Étape 2: sélectionnez un client existant ou créez‑en un nouveau.</div>
			<div className="flex items-center gap-2">
				<Input
					placeholder="Rechercher un client..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="max-w-md"
				/>
				<div className="flex-1" />
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button variant="outline"><PlusIcon /> Nouveau client</Button>
					</DialogTrigger>
					<DialogContent className="max-w-3xl">
						<DialogHeader>
							<DialogTitle>Nouveau client</DialogTitle>
							<DialogDescription>
                Remplissez les informations du client puis validez pour continuer.
              </DialogDescription>
						</DialogHeader>
						<AddClientForm
							onCreated={(client) => {
								onSelect(client);
								setOpen(false);
								onProceed();
							}}
						/>
					</DialogContent>
				</Dialog>
			</div>

			<DataTable
				columns={columns}
				data={clients}
				isLoading={isLoading || isTyping}
				totalRows={pagination?.total ?? clients.length}
				currentPage={pageIndex}
				pageSize={pageSize}
				onPageChange={(idx) => setPageIndex(idx)}
				onPageSizeChange={(size) => setPageSize(size)}
				onSelectionChange={(rows) => {
					const first = (rows as ClientItem[])[0];
					if (first) onSelect(first);
				}}
			/>
		</div>
	);
}

function StepReservation({ vehicle, onValidChange, onSummaryChange }: { vehicle: VehicleItem; onValidChange: (v: boolean) => void; onSummaryChange: (s: { pickup?: string; dropoff?: string; days?: number; total?: number }) => void; }) {
	const [pickupLocation, setPickupLocation] = React.useState("RAK");
	const [dropoffLocation, setDropoffLocation] = React.useState("RAK");
	const [pickupDate, setPickupDate] = React.useState<Date | undefined>(undefined);
	const [dropoffDate, setDropoffDate] = React.useState<Date | undefined>(undefined);
	const [franchiseId, setFranchiseId] = React.useState<number | undefined>(undefined);
	const [additional, setAdditional] = React.useState<number>(0);

	const { data: franchisesData } = useFranchises("", 0, 50, true);
	const franchises = franchisesData ?? [];

	function computeDays(d1?: Date, d2?: Date) {
		if (!d1 || !d2) return undefined;
		if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return undefined;
		const diff = d2.getTime() - d1.getTime();
		if (diff <= 0) return undefined;
		return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
	}

	function formatDateDDMMYYYY(d?: Date) {
		if (!d) return "";
		const dd = String(d.getDate()).padStart(2, "0");
		const mm = String(d.getMonth() + 1).padStart(2, "0");
		const yyyy = d.getFullYear();
		return `${dd}/${mm}/${yyyy}`;
	}

	const days = computeDays(pickupDate, dropoffDate);
	const daily = Number(vehicle.rental_price_per_day) || 0;
	const total = days ? days * daily + (Number(additional) || 0) : undefined;

	React.useEffect(() => {
		const valid = !!pickupDate && !!dropoffDate && !!franchiseId && !!days;
		onValidChange(valid);
		onSummaryChange({ pickup: formatDateDDMMYYYY(pickupDate), dropoff: formatDateDDMMYYYY(dropoffDate), days, total });
	}, [pickupDate, dropoffDate, franchiseId, days, total, onValidChange, onSummaryChange]);

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<label className="text-sm font-medium">Lieu de prise en charge</label>
					<Input value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} />
				</div>
				<div className="space-y-2">
					<label className="text-sm font-medium">Lieu de restitution</label>
					<Input value={dropoffLocation} onChange={(e) => setDropoffLocation(e.target.value)} />
				</div>
				<div className="space-y-2">
					<label className="text-sm font-medium">Départ</label>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className={cn(
									"w-full justify-start text-left font-normal",
									!pickupDate && "text-muted-foreground"
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{pickupDate ? formatDateDDMMYYYY(pickupDate) : <span>Sélectionner une date</span>}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								captionLayout="dropdown"
								selected={pickupDate}
								onSelect={(d) => d && setPickupDate(d)}
							/>
						</PopoverContent>
					</Popover>
				</div>
				<div className="space-y-2">
					<label className="text-sm font-medium">Retour</label>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className={cn(
									"w-full justify-start text-left font-normal",
									!dropoffDate && "text-muted-foreground"
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{dropoffDate ? formatDateDDMMYYYY(dropoffDate) : <span>Sélectionner une date</span>}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								captionLayout="dropdown"
								selected={dropoffDate}
								onSelect={(d) => d && setDropoffDate(d)}
							/>
						</PopoverContent>
					</Popover>
				</div>
				<div className="space-y-2">
					<label className="text-sm font-medium">Franchise</label>
					<Select onValueChange={(v) => setFranchiseId(Number(v))}>
						<SelectTrigger>
							<SelectValue placeholder="Sélectionner" />
						</SelectTrigger>
						<SelectContent>
							{franchises.map((f: any) => (
								<SelectItem key={f.id} value={String(f.id)}>{f.name}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="space-y-2">
					<label className="text-sm font-medium">Montant additionnel</label>
					<Input type="number" value={additional} onChange={(e) => setAdditional(Number(e.target.value))} />
				</div>
			</div>

			<div className="text-sm text-muted-foreground">
				Jours: {days ?? "—"} · Prix/jour: {daily} · Total estimé: {total ?? "—"}
			</div>
		</div>
	);
}

function StepDrivers() {
	return (
		<div className="space-y-2 text-sm text-muted-foreground">
			Étape 4: ajoutez des conducteurs additionnels si nécessaire (optionnel).
		</div>
	);
}

function StepContract() {
	return (
		<div className="space-y-2 text-sm text-muted-foreground">
			Étape 5: vérifiez le récapitulatif puis générez le contrat.
		</div>
	);
}
