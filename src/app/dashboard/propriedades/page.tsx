"use client";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createClient } from "@/lib/supabaseClient";
import type { Propriedade } from "@/types/propriedade";

export default function PropriedadesPage() {
  const supabase = useMemo(() => createClient(), []);
  const [items, setItems] = useState<Propriedade[]>([]);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNome, setEditNome] = useState("");
  const [editEndereco, setEditEndereco] = useState("");

  async function authHeader() {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async function load() {
    setLoading(true);
    try {
      const headers = await authHeader();
      const res = await fetch("/api/propriedades", { headers });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Falha ao carregar");
      setItems(json);
    } catch (e: any) {
      toast.error("Erro ao carregar", { description: e.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) return toast.error("Informe um nome");
    setSaving(true);
    try {
      const headers = await authHeader();
      const res = await fetch("/api/propriedades", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ nome: nome.trim(), endereco: endereco.trim() || null }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Falha ao criar");
      toast.success("Propriedade criada");
      setNome("");
      setEndereco("");
      await load();
    } catch (e: any) {
      toast.error("Erro ao criar", { description: e.message });
    } finally {
      setSaving(false);
    }
  }

  async function startEdit(item: Propriedade) {
    setEditingId(item.id);
    setEditNome(item.nome);
    setEditEndereco(item.endereco || "");
  }

  async function saveEdit(id: string) {
    try {
      const headers = await authHeader();
      const res = await fetch("/api/propriedades", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ id, nome: editNome.trim(), endereco: editEndereco.trim() || null }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Falha ao atualizar");
      toast.success("Propriedade atualizada");
      setEditingId(null);
      await load();
    } catch (e: any) {
      toast.error("Erro ao atualizar", { description: e.message });
    }
  }

  async function onDelete(id: string) {
    try {
      const headers = await authHeader();
      const res = await fetch(`/api/propriedades?id=${id}`, { method: "DELETE", headers });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || "Falha ao excluir");
      }
      toast.success("Propriedade excluída");
      await load();
    } catch (e: any) {
      toast.error("Erro ao excluir", { description: e.message });
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Propriedades</h1>
        <p className="text-sm text-muted-foreground">Gerencie suas propriedades</p>
      </div>

      <form onSubmit={onCreate} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <div className="grid gap-2">
          <Label htmlFor="nome">Nome</Label>
          <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: Apartamento Central" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="endereco">Endereço</Label>
          <Input id="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Rua Exemplo, 123" />
        </div>
        <div className="flex items-end">
          <Button type="submit" disabled={saving}>
            {saving ? "Salvando..." : "Criar"}
          </Button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b">
              <th className="py-2 pr-3">Nome</th>
              <th className="py-2 pr-3">Endereço</th>
              <th className="py-2 pr-3">Criado em</th>
              <th className="py-2 pr-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="py-4" colSpan={4}>Carregando...</td></tr>
            ) : items.length === 0 ? (
              <tr><td className="py-4" colSpan={4}>Nenhuma propriedade encontrada.</td></tr>
            ) : (
              items.map((it) => (
                <tr key={it.id} className="border-b last:border-b-0">
                  <td className="py-2 pr-3">
                    {editingId === it.id ? (
                      <Input value={editNome} onChange={(e) => setEditNome(e.target.value)} />
                    ) : (
                      it.nome
                    )}
                  </td>
                  <td className="py-2 pr-3">
                    {editingId === it.id ? (
                      <Input value={editEndereco} onChange={(e) => setEditEndereco(e.target.value)} />
                    ) : (
                      it.endereco || "—"
                    )}
                  </td>
                  <td className="py-2 pr-3">{new Date(it.created_at).toLocaleDateString()}</td>
                  <td className="py-2 pr-3 flex gap-2">
                    {editingId === it.id ? (
                      <>
                        <Button size="sm" onClick={() => saveEdit(it.id)}>Salvar</Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancelar</Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="ghost" onClick={() => startEdit(it)}>Editar</Button>
                        <Button size="sm" variant="destructive" onClick={() => onDelete(it.id)}>Excluir</Button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

