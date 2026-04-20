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
  const activeFilters = [
    search ? `Búsqueda: "${search}"` : null,
    category !== 'Todas' ? `Categoría: ${category}` : null,
    status !== 'Todos' ? `Estado: ${status}` : null,
    sortBy !== 'date-asc'
      ? `Orden: ${
          sortBy === 'live-first'
            ? 'En vivo primero'
            : sortBy === 'free-first'
              ? 'Gratis primero'
              : sortBy === 'title-asc'
                ? 'A-Z'
                : sortBy
        }`
      : null,
  ].filter(Boolean)

  return (
    <div className="space-y-4">
      <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <label
            htmlFor="event-search"
            className="text-sm font-medium text-slate-300"
          >
            Buscar
          </label>
          <input
            id="event-search"
            type="text"
            placeholder="Evento o anfitrión..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-indigo-400"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="event-category"
            className="text-sm font-medium text-slate-300"
          >
            Categoría
          </label>
          <select
            id="event-category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-indigo-400"
          >
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="event-status"
            className="text-sm font-medium text-slate-300"
          >
            Estado
          </label>
          <select
            id="event-status"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-indigo-400"
          >
            {statuses.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="event-sort"
            className="text-sm font-medium text-slate-300"
          >
            Ordenar por
          </label>
          <select
            id="event-sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-indigo-400"
          >
            <option value="date-asc">Más próximos</option>
            <option value="live-first">En vivo primero</option>
            <option value="free-first">Gratis primero</option>
            <option value="title-asc">A-Z</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {activeFilters.length > 0 ? (
            activeFilters.map((filter) => (
              <span
                key={filter}
                className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200"
              >
                {filter}
              </span>
            ))
          ) : (
            <span className="text-sm text-slate-400">
              No hay filtros activos.
            </span>
          )}
        </div>

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