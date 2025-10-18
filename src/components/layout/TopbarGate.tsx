"use client";
import { usePathname } from "next/navigation";
import Topbar from "@/components/Topbar";

export default function TopbarGate() {
  const pathname = usePathname();
  const hideOnDashboard = pathname?.startsWith("/dashboard");
  if (hideOnDashboard) return null;
  return <Topbar />;
}

