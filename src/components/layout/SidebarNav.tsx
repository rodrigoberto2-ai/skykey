"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SidebarNav() {
  const pathname = usePathname();
  const items = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/reservas", label: "Reservas" },
    { href: "/dashboard/propriedades", label: "Propriedades" },
    { href: "/dashboard/relatorios", label: "Relatórios" },
    { href: "/dashboard/config", label: "Configurações" },
  ];
  return (
    <nav className="px-4 py-4">
      <ul className="space-y-1">
        {items.map((it) => {
          const active = pathname === it.href;
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

