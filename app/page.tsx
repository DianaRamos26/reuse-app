import Link from "next/link";
import { Recycle, Heart } from "lucide-react";

// TELA 1 — SPLASH
// Objetivo: apresentar a proposta do ReUse e convidar o usuário
// a fazer parte de um mundo mais sustentável antes do login.
export default function SplashPage() {
  return (
    <main className="h-screen flex flex-col justify-between overflow-hidden relative">
      <div className="status-bar">
        <span>9:41</span>
        <span>●●● 5G 🔋</span>
      </div>

      <div className="flex flex-col items-center text-center px-8 pt-10">
        <div className="w-20 h-20 rounded-full bg-brand-gold-light flex items-center justify-center mb-6">
          <Recycle className="text-brand-gold" size={40} strokeWidth={2.2} />
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight">
          <span className="text-brand-plum">Re</span>
          <span className="text-brand-gold">Use!</span>
        </h1>
        <p className="mt-2 flex items-center gap-1 text-brand-plum/70 text-sm font-medium">
          Reutilizar é transformar.
          <Heart size={14} className="text-brand-pink" fill="currentColor" />
        </p>
      </div>

      {/* Ilustração decorativa das colinas + plantas, remetendo ao mockup original */}
      <div className="relative w-full h-[46%] mt-6">
        <div className="absolute bottom-0 left-0 w-full h-[85%] bg-brand-gold rounded-t-[3rem]" />
        <div className="absolute bottom-0 left-0 w-full h-[55%] bg-brand-gold/70 rounded-t-[4rem]" />
        <svg
          className="absolute bottom-8 left-10"
          width="70"
          height="140"
          viewBox="0 0 70 140"
          fill="none"
        >
          <path d="M35 140 V40" stroke="#3D1E2B" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="20" cy="45" rx="18" ry="12" fill="#5FAE7A" transform="rotate(-25 20 45)" />
          <ellipse cx="50" cy="60" rx="16" ry="11" fill="#5FAE7A" transform="rotate(20 50 60)" />
        </svg>
        <svg
          className="absolute bottom-8 right-10"
          width="70"
          height="150"
          viewBox="0 0 70 150"
          fill="none"
        >
          <path d="M35 150 V30" stroke="#3D1E2B" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="18" cy="55" rx="20" ry="13" fill="#EC1E79" transform="rotate(-30 18 55)" />
          <ellipse cx="52" cy="75" rx="18" ry="12" fill="#EC1E79" transform="rotate(25 52 75)" />
          <ellipse cx="35" cy="35" rx="15" ry="10" fill="#F2A93D" />
        </svg>

        <Link
          href="/login"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] btn-primary text-center"
        >
          Começar
        </Link>
      </div>
    </main>
  );
}
