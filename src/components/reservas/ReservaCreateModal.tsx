"use client";
import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabaseClient";
import type { Propriedade } from "@/types/propriedade";
import type { ReservaStatus } from "@/types/reserva";
import { toast } from "sonner";

type Props = {
  onCreated: () => Promise<void> | void;
};

export default function ReservaCreateModal({ onCreated }: Props) {
  const supabase = useMemo(() => createClient(), []);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [propsList, setPropsList] = useState<Propriedade[]>([]);

  const [propriedadeId, setPropriedadeId] = useState("");
  const [hospede, setHospede] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [status, setStatus] = useState<ReservaStatus>("pendente");

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
    return h;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!propriedadeId) return toast.error("Selecione uma propriedade");
    if (!inicio || !fim) return toast.error("Informe as datas");
    if (new Date(inicio) > new Date(fim)) return toast.error("Data de início deve ser anterior ou igual à data final");

    setSaving(true);
    try {
      const headers = await authHeader();
      headers.set("Content-Type", "application/json");
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers,
        body: JSON.stringify({
          propriedade_id: propriedadeId,
          hospede_nome: hospede.trim() || null,
          data_inicio: inicio,
          data_fim: fim,
          status,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Falha ao criar reserva");
      toast.success("Reserva criada");
      setPropriedadeId("");
      setHospede("");
      setInicio("");
      setFim("");
      setStatus("pendente");
      setOpen(false);
      await onCreated();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Falha ao criar";
      toast.error("Erro ao criar", { description: message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Nova Reserva</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Reserva</DialogTitle>
          <DialogDescription>Informe os dados da reserva.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-3">
          <div className="grid gap-1">
            <Label htmlFor="prop">Propriedade</Label>
            <select id="prop" className="h-9 rounded-md border bg-background px-2 text-sm" value={propriedadeId} onChange={(e) => setPropriedadeId(e.target.value)} required>
              <option value="">Selecione</option>
              {propsList.map((p) => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="h">Hóspede</Label>
            <Input id="h" value={hospede} onChange={(e) => setHospede(e.target.value)} placeholder="Nome do hóspede" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1">
              <Label htmlFor="di">Início</Label>
              <Input id="di" type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} required />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="df">Fim</Label>
              <Input id="df" type="date" value={fim} onChange={(e) => setFim(e.target.value)} required />
            </div>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="st">Status</Label>
            <select id="st" className="h-9 rounded-md border bg-background px-2 text-sm" value={status} onChange={(e) => setStatus(e.target.value as ReservaStatus)}>
              <option value="pendente">Pendente</option>
              <option value="confirmada">Confirmada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={saving}>{saving ? "Salvando..." : "Criar"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
