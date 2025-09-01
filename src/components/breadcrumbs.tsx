import { Link, useMatches } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export default function Breadcrumbs() {
  const matches = useMatches();

  // Build breadcrumbs from route handles, normalize paths (remove trailing slashes)
  const raw = matches.filter((m) => (m as any).handle && (m as any).handle.breadcrumb);

  const normalizePath = (p: string) => {
    if (!p) return "/";
    // Remove trailing slashes but keep root '/'
    const trimmed = p.replace(/\/+$|(?<=.)$/, "");
    const withoutTrailing = trimmed.replace(/\/+$/, "");
    return withoutTrailing === "" ? "/" : withoutTrailing;
  };

  const seen = new Set<string>();
  const crumbs = raw
    .map((m) => {
      const handle = (m as any).handle;
      const value = typeof handle.breadcrumb === "function" ? handle.breadcrumb(m) : handle.breadcrumb;
      const href = (m as any).pathname || "/";
      return { href, label: value } as { href: string; label: React.ReactNode };
    })
    .filter((c) => {
      const norm = normalizePath(c.href);
      if (seen.has(norm)) return false;
      seen.add(norm);
      c.href = norm;
      return true;
    });

  if (!crumbs.length) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((c, idx) => {
          const isLast = idx === crumbs.length - 1;
          return (
            <React.Fragment key={`crumb-${c.href}-${idx}`}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{c.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={c.href}>{c.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
