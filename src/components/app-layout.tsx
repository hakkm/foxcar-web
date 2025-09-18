import { Outlet } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Car, Home, Users, Building2, Landmark, FileText, Wrench, ShieldCheck, FileCog, Droplets } from "lucide-react";
import Breadcrumbs from "@/components/breadcrumbs";
import { ModeToggle } from "./ui/mode-toggle";
import { NavMain, type NavItem } from "@/components/nav-main";

const items: NavItem[] = [
  { title: "Accueil", href: "/", icon: Home },
  { title: "Véhicules", href: "/vehicles", icon: Car },
  { title: "Clients", href: "/clients", icon: Users },
  {
    title: "Partenaires",
    icon: Building2,
    items: [
      { title: "Partenaires", href: "/partners/list", icon: Building2 },
      { title: "Sous-location", href: "/partners/sub-rentals", icon: Car },
    ],
  },
  { title: "Franchises", href: "/franchises", icon: Landmark },
  { title: "Réservations", href: "/bookings", icon: Car },
  {
    title: "Documents",
    icon: FileText,
    items: [
      { title: "Factures", href: "/documents/invoices", icon: FileText },
      { title: "Contrats", href: "/documents/contracts", icon: FileText },
    ],
  },
  {
    title: "Contrôle",
    icon: Wrench,
    items: [
      { title: "Vidanges", href: "/control/oil-changes", icon: Droplets },
      { title: "Autres maintenances", href: "/control/other-maintenances", icon: FileCog },
      { title: "Inspections techniques", href: "/control/technical-inspections", icon: FileText },
      { title: "Assurances", href: "/control/insurances", icon: ShieldCheck },
    ],
  },
];

export default function AppLayout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 50)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5"
              >
                <a href="#" className="flex items-center gap-2">
                  <Car className="!size-5" />
                  {/* <span className="text-[20px]" aria-hidden="true">
                    🦊
                  </span> */}
                  <span className="text-base font-semibold">Fox Car.</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={items} />
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <div className="px-2 text-xs text-muted-foreground">v1.0.0</div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <div className="flex h-12 items-center gap-2 border-b px-3 sm:px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Breadcrumbs />
          <div className="flex-1" />
          <ModeToggle />
        </div>
        <div className="p-3 sm:p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
