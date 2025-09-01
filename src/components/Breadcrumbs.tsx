import { Link, useMatches } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Renders breadcrumbs based on react-router route handles.
// Add `handle: { breadcrumb: 'Label' }` to your routes in routes.tsx
// Optionally set it to a function: (match) => string | ReactNode
export default function Breadcrumbs() {
  const matches = useMatches();

  const crumbs = matches
    .filter((m) => (m as any).handle && (m as any).handle.breadcrumb)
    .map((m) => {
      const handle = (m as any).handle;
      const value = typeof handle.breadcrumb === "function" ? handle.breadcrumb(m) : handle.breadcrumb;
      return {
        href: (m as any).pathname || "/",
        label: value,
      } as { href: string; label: React.ReactNode };
    });

  if (!crumbs.length) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((c, idx) => {
          const isLast = idx === crumbs.length - 1;
          return (
            <div key={`crumb-${idx}`}>
              <BreadcrumbItem key={`item-${idx}`}>
                {isLast ? (
                  <BreadcrumbPage>{c.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={c.href}>{c.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator key={`sep-${idx}`} />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
