import ClientGuard from "@/components/auth/ClientGuard";
import LogoutButton from "@/components/auth/LogoutButton";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClientGuard>
      <div className="min-h-[100svh]">
        <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
            <span className="font-semibold">Skykey Dashboard</span>
            <LogoutButton />
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
      </div>
    </ClientGuard>
  );
}
