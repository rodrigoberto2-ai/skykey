"use client";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setSuccess(null);
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Informe o email.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Email inválido.";
    if (!password) newErrors.password = "Informe a senha.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      setSuccess("Login realizado com sucesso.");
      toast.success("Bem-vindo de volta!", { description: "Autenticação concluída." });
      router.push("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Falha ao entrar.";
      setFormError(message);
      toast.error("Não foi possível entrar", { description: message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[100svh] flex items-center justify-center p-6 bg-gradient-to-b from-background to-muted/30 animate-in fade-in duration-300">
      <div className="mx-auto w-full max-w-md animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-500">
      <Card className="shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Acesse sua conta para continuar.</CardDescription>
        </CardHeader>
        <CardContent>
          {formError && (
            <div className="mb-3 rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert" aria-live="assertive">
              {formError}
            </div>
          )}
          {success && (
            <div className="mb-3 rounded-md border border-green-500/20 bg-green-500/10 px-3 py-2 text-sm text-green-700" role="status" aria-live="polite">
              {success}
            </div>
          )}
          <form className="grid gap-4" onSubmit={onSubmit} noValidate>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="voce@email.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-destructive animate-in fade-in duration-200">{errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-2 grid place-items-center text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Ocultar senha" : "Revelar senha"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-xs text-destructive animate-in fade-in duration-200">{errors.password}</p>
              )}
            </div>
            <Button type="submit" className="w-full transition-transform hover:scale-[1.01]" disabled={loading}>
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Entrando...
                </span>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
          <div className="mt-6 text-sm text-center text-muted-foreground">
            Não tem conta? {" "}
            <Link href="/register" className="text-foreground underline-offset-4 hover:underline">
              Registre-se
            </Link>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
