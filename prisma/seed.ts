import { PrismaClient, ProductCondition } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Categorias exibidas na Home
  const categories = await Promise.all(
    [
      { name: "Doação", slug: "doacao", icon: "gift" },
      { name: "Venda", slug: "venda", icon: "tag" },
      { name: "Troca", slug: "troca", icon: "refresh-cw" },
      { name: "Todos", slug: "todos", icon: "layout-grid" },
    ].map((c) =>
      prisma.category.upsert({
        where: { slug: c.slug },
        update: {},
        create: c,
      })
    )
  );

  // Parceiro usado nos exemplos do mockup (cadeira, bicicleta, planta)
  const partner = await prisma.partner.upsert({
    where: { id: "partner-demo" },
    update: {},
    create: {
      id: "partner-demo",
      name: "Parceiro ReUse",
      commissionRate: 0.1,
      verified: true,
    },
  });

  const venda = categories.find((c) => c.slug === "venda")!;
  const doacao = categories.find((c) => c.slug === "doacao")!;

  await prisma.product.createMany({
    data: [
      {
        title: "Cadeira de madeira",
        description:
          "Cadeira de madeira maciça em ótimo estado. Bem conservada e resistente.",
        price: 30,
        condition: ProductCondition.USED_GOOD,
        distanceKm: 1.2,
        imageUrl: "/images/cadeira.svg",
        categoryId: venda.id,
        partnerId: partner.id,
      },
      {
        title: "Bicicleta aro 26",
        description: "Bicicleta aro 26 revisada, pronta para uso.",
        price: 150,
        condition: ProductCondition.USED_GOOD,
        distanceKm: 1.5,
        imageUrl: "/images/bicicleta.svg",
        categoryId: venda.id,
        partnerId: partner.id,
      },
      {
        title: "Vaso de planta",
        description: "Vaso de planta ornamental, ideal para reflorestar sua casa.",
        price: 0,
        condition: ProductCondition.NEW,
        distanceKm: 0.9,
        imageUrl: "/images/planta.svg",
        categoryId: doacao.id,
        partnerId: partner.id,
      },
    ],
    skipDuplicates: true,
  });

  // Usuario demo (login: ana@reuse.app / reuse123)
  const passwordHash = await bcrypt.hash("reuse123", 10);
  await prisma.user.upsert({
    where: { email: "ana@reuse.app" },
    update: {},
    create: {
      name: "Ana",
      email: "ana@reuse.app",
      passwordHash,
      points: 2450,
      level: 3,
      levelLabel: "Guardiã do Planeta",
    },
  });

  console.log("Seed concluído com sucesso.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
