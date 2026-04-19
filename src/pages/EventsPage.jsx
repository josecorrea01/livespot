import { useMemo, useState } from 'react'
import EventCard from '../components/EventCard'
import { events } from '../data/events'

export default function EventsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')

  const categories = ['Todas', ...new Set(events.map((event) => event.category))]

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.host.toLowerCase().includes(search.toLowerCase())

      const matchesCategory =
        category === 'Todas' || event.category === category

      return matchesSearch && matchesCategory
    })
  }, [search, category])

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-wider text-indigo-300">
          catálogo
        </p>
        <h1 className="text-3xl font-bold text-white">Explora eventos</h1>
        <p className="max-w-2xl text-slate-300">
          Busca experiencias, filtra por categoría y revisa el detalle de cada evento.
        </p>
      </div>

      <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 md:grid-cols-[1fr_220px]">
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
      </div>

      {filteredEvents.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-8 text-center">
          <h2 className="text-xl font-semibold text-white">
            No se encontraron resultados
          </h2>
          <p className="mt-2 text-slate-300">
            Intenta con otra búsqueda o cambia la categoría.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}
