import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./global.css";
import { Target, UserCircle, Menu } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Zbroja.online | Агрегатор військового спорядження",
  description: "Порівняння цін на зброю, набої та тактичне спорядження від різних магазинів України.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${inter.className} min-h-screen bg-white text-black selection:bg-yellow-400 selection:text-black`}>
        {/* Глобальний Header (суворий flat design) */}
        <header className="flex items-center justify-between border-b border-black bg-white px-4 py-3 sm:px-6">
          
          {/* 1. Ліва частина (фіксована ширина flex-1 для балансу) */}
          <div className="flex flex-1 justify-start">
            <button className="hidden border border-black bg-white px-4 py-1 text-sm font-bold transition-all duration-150 hover:-translate-y-0.5 hover:bg-yellow-400 sm:block">
              Каталог
            </button>
            <button className="block border border-black bg-white p-1 transition-all duration-150 hover:bg-yellow-400 sm:hidden">
              <Menu size={24} />
            </button>
          </div>

          {/* 2. Центр: Логотип (завжди ідеально по центру) */}
          <div className="flex flex-1 justify-center">
            <Link href="/" className="flex items-center gap-2 transition-transform duration-150 hover:scale-105">
              <Target size={28} strokeWidth={2.5} className="text-black" />
              <span className="text-xl font-black uppercase tracking-tight sm:text-2xl">
                ЗБРОЯ<span className="text-yellow-500">.ОНЛАЙН</span>
              </span>
            </Link>
          </div>

          {/* 3. Права частина (фіксована ширина flex-1 для балансу) */}
          <div className="flex flex-1 justify-end">
            <button className="flex items-center gap-2 border border-black bg-white px-3 py-1 transition-all duration-150 hover:-translate-y-0.5 hover:bg-yellow-400">
              <UserCircle size={20} strokeWidth={2.5} />
              <span className="hidden text-sm font-bold md:inline">Підтримати розробника</span>
            </button>
          </div>
          
        </header>

        {children}
      </body>
    </html>
  );
}