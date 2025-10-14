"use client";
import { useMemo, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabaseClient";
import type { Propriedade } from "@/types/propriedade";
import type { ReservaWithPropriedade, ReservaStatus } from "@/types/reserva";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  item: ReservaWithPropriedade | null;
  onSaved: () => Promise<void> | void;
};

export default function ReservaEditModal({ open, onOpenChange, item, onSaved }: Props) {
  const supabase = useMemo(() => createClient(), []);
  const [saving, setSaving] = useState(false);
  const [propsList, setPropsList] = useState<Propriedade[]>([]);

  const [propriedadeId, setPropriedadeId] = useState("");
  const [hospede, setHospede] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [status, setStatus] = useState<ReservaStatus>("pendente");

  useEffect(() => {
    if (item) {
      setPropriedadeId(item.propriedade_id);
      setHospede(item.hospede_nome || "");
      setInicio(item.data_inicio);
      setFim(item.data_fim);
      setStatus(item.status);
    }
  }, [item]);

  useEffect(() => {
    void (async () => {
      try {
        const headers = await authHeader();
        const res = await fetch("/api/propriedades", { headers });
        const json = await res.json();
        if (res.ok) setPropsList(json);
      } catch {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function authHeader(): Promise<Headers> {
    const h = new Headers();
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (token) h.set("Authorization", `Bearer ${token}`);
    h.set("Content-Type", "application/json");
    return h;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!item) return;
    if (!propriedadeId) return toast.error("Selecione uma propriedade");
    if (!inicio || !fim) return toast.error("Informe as datas");
    if (new Date(inicio) > new Date(fim)) return toast.error("Data de início deve ser anterior ou igual à data final");
    setSaving(true);
    try {
      const headers = await authHeader();
      const res = await fetch("/api/reservas", {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          id: item.id,
          propriedade_id: propriedadeId, // opcional: se quiser permitir trocar a propriedade, remova do payload caso não deseje
          hospede_nome: hospede.trim() || null,
          data_inicio: inicio,
          data_fim: fim,
          status,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((json as { error?: string })?.error || "Falha ao salvar");
      toast.success("Reserva atualizada");
      onOpenChange(false);
      await onSaved();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Falha ao salvar";
      toast.error("Erro ao salvar", { description: message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Reserva</DialogTitle>
          <DialogDescription>Atualize os dados da reserva.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-3">
          <div className="grid gap-1">
            <Label htmlFor="prop-edit">Propriedade</Label>
            <select id="prop-edit" className="h-9 rounded-md border bg-background px-2 text-sm" value={propriedadeId} onChange={(e) => setPropriedadeId(e.target.value)} required>
              {propsList.map((p) => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="h-edit">Hóspede</Label>
            <Input id="h-edit" value={hospede} onChange={(e) => setHospede(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1">
              <Label htmlFor="di-edit">Início</Label>
              <Input id="di-edit" type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} required />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="df-edit">Fim</Label>
              <Input id="df-edit" type="date" value={fim} onChange={(e) => setFim(e.target.value)} required />
            </div>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="st-edit">Status</Label>
            <select id="st-edit" className="h-9 rounded-md border bg-background px-2 text-sm" value={status} onChange={(e) => setStatus(e.target.value as ReservaStatus)}>
              <option value="pendente">Pendente</option>
              <option value="confirmada">Confirmada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={saving}>{saving ? "Salvando..." : "Salvar"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

