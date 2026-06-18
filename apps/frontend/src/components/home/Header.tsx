function Header() {
  return (
    <header className="flex items-center justify-between border-b border-black bg-white px-4 py-3 sm:px-6">
      <button className="border border-black bg-white px-4 py-1 text-sm font-bold transition-all duration-150 hover:-translate-y-0.5 hover:bg-yellow-400">
        Каталог
      </button>
      
      <div className="flex cursor-pointer items-center gap-2 transition-transform duration-150 hover:scale-105">
        <Target size={28} strokeWidth={2.5} className="text-black" />
        <span className="text-xl font-black uppercase tracking-tight sm:text-2xl">
          Зброя.Онлайн
        </span>
      </div>

      <button className="flex items-center gap-2 border border-black bg-white px-3 py-1 transition-all duration-150 hover:-translate-y-0.5 hover:bg-yellow-400">
        <span className="hidden text-sm font-bold md:inline">Підтримати розробника</span>
        <UserCircle size={24} strokeWidth={2} />
      </button>
    </header>
  );
}