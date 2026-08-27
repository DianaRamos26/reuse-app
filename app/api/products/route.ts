import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products?categoria=venda
// Objetivo: alimentar a Tela 3 (Home) com os produtos de parceiros,
// permitindo filtro por categoria.
export async function GET(req: NextRequest) {
  const categoria = req.nextUrl.searchParams.get("categoria");

  const products = await prisma.product.findMany({
    where: categoria && categoria !== "todos" ? { category: { slug: categoria } } : undefined,
    include: { partner: true, category: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}
