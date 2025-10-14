"use client";
import axios from "axios";
import { createClient } from "@/lib/supabaseClient";

export const api = axios.create({ baseURL: "/" });

api.interceptors.request.use(async (config) => {
  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (token) {
      config.headers = config.headers || {};
      (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

