import { NextRequest } from "next/server";
import { createServerClientFromBearer } from "@/lib/serverSupabase";

function getBearer(req: NextRequest) {
  const auth = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!auth) return undefined;
  const [scheme, token] = auth.split(" ");
  if (scheme?.toLowerCase() !== "bearer") return undefined;
  return token;
}

export async function GET(req: NextRequest) {
  const token = getBearer(req);
  const supabase = createServerClientFromBearer(token);
  if (!supabase) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const propriedadeId = searchParams.get("propriedade_id");

  let query = supabase
    .from("reservas")
    .select("*, propriedade:propriedades(id, nome)")
    .order("data_inicio", { ascending: false });

  if (status) query = query.eq("status", status);
  if (propriedadeId) query = query.eq("propriedade_id", propriedadeId);

  const { data, error } = await query;
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const token = getBearer(req);
  const supabase = createServerClientFromBearer(token);
  if (!supabase) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const propriedade_id = body?.propriedade_id ? String(body.propriedade_id) : "";
  const hospede_nome = body?.hospede_nome ? String(body.hospede_nome) : null;
  const data_inicio = body?.data_inicio ? String(body.data_inicio) : "";
  const data_fim = body?.data_fim ? String(body.data_fim) : "";
  const status = body?.status ? String(body.status) : "pendente";

  if (!propriedade_id) return Response.json({ error: "propriedade_id é obrigatório" }, { status: 400 });
  if (!data_inicio || !data_fim) return Response.json({ error: "Datas são obrigatórias" }, { status: 400 });
  if (new Date(data_inicio) > new Date(data_fim)) return Response.json({ error: "data_inicio deve ser <= data_fim" }, { status: 400 });

  // Optionally ensure propriedade exists and belongs to user (RLS will handle but we can fail fast)
  const { error: insErr, data } = await supabase
    .from("reservas")
    .insert([{ propriedade_id, hospede_nome, data_inicio, data_fim, status }])
    .select("*, propriedade:propriedades(id, nome)")
    .single();
  if (insErr) return Response.json({ error: insErr.message }, { status: 500 });
  return Response.json(data, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const token = getBearer(req);
  const supabase = createServerClientFromBearer(token);
  if (!supabase) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const id = body?.id ? String(body.id) : "";
  if (!id) return Response.json({ error: "id é obrigatório" }, { status: 400 });

  const fields: Record<string, unknown> = {};
  if (typeof body?.hospede_nome !== "undefined") fields.hospede_nome = body.hospede_nome === null ? null : String(body.hospede_nome);
  if (typeof body?.status !== "undefined") fields.status = String(body.status);
  if (typeof body?.data_inicio !== "undefined") fields.data_inicio = String(body.data_inicio);
  if (typeof body?.data_fim !== "undefined") fields.data_fim = String(body.data_fim);
  if (fields.data_inicio && fields.data_fim) {
    if (new Date(String(fields.data_inicio)) > new Date(String(fields.data_fim))) {
      return Response.json({ error: "data_inicio deve ser <= data_fim" }, { status: 400 });
    }
  }
  if (Object.keys(fields).length === 0) return Response.json({ error: "Nada para atualizar" }, { status: 400 });

  const { data, error } = await supabase
    .from("reservas")
    .update(fields)
    .eq("id", id)
    .select("*, propriedade:propriedades(id, nome)")
    .single();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function DELETE(req: NextRequest) {
  const token = getBearer(req);
  const supabase = createServerClientFromBearer(token);
  if (!supabase) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "Query param 'id' é obrigatório" }, { status: 400 });

  const { error } = await supabase.from("reservas").delete().eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return new Response(null, { status: 204 });
}

