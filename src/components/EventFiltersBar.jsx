export default function EventFiltersBar({
  search,
  category,
  status,
  sortBy,
  categories,
  statuses,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onSortChange,
  onClear,
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 md:grid-cols-[1fr_220px_220px_220px]">
        <input
          type="text"
          placeholder="Buscar por evento o anfitrión..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-500"
        />

        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
        >
          {categories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
        >
          {statuses.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
        >
          <option value="date-asc">Más próximos</option>
          <option value="live-first">En vivo primero</option>
          <option value="free-first">Gratis primero</option>
          <option value="title-asc">A-Z</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClear}
          className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  )
}