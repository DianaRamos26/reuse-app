import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck, CreditCard, ChevronRight, Leaf } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ConfirmPurchaseButton from "@/components/ConfirmPurchaseButton";

const SHIPPING_FEE = 10;

// TELA 5 — COMPRA (Resumo da compra)
// Objetivo: resumo do pedido e conclusão da relação comercial:
// o usuário confirma subtotal + frete + total e a compra é
// processada junto ao parceiro, gerando a comissão do ReUse.
export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: { productId?: string };
}) {
  if (!searchParams.productId) notFound();

  const product = await prisma.product.findUnique({
    where: { id: searchParams.productId },
    include: { partner: true },
  });

  if (!product) notFound();

  const total = product.price + SHIPPING_FEE;

  return (
    <main className="min-h-screen pb-6">
      <div className="status-bar">
        <span>9:41</span>
        <span>●●● 5G 🔋</span>
      </div>

      <div className="px-5 pt-1 flex items-center gap-3">
        <Link
          href={`/product/${product.id}`}
          className="w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center text-brand-plum"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-base font-bold text-brand-plum">Resumo da compra</h1>
      </div>

      <div className="mx-6 mt-5 card p-3 flex items-center gap-3">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-brand-cream-dark shrink-0">
          <Image src={product.imageUrl} alt={product.title} fill sizes="64px" className="object-cover" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-brand-plum">{product.title}</p>
          <p className="text-xs text-brand-plum/50">{product.partner.name}</p>
          <p className="text-sm font-bold text-brand-pink mt-0.5">
            {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        </div>
      </div>

      <div className="mx-6 mt-4 card p-4 space-y-2.5">
        <Row label="Produto" value={product.price} />
        <Row label="Frete" value={SHIPPING_FEE} />
        <div className="h-px bg-brand-plum/10 my-1" />
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-brand-plum">TOTAL</span>
          <span className="text-base font-extrabold text-brand-pink">
            {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </span>
        </div>
      </div>

      <div className="mx-6 mt-4 bg-brand-green-light rounded-2xl p-3.5 flex gap-3 items-start">
        <ShieldCheck size={18} className="text-brand-green mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-brand-plum">
            Compra realizada com parceiro
          </p>
          <p className="text-xs text-brand-plum/60 mt-0.5">
            O pedido será processado pela empresa parceira.
          </p>
        </div>
      </div>

      <button className="mx-6 mt-3 w-[calc(100%-3rem)] card p-4 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm text-brand-plum">
          <CreditCard size={18} className="text-brand-plum/50" />
          <span>
            Forma de pagamento
            <br />
            <span className="font-semibold">Cartão de crédito</span>
          </span>
        </span>
        <ChevronRight size={18} className="text-brand-plum/30" />
      </button>

      <div className="px-6 mt-5">
        <ConfirmPurchaseButton productId={product.id} />
      </div>

      <div className="mx-6 mt-3 flex items-center gap-2 text-xs text-brand-plum/60">
        <Leaf size={14} className="text-brand-green" />
        Obrigado por escolher uma solução mais sustentável! 💚
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-brand-plum/60">{label}</span>
      <span className="text-brand-plum font-medium">
        {value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </span>
    </div>
  );
}
