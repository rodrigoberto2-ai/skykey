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
  if (!supabase) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabase.from("propriedades").select("*").order("created_at", { ascending: false });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const token = getBearer(req);
  const supabase = createServerClientFromBearer(token);
  if (!supabase) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const nome = (body?.nome ?? "").toString().trim();
  const endereco = body?.endereco ? String(body.endereco).trim() : null;
  if (!nome) return Response.json({ error: "Campo 'nome' é obrigatório." }, { status: 400 });

  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userData?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const ownerId = userData.user.id;

  const { data, error } = await supabase
    .from("propriedades")
    .insert([{ nome, endereco, owner_id: ownerId }])
    .select("*")
    .single();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const token = getBearer(req);
  const supabase = createServerClientFromBearer(token);
  if (!supabase) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const id = String(body?.id || "");
  if (!id) return Response.json({ error: "Campo 'id' é obrigatório." }, { status: 400 });

  const fields: Record<string, any> = {};
  if (typeof body?.nome === "string") fields.nome = body.nome.trim();
  if (typeof body?.endereco !== "undefined") fields.endereco = body.endereco === null ? null : String(body.endereco).trim();
  if (Object.keys(fields).length === 0) return Response.json({ error: "Nenhum campo para atualizar." }, { status: 400 });

  const { data, error } = await supabase.from("propriedades").update(fields).eq("id", id).select("*").single();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function DELETE(req: NextRequest) {
  const token = getBearer(req);
  const supabase = createServerClientFromBearer(token);
  if (!supabase) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "Query param 'id' é obrigatório." }, { status: 400 });

  const { error } = await supabase.from("propriedades").delete().eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return new Response(null, { status: 204 });
}

