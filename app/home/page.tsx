import Link from "next/link";
import Image from "next/image";
import { Bell, ChevronRight, Gift, Tag, Repeat, Grid2x2, Home as HomeIcon, Search, Plus, MessageCircle, User } from "lucide-react";
import { prisma } from "@/lib/prisma";

// TELA 3 — HOME
// Objetivo: o usuário navega por produtos sustentáveis de parceiros,
// filtra por categoria e acompanha seus pontos de gamificação.
// Lê os models User (pontos), Category e Product (com Partner) via Prisma.
export default async function HomePage() {
  const [user, categories, highlights] = await Promise.all([
    prisma.user.findFirst({ where: { email: "ana@reuse.app" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({
      include: { partner: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
  ]);

  const iconMap: Record<string, JSX.Element> = {
    doacao: <Gift size={20} />,
    venda: <Tag size={20} />,
    troca: <Repeat size={20} />,
    todos: <Grid2x2 size={20} />,
  };

  const progressPct = user ? Math.min(100, (user.points % 3000) / 30) : 0;

  return (
    <main className="min-h-screen pb-24">
      <div className="status-bar">
        <span>9:41</span>
        <span>●●● 5G 🔋</span>
      </div>

      <div className="px-6 pt-2 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-brand-plum">
            Olá, {user?.name ?? "Ana"}! 🌱
          </h1>
          <p className="text-sm text-brand-plum/60">Que bom te ver por aqui!</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-card relative">
          <Bell size={18} className="text-brand-plum" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-brand-pink" />
        </button>
      </div>

      {/* Card de pontos / gamificacao (model User: points, level, levelLabel) */}
      <div className="mx-6 mt-5 card p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-brand-plum/50 flex items-center gap-1">
            Seus pontos <ChevronRight size={12} />
          </p>
          <p className="text-2xl font-extrabold text-brand-pink mt-0.5">
            {user?.points.toLocaleString("pt-BR") ?? "0"}
          </p>
          <p className="text-xs text-brand-plum/60 mt-0.5">
            Nível {user?.level ?? 1} - {user?.levelLabel ?? "Guardiã do Planeta"}
          </p>
          <div className="w-40 h-1.5 bg-brand-gold-light rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-brand-gold rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-[10px] text-brand-pink font-semibold mt-1">
            500 pts para o próximo nível
          </p>
        </div>
      </div>

      {/* Categorias (model Category) */}
      <div className="px-6 mt-6">
        <h3 className="text-sm font-semibold text-brand-plum mb-3">Categorias</h3>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/home?categoria=${cat.slug}`}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-pink-soft text-brand-pink flex items-center justify-center">
                {iconMap[cat.slug] ?? <Tag size={20} />}
              </div>
              <span className="text-[11px] text-brand-plum/70">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Destaques de parceiros (model Product + Partner) */}
      <div className="px-6 mt-7 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-brand-plum">Destaques de parceiros</h3>
        <Link href="/home" className="text-xs font-semibold text-brand-pink">
          Ver todos
        </Link>
      </div>

      <div className="px-6 mt-3 grid grid-cols-2 gap-3">
        {highlights.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="card overflow-hidden"
          >
            <div className="relative w-full h-24 bg-brand-cream-dark">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
            <div className="p-2.5">
              <p className="text-xs font-semibold text-brand-plum leading-tight">
                {product.title}
              </p>
              <p className="text-xs font-bold text-brand-pink mt-1">
                {product.price === 0
                  ? "Grátis"
                  : product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
              </p>
              <p className="text-[10px] text-brand-plum/50 mt-0.5">
                {product.distanceKm} km
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Barra de navegacao inferior */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-brand-plum/5 px-6 py-3 flex items-center justify-between">
        <NavIcon icon={<HomeIcon size={20} />} label="Início" active />
        <NavIcon icon={<Search size={20} />} label="Explorar" />
        <Link
          href="/home"
          className="w-12 h-12 rounded-2xl bg-brand-pink text-white flex items-center justify-center shadow-button -mt-6"
        >
          <Plus size={22} />
        </Link>
        <NavIcon icon={<MessageCircle size={20} />} label="Mensagens" />
        <NavIcon icon={<User size={20} />} label="Perfil" />
      </nav>
    </main>
  );
}

function NavIcon({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-0.5 ${
        active ? "text-brand-pink" : "text-brand-plum/40"
      }`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </div>
  );
}
