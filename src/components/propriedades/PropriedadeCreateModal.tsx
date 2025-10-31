"use client";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabaseClient";
import { uploadPropriedadeImages } from "@/lib/storage";
import { toast } from "sonner";

type Props = {
  onCreated: () => Promise<void> | void;
};

export default function PropriedadeCreateModal({ onCreated }: Props) {
  const supabase = useMemo(() => createClient(), []);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  async function authHeader(): Promise<Headers> {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    const h = new Headers();
    if (token) h.set("Authorization", `Bearer ${token}`);
    return h;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) {
      toast.error("Informe um nome");
      return;
    }
    setSaving(true);
    try {
      const headers = await authHeader();
      headers.set("Content-Type", "application/json");
      const res = await fetch("/api/propriedades", {
        method: "POST",
        headers,
        body: JSON.stringify({ nome: nome.trim(), endereco: endereco.trim() || null, descricao: descricao.trim() || null }),
      });
      const created = await res.json();
      if (!res.ok) throw new Error(created?.error || "Falha ao criar");

      // upload images then patch
      if (files.length > 0) {
        const { data: sessionData } = await supabase.auth.getSession();
        const userId = sessionData.session?.user.id as string;
        const urls = await uploadPropriedadeImages(supabase, userId, created.id, files);
        if (urls.length > 0) {
          const resp = await fetch("/api/propriedades", {
            method: "PATCH",
            headers,
            body: JSON.stringify({ id: created.id, images: urls }),
          });
          if (!resp.ok) {
            const j = await resp.json().catch(() => ({}));
            throw new Error((j as { error?: string })?.error || "Falha ao salvar imagens");
          }
        }
      }

      toast.success("Propriedade criada");
      setNome("");
      setEndereco("");
      setDescricao("");
      setFiles([]);
      setPreviews([]);
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
        <Button>Novo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Propriedade</DialogTitle>
          <DialogDescription>Preencha as informações e adicione imagens.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: Apartamento Central" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="endereco">Endereço</Label>
            <Input id="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Rua Exemplo, 123" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="descricao">Descrição</Label>
            <textarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="min-h-24 w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="Fale sobre a propriedade..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="images">Imagens</Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const list = Array.from(e.target.files || []);
                if (list.length === 0) return;
                setFiles((prev) => [...prev, ...list]);
                setPreviews((prev) => [...prev, ...list.map((f) => URL.createObjectURL(f))]);
                e.currentTarget.value = "";
              }}
            />
            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {previews.map((src, i) => (
                  <div key={src} className="relative group">
                    <img src={src} alt="preview" className="h-24 w-full rounded-md object-cover" />
                    <button
                      type="button"
                      aria-label="Remover imagem"
                      title="Remover"
                      className="absolute right-1 top-1 grid place-items-center size-6 rounded-full bg-black/60 text-white text-sm opacity-90 hover:opacity-100"
                      onClick={() => {
                        try { URL.revokeObjectURL(src); } catch {}
                        setFiles((fs) => fs.filter((_, idx) => idx !== i));
                        setPreviews((ps) => ps.filter((_, idx) => idx !== i));
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
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


