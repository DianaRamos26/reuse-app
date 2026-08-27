"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Objetivo: disparar a criação do pedido (POST /api/orders), que
// grava um registro em Order + OrderItem via Prisma e calcula a
// comissão do ReUse sobre a venda do parceiro.
export default function ConfirmPurchaseButton({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, paymentMethod: "CREDIT_CARD" }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Não foi possível concluir a compra.");
      }
      setDone(true);
      setTimeout(() => router.push("/home"), 1800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="bg-brand-green-light text-brand-green text-sm font-semibold text-center rounded-2xl py-3.5">
        Compra confirmada! Redirecionando...
      </div>
    );
  }

  return (
    <>
      {error && (
        <p className="text-xs text-red-500 bg-red-50 rounded-xl px-3 py-2 mb-2 text-center">
          {error}
        </p>
      )}
      <button
        onClick={handleConfirm}
        disabled={loading}
        className="btn-primary disabled:opacity-60"
      >
        {loading ? "Processando..." : "Confirmar compra"}
      </button>
    </>
  );
}
