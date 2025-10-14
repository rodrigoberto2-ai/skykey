"use client";
import { useEffect, useState } from "react";

export default function DashboardGrid({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem("sidebar-collapsed");
      if (v === "1") setCollapsed(true);
    } catch {}
    const onToggle = (e: Event) => {
      const detail = (e as CustomEvent<boolean>).detail;
      setCollapsed(!!detail);
    };
    window.addEventListener("sidebar-toggle", onToggle as EventListener);
    return () => window.removeEventListener("sidebar-toggle", onToggle as EventListener);
  }, []);

  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `${collapsed ? "64px" : "240px"} 1fr` }}
    >
      {children}
    </div>
  );
}

