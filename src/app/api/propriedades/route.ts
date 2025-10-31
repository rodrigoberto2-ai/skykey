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
  const { data, error } = await supabase
    .from("propriedades")
    .select("*, propriedade_imagens ( id, url, created_at )")
    .order("created_at", { ascending: false });
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
  const descricao = body?.descricao ? String(body.descricao).trim() : null;
  const images: string[] = Array.isArray(body?.images) ? body.images.map((u: unknown) => String(u)) : [];
  if (!nome) return Response.json({ error: "Campo 'nome' é obrigatório." }, { status: 400 });

  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userData?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const ownerId = userData.user.id;

  const { data: created, error } = await supabase
    .from("propriedades")
    .insert([{ nome, endereco, descricao, owner_id: ownerId }])
    .select("*")
    .single();
  if (error) return Response.json({ error: error.message }, { status: 500 });

  if (images.length > 0) {
    const rows = images.filter(Boolean).map((url) => ({ propriedade_id: created.id, url }));
    const { error: imgErr } = await supabase.from("propriedade_imagens").insert(rows);
    if (imgErr) return Response.json({ error: imgErr.message }, { status: 500 });
  }

  // return with images
  const { data: full } = await supabase
    .from("propriedades")
    .select("*, propriedade_imagens ( id, url, created_at )")
    .eq("id", created.id)
    .single();
  return Response.json(full, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const token = getBearer(req);
  const supabase = createServerClientFromBearer(token);
  if (!supabase) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const id = String(body?.id || "");
  if (!id) return Response.json({ error: "Campo 'id' é obrigatório." }, { status: 400 });

  const fields: Record<string, unknown> = {};
  if (typeof body?.nome === "string") fields.nome = body.nome.trim();
  if (typeof body?.endereco !== "undefined") fields.endereco = body.endereco === null ? null : String(body.endereco).trim();
  if (typeof body?.descricao !== "undefined") fields.descricao = body.descricao === null ? null : String(body.descricao).trim();
  // If there are fields to update, update the row; otherwise skip
  if (Object.keys(fields).length > 0) {
    const { error } = await supabase.from("propriedades").update(fields).eq("id", id).select("id").single();
    if (error) return Response.json({ error: error.message }, { status: 500 });
  }

  // replace images if provided
  if (Array.isArray(body?.images)) {
    const newImages: string[] = body.images.map((u: unknown) => String(u)).filter(Boolean);
    // fetch current
    const { data: existing } = await supabase
      .from("propriedade_imagens")
      .select("url")
      .eq("propriedade_id", id);
    const existingUrls = (existing || []).map((r) => r.url);
    const toRemove = existingUrls.filter((u) => !newImages.includes(u));
    if (toRemove.length > 0) {
      const keys = toRemove
        .map((u) => {
          try {
            const idx = u.indexOf("/propriedades/");
            return idx >= 0 ? u.substring(idx + "/propriedades/".length) : null;
          } catch {
            return null;
          }
        })
        .filter((k): k is string => !!k);
      if (keys.length > 0) {
        await supabase.storage.from("propriedades").remove(keys);
      }
    }
    // reset records
    const { error: delErr } = await supabase
      .from("propriedade_imagens")
      .delete()
      .eq("propriedade_id", id);
    if (delErr) return Response.json({ error: delErr.message }, { status: 500 });
    if (newImages.length > 0) {
      const rows = newImages.map((url) => ({ propriedade_id: id, url }));
      const { error: insErr } = await supabase.from("propriedade_imagens").insert(rows);
      if (insErr) return Response.json({ error: insErr.message }, { status: 500 });
    }
  }

  const { data: full } = await supabase
    .from("propriedades")
    .select("*, propriedade_imagens ( id, url, created_at )")
    .eq("id", id)
    .single();
  return Response.json(full);
}

export async function DELETE(req: NextRequest) {
  const token = getBearer(req);
  const supabase = createServerClientFromBearer(token);
  if (!supabase) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "Query param 'id' é obrigatório." }, { status: 400 });

  // remove storage files for this propriedade
  const { data: imgs } = await supabase
    .from("propriedade_imagens")
    .select("url")
    .eq("propriedade_id", id);
  const keys = (imgs || [])
    .map((r) => {
      try {
        const idx = r.url.indexOf("/propriedades/");
        return idx >= 0 ? r.url.substring(idx + "/propriedades/".length) : null;
      } catch {
        return null;
      }
    })
    .filter((k): k is string => !!k);
  if (keys.length > 0) {
    await supabase.storage.from("propriedades").remove(keys);
  }

  const { error } = await supabase.from("propriedades").delete().eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return new Response(null, { status: 204 });
}
