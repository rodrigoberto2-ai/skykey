"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, CalendarCheck2, Building2, BarChart2, Settings, PanelLeftClose, PanelLeftOpen } from "lucide-react";

type Item = { href: string; label: string; icon: React.ComponentType<{ className?: string }> };

export default function SidebarNav() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem("sidebar-collapsed");
      if (v === "1") setCollapsed(true);
    } catch {}
  }, []);

  function toggle() {
    setCollapsed((c) => {
      const n = !c;
      try { localStorage.setItem("sidebar-collapsed", n ? "1" : "0"); } catch {}
      try { window.dispatchEvent(new CustomEvent("sidebar-toggle", { detail: n })); } catch {}
      return n;
    });
  }

  const items: Item[] = [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/reservas", label: "Reservas", icon: CalendarCheck2 },
    { href: "/dashboard/propriedades", label: "Propriedades", icon: Building2 },
    { href: "/dashboard/relatorios", label: "Relatórios", icon: BarChart2 },
    { href: "/dashboard/config", label: "Configurações", icon: Settings },
  ];

  useEffect(() => {
    const grid = document.getElementById("dashboard-grid");
    if (grid) {
      (grid as HTMLElement).style.gridTemplateColumns = `${collapsed ? "64px" : "240px"} 1fr`;
    }
  }, [collapsed]);

  return (
    <nav className={cn("px-2 py-3 h-full")}> 
      <div className="mb-3 flex justify-end px-1">
        <button
          type="button"
          onClick={toggle}
          className="inline-flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label={collapsed ? "Expandir sidebar" : "Recolher sidebar"}
          title={collapsed ? "Expandir" : "Recolher"}
        >
          {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
        </button>
      </div>
      <ul className="space-y-1">
        {items.map((it) => {
          const active = pathname === it.href;
          const Icon = it.icon;
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
                title={collapsed ? it.label : undefined}
              >
                <Icon className="size-4 shrink-0" />
                <span
                  className={cn(
                    "truncate overflow-hidden transition-all duration-200",
                    collapsed ? "max-w-0 opacity-0" : "max-w-[160px] opacity-100"
                  )}
                >
                  {it.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
