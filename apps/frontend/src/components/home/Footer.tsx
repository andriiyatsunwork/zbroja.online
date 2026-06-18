import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-black bg-black px-6 py-8 text-white">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="text-sm font-bold tracking-wide">
          © {new Date().getFullYear()} ЗБРОЯ.ОНЛАЙН
        </span>
        <button className="text-sm font-bold text-gray-300 transition-colors hover:text-yellow-400 hover:underline">
          Підтримати розробника
        </button>
      </div>
    </footer>
  );
}