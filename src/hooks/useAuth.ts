"use client";
import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabaseClient";
import { useUserStore } from "@/store/userStore";

type SignInParams = { email: string; password: string };
type SignUpParams = { email: string; password: string; fullName?: string };

export function useAuth() {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const clear = useUserStore((s) => s.clear);
  const [loading, setLoading] = useState(false);

  const signIn = useCallback(async ({ email, password }: SignInParams) => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.session?.user) {
        const u = data.session.user;
        setUser({ id: u.id, email: u.email ?? null, name: (u.user_metadata as any)?.full_name ?? null });
      }
      return { data, error: null as null };
    } catch (err) {
      return { data: null, error: err as Error };
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  const signUp = useCallback(async ({ email, password, fullName }: SignUpParams) => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) throw error;
      return { data, error: null as null };
    } catch (err) {
      return { data: null, error: err as Error };
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      clear();
      return { error: null as null };
    } catch (err) {
      return { error: err as Error };
    } finally {
      setLoading(false);
    }
  }, [clear]);

  const getSession = useCallback(async () => {
    const supabase = createClient();
    return supabase.auth.getSession();
  }, []);

  return { user, loading, signIn, signUp, signOut, getSession };
}

