import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { events } from '../data/events'
import EventCard from '../components/EventCard'
import EventFiltersBar from '../components/EventFiltersBar'
import useReservations from '../hooks/useReservations'

export default function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { isReserved } = useReservations()

  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || 'Todas'
  const status = searchParams.get('status') || 'Todos'
  const sortBy = searchParams.get('sort') || 'date-asc'

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

  function updateParams(nextValues) {
    const next = new URLSearchParams(searchParams)

    Object.entries(nextValues).forEach(([key, value]) => {
      if (
        value === '' ||
        value === 'Todas' ||
        value === 'Todos' ||
        value === 'date-asc'
      ) {
        next.delete(key)
      } else {
        next.set(key, value)
      }
    })

    setSearchParams(next)
  }

  function handleClearFilters() {
    setSearchParams({})
  }

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

      <EventFiltersBar
        search={search}
        category={category}
        status={status}
        sortBy={sortBy}
        categories={categories}
        statuses={statuses}
        onSearchChange={(value) => updateParams({ search: value })}
        onCategoryChange={(value) => updateParams({ category: value })}
        onStatusChange={(value) => updateParams({ status: value })}
        onSortChange={(value) => updateParams({ sort: value })}
        onClear={handleClearFilters}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">
          {filteredAndSortedEvents.length} resultado
          {filteredAndSortedEvents.length === 1 ? '' : 's'} encontrado
          {filteredAndSortedEvents.length === 1 ? '' : 's'}
        </p>
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
            <EventCard
              key={event.id}
              event={event}
              isReserved={isReserved(event.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}