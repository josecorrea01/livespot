import { Link } from 'react-router'
import { events } from '../data/events'
import InfoCard from '../components/InfoCard'
import { formatEventDateTime } from '../utils/eventFormatters'

export default function DashboardPage() {
  const liveCount = events.filter((event) => event.status === 'En vivo').length
  const upcomingEvents = events.filter((event) => event.status === 'Próximo')
  const freeEventsCount = events.filter((event) => event.price === 'Gratis').length

  const cards = [
    { label: 'Eventos disponibles', value: String(events.length) },
    { label: 'En vivo ahora', value: String(liveCount) },
    { label: 'Eventos gratuitos', value: String(freeEventsCount) },
  ]

  const nextEvent = upcomingEvents[0] || events[0]

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-wider text-indigo-300">
          dashboard
        </p>
        <h1 className="text-3xl font-bold text-white">Tu espacio en LiveSpot</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Consulta el estado general de la plataforma, revisa próximos eventos
          y accede rápidamente a nuevas experiencias.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <InfoCard
            key={card.label}
            label={card.label}
            value={card.value}
            cardClassName="rounded-3xl border border-white/10 bg-white/5 p-6"
            valueClassName="mt-3 text-3xl font-bold text-white"
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Próximos eventos</h2>

          {upcomingEvents.length === 0 ? (
            <p className="mt-5 text-slate-300">
              No hay eventos próximos disponibles por ahora.
            </p>
          ) : (
            <ul className="mt-5 space-y-3">
              {upcomingEvents.map((event) => (
                <li
                  key={event.id}
                  className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-medium text-white">{event.title}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      {formatEventDateTime(event.date, event.time)} · {event.category}
                    </p>
                  </div>

                  <Link
                    to={`/events/${event.id}`}
                    className="inline-flex rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
                  >
                    Ver detalle
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <h2 className="text-xl font-semibold text-white">Actividad</h2>

          {nextEvent ? (
            <div className="mt-4 space-y-4">
              <p className="text-sm leading-6 text-slate-300">
                Próxima recomendación: revisa los detalles de{' '}
                <span className="font-semibold text-white">{nextEvent.title}</span>{' '}
                y reserva tu acceso directamente desde la plataforma.
              </p>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Siguiente evento sugerido</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {nextEvent.title}
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  {formatEventDateTime(nextEvent.date, nextEvent.time)}
                </p>
              </div>

              <Link
                to={`/events/${nextEvent.id}`}
                className="inline-flex rounded-xl border border-white/15 px-4 py-2 font-semibold text-slate-200 transition hover:bg-white/10"
              >
                Ir al evento
              </Link>
            </div>
          ) : (
            <p className="mt-4 text-slate-300">
              Aún no hay actividad disponible para mostrar.
            </p>
          )}
        </section>
      </div>
    </div>
  )
}