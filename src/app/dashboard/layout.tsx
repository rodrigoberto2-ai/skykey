import ClientGuard from "@/components/auth/ClientGuard";
import LogoutButton from "@/components/auth/LogoutButton";
import UserBadge from "@/components/auth/UserBadge";
import SidebarNav from "@/components/layout/SidebarNav";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClientGuard>
      <div className="min-h-[100svh] grid grid-rows-[auto_1fr]">
        <Header />
        <div
          className="grid grid-cols-[240px_1fr] max-lg:grid-cols-1"
          style={{ gridTemplateColumns: "240px 1fr", transition: "grid-template-columns 200ms ease" }}
          id="dashboard-grid"
        >
          <aside className="border-r max-lg:border-r-0 max-lg:border-b bg-background/80">
            <SidebarNav />
          </aside>
          <main className="px-6 py-6">{children}</main>
        </div>
      </div>
    </ClientGuard>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 h-14 flex items-center justify-between gap-3">
        <span className="font-semibold">Skykey Dashboard</span>
        <div className="flex items-center gap-3">
          <UserBadge />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}

// SidebarNav moved to a client component under components/layout/SidebarNav.tsx
