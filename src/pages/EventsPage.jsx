import { useMemo, useState } from 'react'
import { events } from '../data/events'
import EventCard from '../components/EventCard'

export default function EventsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [status, setStatus] = useState('Todos')
  const [sortBy, setSortBy] = useState('date-asc')

  const categories = ['Todas', ...new Set(events.map((event) => event.category))]
  const statuses = ['Todos', ...new Set(events.map((event) => event.status))]

  const filteredAndSortedEvents = useMemo(() => {
    const filtered = events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.host.toLowerCase().includes(search.toLowerCase())

      const matchesCategory =
        category === 'Todas' || event.category === category

      const matchesStatus =
        status === 'Todos' || event.status === status

      return matchesSearch && matchesCategory && matchesStatus
    })

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'date-asc') {
        return a.date.localeCompare(b.date) || a.time.localeCompare(b.time)
      }

      if (sortBy === 'live-first') {
        const score = (event) => {
          if (event.status === 'En vivo') return 0
          if (event.status === 'Próximo') return 1
          return 2
        }

        return score(a) - score(b) || a.date.localeCompare(b.date)
      }

      if (sortBy === 'free-first') {
        const score = (event) => (event.price === 'Gratis' ? 0 : 1)
        return score(a) - score(b) || a.date.localeCompare(b.date)
      }

      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title)
      }

      return 0
    })

    return sorted
  }, [search, category, status, sortBy])

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-wider text-indigo-300">
          catálogo
        </p>
        <h1 className="text-3xl font-bold text-white">Explora eventos</h1>
        <p className="max-w-2xl text-slate-300">
          Busca experiencias, filtra por categoría y estado, y ordénalas según tu interés.
        </p>
      </div>

      <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 md:grid-cols-[1fr_220px_220px_220px]">
        <input
          type="text"
          placeholder="Buscar por evento o anfitrión..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          onChange={(e) => setStatus(e.target.value)}
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
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
        >
          <option value="date-asc">Más próximos</option>
          <option value="live-first">En vivo primero</option>
          <option value="free-first">Gratis primero</option>
          <option value="title-asc">A-Z</option>
        </select>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">
          {filteredAndSortedEvents.length} resultado
          {filteredAndSortedEvents.length === 1 ? '' : 's'} encontrado
          {filteredAndSortedEvents.length === 1 ? '' : 's'}
        </p>

        <button
          type="button"
          onClick={() => {
            setSearch('')
            setCategory('Todas')
            setStatus('Todos')
            setSortBy('date-asc')
          }}
          className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          Limpiar filtros
        </button>
      </div>

      {filteredAndSortedEvents.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-8 text-center">
          <h2 className="text-xl font-semibold text-white">
            No se encontraron resultados
          </h2>
          <p className="mt-2 text-slate-300">
            Intenta con otra búsqueda o cambia los filtros.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredAndSortedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}