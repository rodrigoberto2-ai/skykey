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

  const today = new Date();
  const start30 = new Date(today);
  start30.setDate(today.getDate() - 30);
  const start30Str = start30.toISOString().slice(0, 10);
  const todayStr = today.toISOString().slice(0, 10);

  const { count: totalProps } = await supabase.from("propriedades").select("id", { count: "exact", head: true });

  const { count: reservas30 } = await supabase
    .from("reservas")
    .select("id", { count: "exact", head: true })
    .gte("data_inicio", start30Str);

  const { count: checkinsHoje } = await supabase
    .from("reservas")
    .select("id", { count: "exact", head: true })
    .eq("data_inicio", todayStr)
    .eq("status", "confirmada");

  const start7 = new Date(today);
  start7.setDate(today.getDate() - 7);
  const start7Str = start7.toISOString().slice(0, 10);
  const { data: reservas7 } = await supabase
    .from("reservas")
    .select("data_inicio, data_fim, status")
    .gte("data_fim", start7Str);

  let ocupacao = 0;
  if ((totalProps || 0) > 0 && reservas7) {
    const totalCapacidade = (totalProps || 0) * 7;
    let diasReservados = 0;
    for (const r of reservas7 as { data_inicio: string; data_fim: string; status: string }[]) {
      if (r.status !== "confirmada") continue;
      const di = new Date(r.data_inicio);
      const df = new Date(r.data_fim);
      const d = Math.max(0, Math.ceil((df.getTime() - di.getTime()) / (1000 * 60 * 60 * 24)) + 1);
      diasReservados += d;
    }
    ocupacao = totalCapacidade > 0 ? Math.min(1, diasReservados / totalCapacidade) : 0;
  }

  return Response.json({
    totalPropriedades: totalProps || 0,
    reservas30: reservas30 || 0,
    checkinsHoje: checkinsHoje || 0,
    ocupacao7d: ocupacao,
  });
}

