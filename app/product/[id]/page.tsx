import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Heart, ShieldCheck, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";

const conditionLabel: Record<string, string> = {
  NEW: "Novo",
  USED_LIKE_NEW: "Usado - Como novo",
  USED_GOOD: "Usado - Bom",
  USED_FAIR: "Usado - Regular",
};

// TELA 4 — DETALHE DO ITEM
// Objetivo: o usuário visualiza os detalhes do produto, conhece o
// parceiro responsável pela venda e decide comprar com segurança.
// Busca o Product (com Category e Partner relacionados) via Prisma.
export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { partner: true, category: true },
  });

  if (!product) notFound();

  return (
    <main className="min-h-screen pb-28">
      <div className="status-bar">
        <span>9:41</span>
        <span>●●● 5G 🔋</span>
      </div>

      <div className="px-5 pt-1 flex items-center justify-between">
        <Link
          href="/home"
          className="w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center text-brand-plum"
        >
          <ArrowLeft size={18} />
        </Link>
        <button className="w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center text-brand-plum">
          <Heart size={18} />
        </button>
      </div>

      <div className="relative w-full h-56 mt-3 bg-brand-cream-dark">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="430px"
          className="object-cover"
        />
      </div>

      <div className="px-6 mt-5">
        <h1 className="text-xl font-bold text-brand-plum">{product.title}</h1>
        <p className="text-2xl font-extrabold text-brand-pink mt-1">
          {product.price === 0
            ? "Grátis"
            : product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
        </p>
        {product.distanceKm != null && (
          <p className="text-xs text-brand-plum/50 flex items-center gap-1 mt-1">
            <MapPin size={12} /> {product.distanceKm} km de distância
          </p>
        )}

        {product.partner.verified && (
          <span className="inline-flex items-center gap-1 mt-3 bg-brand-green-light text-brand-green text-xs font-semibold px-3 py-1.5 rounded-full">
            <ShieldCheck size={14} /> Parceiro ReUse
          </span>
        )}

        <p className="text-sm text-brand-plum/70 leading-relaxed mt-4">
          {product.description}
        </p>

        {product.isPartnerSale && (
          <div className="mt-4 bg-brand-pink-soft rounded-2xl p-3.5 flex gap-3 items-start">
            <ShieldCheck size={18} className="text-brand-pink mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-brand-plum">
                Compra com empresa parceira
              </p>
              <p className="text-xs text-brand-plum/60 mt-0.5">
                Este produto é comercializado por uma empresa parceira do
                ReUse ({product.partner.name}).
              </p>
            </div>
          </div>
        )}

        <div className="mt-5">
          <h3 className="text-sm font-semibold text-brand-plum mb-2">
            Informações
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-brand-plum/40 text-xs">Categoria</p>
              <p className="text-brand-plum font-medium">
                {product.category.name}
              </p>
            </div>
            <div>
              <p className="text-brand-plum/40 text-xs">Condição</p>
              <p className="text-brand-plum font-medium">
                {conditionLabel[product.condition]}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-brand-cream px-6 py-4 border-t border-brand-plum/5">
        <Link href={`/checkout?productId=${product.id}`} className="btn-primary block text-center">
          Comprar produto
        </Link>
      </div>
    </main>
  );
}
