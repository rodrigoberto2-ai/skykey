import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-sm text-muted-foreground">Resumo geral das operações</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Reservas (30d)" value="—" sub="+0% vs. período anterior" />
        <StatCard title="Ocupação atual" value="—" sub="Últimos 7 dias" />
        <StatCard title="Receita estimada" value="—" sub="Mês corrente" />
        <StatCard title="Check-ins hoje" value="—" sub="Acompanhe seus hóspedes" />
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
