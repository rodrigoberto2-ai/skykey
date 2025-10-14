"use client";
import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabaseClient";
import { uploadPropriedadeImages } from "@/lib/storage";
import { toast } from "sonner";
import type { Propriedade, PropriedadeImagem } from "@/types/propriedade";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  item: (Propriedade & { propriedade_imagens?: PropriedadeImagem[] }) | null;
  onSaved: () => Promise<void> | void;
};

export default function PropriedadeEditModal({ open, onOpenChange, item, onSaved }: Props) {
  const supabase = useMemo(() => createClient(), []);
  const [saving, setSaving] = useState(false);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [existingUrls, setExistingUrls] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (item) {
      setNome(item.nome);
      setEndereco(item.endereco || "");
      setDescricao(item.descricao || "");
      setExistingUrls((item.propriedade_imagens || []).map((i) => i.url));
      setNewFiles([]);
      setNewPreviews([]);
    }
  }, [item]);

  async function authHeader() {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!item) return;
    if (!nome.trim()) {
      toast.error("Informe um nome");
      return;
    }
    setSaving(true);
    try {
      const headers = await authHeader();

      // upload novos arquivos
      let uploadedUrls: string[] = [];
      if (newFiles.length > 0) {
        const { data: sessionData } = await supabase.auth.getSession();
        const userId = sessionData.session?.user.id as string;
        uploadedUrls = await uploadPropriedadeImages(supabase, userId, item.id, newFiles);
      }

      const allUrls = [...existingUrls, ...uploadedUrls];

      const res = await fetch("/api/propriedades", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ id: item.id, nome: nome.trim(), endereco: endereco.trim() || null, descricao: descricao.trim() || null, images: allUrls }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Falha ao salvar");

      toast.success("Propriedade atualizada");
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
          <DialogTitle>Editar Propriedade</DialogTitle>
          <DialogDescription>Atualize as informações e gerencie as imagens.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="nome-edit">Nome</Label>
            <Input id="nome-edit" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="endereco-edit">Endereço</Label>
            <Input id="endereco-edit" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="descricao-edit">Descrição</Label>
            <textarea id="descricao-edit" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="min-h-24 w-full rounded-md border bg-background px-3 py-2 text-sm" />
          </div>
          <div className="grid gap-2">
            <Label>Imagens existentes</Label>
            {existingUrls.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhuma imagem.</p>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {existingUrls.map((u) => (
                  <div key={u} className="relative group">
                    <img src={u} alt="imagem" className="h-24 w-full rounded-md object-cover" />
                    <button
                      type="button"
                      aria-label="Remover imagem"
                      title="Remover"
                      className="absolute right-1 top-1 grid place-items-center size-6 rounded-full bg-black/60 text-white text-sm opacity-90 hover:opacity-100"
                      onClick={() => setExistingUrls((arr) => arr.filter((x) => x !== u))}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-images">Adicionar novas imagens</Label>
            <Input
              id="new-images"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const list = Array.from(e.target.files || []);
                if (list.length === 0) return;
                setNewFiles((prev) => [...prev, ...list]);
                setNewPreviews((prev) => [...prev, ...list.map((f) => URL.createObjectURL(f))]);
                e.currentTarget.value = "";
              }}
            />
            {newPreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {newPreviews.map((src, idx) => (
                  <div key={src} className="relative group">
                    <img src={src} alt="preview" className="h-24 w-full rounded-md object-cover" />
                    <button
                      type="button"
                      aria-label="Remover imagem"
                      title="Remover"
                      className="absolute right-1 top-1 grid place-items-center size-6 rounded-full bg-black/60 text-white text-sm opacity-90 hover:opacity-100"
                      onClick={() => {
                        try { URL.revokeObjectURL(src); } catch {}
                        setNewPreviews((ps) => ps.filter((_, i) => i !== idx));
                        setNewFiles((fs) => fs.filter((_, idx) => newPreviews[idx] !== src));
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
            <Button type="submit" disabled={saving}>{saving ? "Salvando..." : "Salvar"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


