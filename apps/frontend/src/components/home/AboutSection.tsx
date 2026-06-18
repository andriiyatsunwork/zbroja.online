import React from 'react';
import { UserCircle } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="mx-auto mb-12 max-w-2xl px-4">
      <h2 className="mb-6 border-b border-black pb-2 text-center text-xl font-black uppercase tracking-tight">
        Про сервіс
      </h2>
      <div className="border border-black bg-white p-6 text-center sm:p-8">
        <p className="mb-6 text-sm font-medium leading-relaxed text-black">
          ЗБРОЯ.ОНЛАЙН — це незалежний агрегатор цін на зброю, набої та тактичне спорядження в Україні. 
          Ми щоденно моніторимо пропозиції з десятків магазинів, щоб ви могли знаходити найкращі ціни, 
          наявність і заощаджувати кошти на підготовці до оборони.
        </p>
        <button className="inline-flex items-center gap-2 border border-black bg-white px-6 py-2 text-sm font-bold transition-all duration-150 hover:-translate-y-0.5 hover:bg-yellow-400">
          Підтримати розробника
          <UserCircle size={18} />
        </button>
      </div>
    </section>
  );
}