"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import type { Propriedade } from "@/types/propriedade";
import type { ReservaWithPropriedade, ReservaStatus } from "@/types/reserva";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import ReservaCreateModal from "@/components/reservas/ReservaCreateModal";
import ReservaEditModal from "@/components/reservas/ReservaEditModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDelete, useGet } from "@/hooks/useFetch";

export default function ReservasPage() {
  const supabase = useMemo(() => createClient(), []);
  const [status, setStatus] = useState<"" | ReservaStatus>("");
  const [propFilter, setPropFilter] = useState<string>("");
  const { data: propsList = [] } = useGet<Propriedade[]>(["propriedades"], "/api/propriedades");
  const { data: items = [], isLoading: loading, refetch } = useGet<ReservaWithPropriedade[]>(
    ["reservas", status, propFilter],
    `/api/reservas?${new URLSearchParams({ ...(status ? { status } : {}), ...(propFilter ? { propriedade_id: propFilter } : {}) }).toString()}`
  );
  const del = useDelete(["reservas"]);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<ReservaWithPropriedade | null>(null);
  const [busy, setBusy] = useState(false);

  const authHeader = useCallback(async (): Promise<Headers> => {
    const h = new Headers();
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (token) h.set("Authorization", `Bearer ${token}`);
    return h;
  }, [supabase.auth]);

  const load = useCallback(async () => { await refetch(); }, [refetch]);

  useEffect(() => {
    void (async () => {
      try {
        const headers = await authHeader();
        const res = await fetch("/api/propriedades", { headers });
        const json = await res.json();
        if (res.ok) setPropsList(json);
      } catch {}
    })();
  }, [authHeader]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Reservas</h1>
        <p className="text-sm text-muted-foreground">Listagem com filtros</p>
      </div>

      <div className="flex flex-wrap gap-3 items-end justify-between">
        <div className="flex gap-3 items-end flex-wrap">
        <div className="grid gap-1">
          <Label htmlFor="status">Status</Label>
          <select id="status" className="h-9 rounded-md border bg-background px-2 text-sm" value={status} onChange={(e) => setStatus(e.target.value as any)}>
            <option value="">Todos</option>
            <option value="pendente">Pendente</option>
            <option value="confirmada">Confirmada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
        <div className="grid gap-1">
          <Label htmlFor="prop">Propriedade</Label>
          <select id="prop" className="h-9 rounded-md border bg-background px-2 text-sm" value={propFilter} onChange={(e) => setPropFilter(e.target.value)}>
            <option value="">Todas</option>
            {propsList.map((p) => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>
        </div>
        <Button onClick={() => load()}>Aplicar</Button>
        </div>
        <ReservaCreateModal onCreated={load} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b">
              <th className="py-2 pr-3">Propriedade</th>
              <th className="py-2 pr-3">Hóspede</th>
              <th className="py-2 pr-3">Início</th>
              <th className="py-2 pr-3">Fim</th>
              <th className="py-2 pr-3">Status</th>
              <th className="py-2 pr-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="py-4" colSpan={6}>Carregando...</td></tr>
            ) : items.length === 0 ? (
              <tr><td className="py-4" colSpan={6}>Nenhuma reserva encontrada.</td></tr>
            ) : (
              items.map((r) => (
                <tr key={r.id} className="border-b last:border-b-0">
                  <td className="py-2 pr-3">{r.propriedade?.nome || "—"}</td>
                  <td className="py-2 pr-3">{r.hospede_nome || "—"}</td>
                  <td className="py-2 pr-3">{r.data_inicio}</td>
                  <td className="py-2 pr-3">{r.data_fim}</td>
                  <td className="py-2 pr-3 capitalize">{r.status}</td>
                  <td className="py-2 pr-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => { setSelected(r); setEditOpen(true); }}>Editar</Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">Excluir</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir reserva?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação removerá a reserva. Não é possível desfazer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel asChild>
                              <Button variant="ghost">Cancelar</Button>
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                      <Button variant="destructive" onClick={async () => {
                        try {
                          setBusy(true);
                          await del.mutateAsync({ url: `/api/reservas?id=${r.id}` });
                          toast.success('Reserva excluída');
                          await load();
                        } catch (err) {
                          const message = err instanceof Error ? err.message : 'Falha ao excluir';
                          toast.error('Erro ao excluir', { description: message });
                        } finally {
                          setBusy(false);
                        }
                      }}>Confirmar exclusão</Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ReservaEditModal open={editOpen} onOpenChange={setEditOpen} item={selected} onSaved={load} />
      {busy && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 backdrop-blur-sm">
          <div className="flex items-center gap-2 rounded-md bg-background/90 px-3 py-2 text-sm shadow">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
            Processando...
          </div>
        </div>
      )}
    </div>
  );
}

