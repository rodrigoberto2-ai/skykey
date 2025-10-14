"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { useUserStore } from "@/store/userStore";

export default function ClientGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    const supabase = createClient();
    const setUser = useUserStore.getState().setUser;
    const clear = useUserStore.getState().clear;

    async function ensureSession() {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      const hasSession = !!data.session;
      if (!hasSession) {
        // If already on login, do nothing; otherwise redirect
        if (pathname !== "/login") router.replace("/login");
        clear();
      }
      if (data.session?.user) {
        const u = data.session.user;
        setUser({ id: u.id, email: u.email ?? null, name: (u.user_metadata as any)?.full_name ?? null });
      }
      setChecking(false);
    }

    ensureSession();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      const hasSession = !!session;
      if (!hasSession && pathname !== "/login") router.replace("/login");
      if (hasSession && pathname === "/login") router.replace("/dashboard");
      if (!hasSession) clear();
      if (session?.user) {
        const u = session.user;
        setUser({ id: u.id, email: u.email ?? null, name: (u.user_metadata as any)?.full_name ?? null });
      }
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
