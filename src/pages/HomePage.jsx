import { Link } from 'react-router'
import { events } from '../data/events'
import EventCard from '../components/EventCard'
import InfoCard from '../components/InfoCard'
import { formatEventDateTime } from '../utils/eventFormatters'
import useReservations from '../hooks/useReservations'

export default function HomePage() {
  const featured = events.slice(0, 3)
  const { reservations, isReserved } = useReservations()

  const liveCount = events.filter((event) => event.status === 'En vivo').length
  const upcomingEvents = events.filter((event) => event.status === 'Próximo')
  const nextEvent = upcomingEvents[0] || events[0] || null

  return (
    <div className="space-y-14">
      <section className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl lg:grid-cols-2">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-indigo-400/40 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300">
            Eventos y experiencias en vivo
          </span>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Descubre, reserva y gestiona experiencias digitales en una sola plataforma.
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-300 md:text-lg">
              LiveSpot reúne catálogo, reservas y seguimiento en una experiencia simple,
              moderna y pensada para usuarios que quieren explorar eventos en vivo con más claridad.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/events"
              className="rounded-xl bg-indigo-500 px-5 py-3 font-semibold text-white transition hover:bg-indigo-400"
            >
              Ver eventos
            </Link>
            <Link
              to="/dashboard"
              className="rounded-xl border border-white/15 px-5 py-3 font-semibold text-slate-200 transition hover:bg-white/10"
            >
              Ir al dashboard
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoCard
              label="Eventos disponibles"
              value={String(events.length)}
              valueClassName="mt-2 text-2xl font-bold text-white"
            />
            <InfoCard
              label="En vivo ahora"
              value={String(liveCount)}
              valueClassName="mt-2 text-2xl font-bold text-white"
            />
            <InfoCard
              label="Reservas guardadas"
              value={String(reservations.length)}
              valueClassName="mt-2 text-2xl font-bold text-white"
            />
          </div>

          {nextEvent ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
              <p className="text-sm text-slate-400">Próximo evento recomendado</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                {nextEvent.title}
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                {formatEventDateTime(nextEvent.date, nextEvent.time)}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {nextEvent.description}
              </p>

              <Link
                to={`/events/${nextEvent.id}`}
                className="mt-4 inline-flex rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
              >
                Ver detalle
              </Link>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
              <p className="text-sm text-slate-400">Próximo evento recomendado</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Aún no hay eventos disponibles para mostrar.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wider text-indigo-300">
              destacados
            </p>
            <h2 className="text-2xl font-bold text-white">
              Eventos seleccionados
            </h2>
          </div>
          <Link
            to="/events"
            className="text-sm font-medium text-slate-300 hover:text-white"
          >
            Ver todos
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              variant="featured"
              isReserved={isReserved(event.id)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}