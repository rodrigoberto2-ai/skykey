"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function ClientGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    const supabase = createClient();

    async function ensureSession() {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      const hasSession = !!data.session;
      if (!hasSession) {
        // If already on login, do nothing; otherwise redirect
        if (pathname !== "/login") router.replace("/login");
      }
      setChecking(false);
    }

    ensureSession();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      const hasSession = !!session;
      if (!hasSession && pathname !== "/login") router.replace("/login");
      if (hasSession && pathname === "/login") router.replace("/dashboard");
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [router, pathname]);

  if (checking) {
    return (
      <div className="min-h-[100svh] grid place-items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
          Verificando sessão...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

