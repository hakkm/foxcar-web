import { Outlet, NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
import { Car, Home, Info, Mail, Newspaper, Users, Building2 } from "lucide-react";
import Breadcrumbs from "@/components/breadcrumbs";
import { ModeToggle } from "./ui/mode-toggle";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  // { to: "/about", label: "About", icon: Info },
  // { to: "/contact", label: "Contact", icon: Mail },
  // { to: "/posts", label: "Posts", icon: Newspaper },
  { to: "/vehicles", label: "Vehicles", icon: Car },
  { to: "/clients", label: "Clients", icon: Users },
  { to: "/partners", label: "Partners", icon: Building2 },
] as const;

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
              <a href="#">
                <Car className="!size-5" />
                <span className="text-base font-semibold">Fox Car.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <NavLink to={item.to} end={item.to === "/"} className="contents">
                      {({ isActive }) => (
                        <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
                          <div className="inline-flex items-center gap-2">
                            <item.icon className="size-4" />
                            <span>{item.label}</span>
                          </div>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
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
