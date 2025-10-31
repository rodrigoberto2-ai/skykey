"use client";
import { useQuery, useMutation, useQueryClient, QueryKey } from "@tanstack/react-query";
import { api } from "@/lib/apiClient";

export function useGet<T = unknown>(key: ReadonlyArray<unknown>, url: string, enabled = true) {
  return useQuery<T>({
    queryKey: key,
    queryFn: async () => {
      const res = await api.get(url);
      return res.data as T;
    },
    enabled,
  });
}

export function usePost<TResp = unknown, TBody = unknown>(invalidateKeys: ReadonlyArray<ReadonlyArray<unknown>> = []) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ url, body }: { url: string; body: TBody }) => {
      const res = await api.post(url, body);
      return res.data as TResp;
    },
    onSuccess: async () => {
      await Promise.all(invalidateKeys.map((k) => qc.invalidateQueries({ queryKey: k })));
    },
  });
}

export function usePatch<TResp = unknown, TBody = unknown>(invalidateKeys: ReadonlyArray<ReadonlyArray<unknown>> = []) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ url, body }: { url: string; body: TBody }) => {
      const res = await api.patch(url, body);
      return res.data as TResp;
    },
    onSuccess: async () => {
      await Promise.all(invalidateKeys.map((k) => qc.invalidateQueries({ queryKey: k })));
    },
  });
}

export function useDelete<TResp = unknown>(invalidateKeys: ReadonlyArray<ReadonlyArray<unknown>> = []) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ url }: { url: string }) => {
      const res = await api.delete(url);
      return res.data as TResp;
    },
    onSuccess: async () => {
      await Promise.all(invalidateKeys.map((k) => qc.invalidateQueries({ queryKey: k })));
    },
  });
}

