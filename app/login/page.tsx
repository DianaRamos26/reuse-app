"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";

// TELA 2 — LOGIN
// Objetivo: login simples e rápido para que o usuário acesse
// todas as funcionalidades do ReUse gratuitamente.
// Envia POST /api/auth/login, que consulta o model User via Prisma.
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("ana@reuse.app");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Não foi possível entrar.");
      }
      router.push("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="status-bar">
        <span>9:41</span>
        <span>●●● 5G 🔋</span>
      </div>

      <div className="flex items-center px-5 pt-2 pb-1">
        <Link href="/" className="p-2 -ml-2 text-brand-plum">
          <ChevronLeft size={22} />
        </Link>
      </div>

      <div className="px-7 pt-6 flex-1">
        <h2 className="text-2xl font-bold text-brand-plum">
          Bem-vinda de volta! 💛
        </h2>
        <p className="text-brand-plum/60 text-sm mt-1 mb-8">
          Entre para continuar transformando o mundo!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-brand-plum/60 ml-1">
              E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              className="mt-1 w-full bg-white border border-brand-plum/10 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-brand-pink"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-brand-plum/60 ml-1">
              Senha
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="w-full bg-white border border-brand-plum/10 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-brand-pink pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-plum/40"
                aria-label="Mostrar senha"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <Link href="/login" className="text-xs font-semibold text-brand-pink">
              Esqueci minha senha
            </Link>
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn-primary mt-2 disabled:opacity-60">
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-brand-plum/10 flex-1" />
          <span className="text-xs text-brand-plum/40">ou</span>
          <div className="h-px bg-brand-plum/10 flex-1" />
        </div>

        <div className="space-y-3">
          <button type="button" className="btn-outline">
            <span className="w-4 h-4 rounded-full bg-[#EA4335]" /> Entrar com Google
          </button>
          <button type="button" className="btn-outline">
            <span className="w-4 h-4 rounded-full bg-[#1877F2]" /> Entrar com Facebook
          </button>
        </div>

        <p className="text-center text-sm text-brand-plum/60 mt-8">
          Não tem conta?{" "}
          <Link href="/login" className="text-brand-pink font-semibold">
            Cadastre-se
          </Link>
        </p>
      </div>
    </main>
  );
}
