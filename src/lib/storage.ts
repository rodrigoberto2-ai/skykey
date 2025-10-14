import type { SupabaseClient } from "@supabase/supabase-js";

export async function uploadPropriedadeImages(
  supabase: SupabaseClient,
  userId: string,
  propriedadeId: string,
  files: File[]
): Promise<string[]> {
  if (files.length === 0) return [];
  const bucket = supabase.storage.from("propriedades");
  const urls: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const ext = f.name.includes(".") ? f.name.split(".").pop() : "jpg";
    const path = `${userId}/${propriedadeId}/${Date.now()}_${i}.${ext}`;
    const { error: upErr } = await bucket.upload(path, f, {
      upsert: true,
      contentType: f.type || "image/*",
    });
    if (upErr) continue;
    const { data: pub } = bucket.getPublicUrl(path);
    if (pub?.publicUrl) urls.push(pub.publicUrl);
  }
  return urls;
}

