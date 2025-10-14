"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGet } from "@/hooks/useFetch";

type Metrics = {
  totalPropriedades: number;
  reservas30: number;
  checkinsHoje: number;
  ocupacao7d: number; // 0..1
};

export default function DashboardPage() {
  const { data, isLoading } = useGet<Metrics>(["metrics", "overview"], "/api/metrics/overview");
  const m = data || { totalPropriedades: 0, reservas30: 0, checkinsHoje: 0, ocupacao7d: 0 };
  const fmtPct = (v: number) => `${Math.round(v * 100)}%`;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-sm text-muted-foreground">Resumo geral das operações</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Reservas (30d)" value={isLoading ? "—" : String(m.reservas30)} sub="Últimos 30 dias" />
        <StatCard title="Ocupação (7d)" value={isLoading ? "—" : fmtPct(m.ocupacao7d)} sub="Média por propriedade" />
        <StatCard title="Propriedades" value={isLoading ? "—" : String(m.totalPropriedades)} sub="Ativas na conta" />
        <StatCard title="Check-ins hoje" value={isLoading ? "—" : String(m.checkinsHoje)} sub="Reservas confirmadas" />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Reservas recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 grid place-items-center text-sm text-muted-foreground">
              Em breve: lista das últimas reservas.
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ocupação por propriedade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 grid place-items-center text-sm text-muted-foreground">
              Em breve: gráfico de ocupação.
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function StatCard({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        {sub ? <p className="text-xs text-muted-foreground mt-1">{sub}</p> : null}
      </CardContent>
    </Card>
  );
}
