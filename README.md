# ReUse! — Marketplace de produtos sustentáveis

Projeto acadêmico (Startup One) desenvolvido em **Next.js 14 (App Router)** com
**Prisma ORM** e banco de dados relacional, implementando as 5 telas do
protótipo: Splash, Login, Home, Detalhe do Item e Compra.

## Stack

- **Next.js 14** (App Router, Server Components + API Routes)
- **TypeScript**
- **Tailwind CSS** (paleta customizada replicando o design: rosa, dourado, creme)
- **Prisma ORM** + **PostgreSQL**
- **Zod** (validação), **bcryptjs** (hash de senha), **jsonwebtoken** (sessão)

## Como rodar localmente

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# edite DATABASE_URL com a connection string do seu Postgres (Neon/Supabase/local)

# 3. Criar as tabelas no banco a partir do schema Prisma
npm run db:push

# 4. Popular o banco com dados de exemplo (categorias, parceiro, produtos, usuário demo)
npm run db:seed

# 5. Rodar em desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`. Login de teste: `ana@reuse.app` / `reuse123`.

## Estrutura de telas

| Rota                | Tela                | Objetivo |
|---------------------|----------------------|----------|
| `/`                 | Splash               | Apresentação do ReUse e sua proposta |
| `/login`             | Login                | Acesso gratuito do usuário |
| `/home`              | Home                 | Descoberta de produtos de parceiros por categoria + pontos de gamificação |
| `/product/[id]`      | Detalhe do item      | Informações do produto e do parceiro |
| `/checkout`          | Compra               | Resumo do pedido e conclusão da relação comercial |

## Prisma

O schema completo está em `prisma/schema.prisma`. Os models `User`,
`Category`, `Partner`, `Product`, `Order`, `OrderItem` e
`PointsTransaction` cobrem todas as informações exibidas nas 5 telas
e sustentam o modelo de monetização (comissão do parceiro calculada
em `app/api/orders/route.ts`).

