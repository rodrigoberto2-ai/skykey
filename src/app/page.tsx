"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/dashboard");
      else router.replace("/login");
    });
  }, [router]);

  return (
    <div className="min-h-[100svh] grid place-items-center">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
        Redirecionando...
      </div>
    </div>
  );
}
