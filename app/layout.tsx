import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "ReUse! — Reutilizar é transformar",
  description:
    "Marketplace de produtos sustentáveis com parceiros e comissão por venda.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.variable} font-sans bg-[#EDEDED] antialiased`}
      >
        {/* Container central simulando a moldura de um smartphone,
           mantendo o app responsivo em telas maiores */}
        <div className="min-h-screen w-full flex justify-center bg-[#EDEDED]">
          <div className="w-full max-w-[430px] min-h-screen bg-brand-cream shadow-2xl relative">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
