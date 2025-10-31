"use client";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import type { Propriedade, PropriedadeImagem } from "@/types/propriedade";
import PropriedadeCreateModal from "@/components/propriedades/PropriedadeCreateModal";
import PropriedadeEditModal from "@/components/propriedades/PropriedadeEditModal";
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

type PropriedadeWithImgs = Propriedade & {
  propriedade_imagens?: PropriedadeImagem[];
};

export default function PropriedadesPage() {
  const { data: items = [], isLoading: loading, refetch } = useGet<PropriedadeWithImgs[]>(["propriedades"], "/api/propriedades");
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<PropriedadeWithImgs | null>(null);
  const [busy, setBusy] = useState(false);
  const del = useDelete([ ["propriedades"] ]);

  const load = useCallback(async () => {
    await refetch();
  }, [refetch]);

  async function onDelete(id: string) {
    try {
      setBusy(true);
      await del.mutateAsync({ url: `/api/propriedades?id=${id}` });
      toast.success("Propriedade excluída");
      await load();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Falha ao excluir";
      toast.error("Erro ao excluir", { description: message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Propriedades</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie suas propriedades
          </p>
        </div>
        <PropriedadeCreateModal onCreated={load} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b">
              <th className="py-2 pr-3">Nome</th>
              <th className="py-2 pr-3">Endereço</th>
              <th className="py-2 pr-3">Criado em</th>
              <th className="py-2 pr-3">Imagens</th>
              <th className="py-2 pr-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="py-4" colSpan={5}>
                  Carregando...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td className="py-4" colSpan={5}>
                  Nenhuma propriedade encontrada.
                </td>
              </tr>
            ) : (
              items.map((it) => (
                <tr key={it.id} className="border-b last:border-b-0">
                  <td className="py-2 pr-3">{it.nome}</td>
                  <td className="py-2 pr-3">{it.endereco || "—"}</td>
                  <td className="py-2 pr-3">
                    {new Date(it.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-2 pr-3">
                    <div className="flex gap-1">
                      {(it.propriedade_imagens || []).slice(0, 3).map((img) => (
                        <Image
                          key={img.id}
                          src={img.url}
                          alt="thumb"
                          width={36}
                          height={36}
                          className="size-9 rounded object-cover"
                          unoptimized
                        />
                      ))}
                      {(it.propriedade_imagens?.length || 0) > 3 && (
                        <span className="text-xs text-muted-foreground self-center">
                          +{it.propriedade_imagens!.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2 pr-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelected(it);
                          setEditOpen(true);
                        }}
                      >
                        Editar
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">Excluir</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir propriedade?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação removerá a propriedade e as imagens associadas. Não é possível desfazer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel asChild>
                              <Button variant="ghost">Cancelar</Button>
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                              <Button variant="destructive" onClick={() => onDelete(it.id)}>
                                Confirmar exclusão
                              </Button>
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

      <PropriedadeEditModal
        open={editOpen}
        onOpenChange={setEditOpen}
        item={selected}
        onSaved={load}
      />
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


import { useDelete, useGet } from "@/hooks/useFetch";
