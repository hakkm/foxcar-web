import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

export type NavItem = {
  title: string;
  href?: string;
  icon?: React.ComponentType<any>;
  items?: NavItem[];
};

function useIsActive(pathname: string) {
  return React.useCallback(
    (href?: string) => {
      if (!href) return false;
      if (href === "/") return pathname === "/";
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname]
  );
}

export function NavMain({ items }: { items: NavItem[] }) {
  const { pathname } = useLocation();
  const isActive = useIsActive(pathname);

  const renderItem = (item: NavItem) => {
    const anySubActive = (item.items ?? []).some((s) => isActive(s.href));
    const topActive = isActive(item.href) || anySubActive;

    if (item.items && item.items.length) {
      const firstHref = item.href || item.items.find((s) => !!s.href)?.href;
      return (
        <React.Fragment key={item.title}>
          {/* Expanded view: show collapsible group */}
          <Collapsible asChild defaultOpen={topActive} className="group/collapsible">
            <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title} isActive={topActive}>
                  <div className="inline-flex items-center gap-2 w-full">
                    {item.icon && <item.icon className="size-4" />}
                    <span className="truncate">{item.title}</span>
                    <ChevronRight className="ml-auto text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </div>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map((sub) => {
                    const subActive = isActive(sub.href);
                    return (
                      <SidebarMenuSubItem key={sub.title}>
                        {sub.href ? (
                          <SidebarMenuSubButton asChild isActive={subActive}>
                            <NavLink to={sub.href} className="w-full inline-flex items-center gap-2">
                              {sub.icon && <sub.icon className="size-4" />}
                              <span className="truncate">{sub.title}</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        ) : (
                          <SidebarMenuSubButton aria-disabled className="inline-flex items-center gap-2">
                            {sub.icon && <sub.icon className="size-4" />}
                            <span className="truncate">{sub.title}</span>
                          </SidebarMenuSubButton>
                        )}
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          {/* Collapsed view: show a single icon button linking to firstHref */}
          <SidebarMenuItem className="hidden group-data-[collapsible=icon]:block">
            <SidebarMenuButton asChild tooltip={item.title} isActive={topActive}>
              <NavLink to={firstHref || "#"} className="inline-flex items-center gap-2 w-full">
                {item.icon && <item.icon className="size-4" />}
                <span className="truncate">{item.title}</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </React.Fragment>
      );
    }

    return (
      <SidebarMenuItem key={item.title}>
        {item.href ? (
          <NavLink to={item.href} end={item.href === "/"} className="contents">
            {({ isActive: active }) => (
              <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                <div className="inline-flex items-center gap-2 w-full">
                  {item.icon && <item.icon className="size-4" />}
                  <span className="truncate">{item.title}</span>
                </div>
              </SidebarMenuButton>
            )}
          </NavLink>
        ) : (
          <SidebarMenuButton aria-disabled>
            <div className="inline-flex items-center gap-2 w-full">
              {item.icon && <item.icon className="size-4" />}
              <span className="truncate">{item.title}</span>
            </div>
          </SidebarMenuButton>
        )}
      </SidebarMenuItem>
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => renderItem(item))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
