import { Link } from 'react-router'
import { events } from '../data/events'
import InfoCard from '../components/InfoCard'
import { formatEventDateTime } from '../utils/eventFormatters'
import { getReservations } from '../utils/reservationStorage'

export default function DashboardPage() {
  const liveCount = events.filter((event) => event.status === 'En vivo').length
  const upcomingEvents = events.filter((event) => event.status === 'Próximo')
  const reservations = getReservations()

  const cards = [
    { label: 'Eventos disponibles', value: String(events.length) },
    { label: 'En vivo ahora', value: String(liveCount) },
    { label: 'Reservas guardadas', value: String(reservations.length) },
  ]

  const latestReservation = reservations[0] || null

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
          <h2 className="text-xl font-semibold text-white">Tus reservas</h2>

          {latestReservation ? (
            <div className="mt-4 space-y-4">
              <p className="text-sm leading-6 text-slate-300">
                Última reserva registrada para{' '}
                <span className="font-semibold text-white">
                  {latestReservation.title}
                </span>
                .
              </p>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Última reserva</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {latestReservation.title}
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  {formatEventDateTime(
                    latestReservation.date,
                    latestReservation.time
                  )}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Reservado por: {latestReservation.email}
                </p>
              </div>

              <Link
                to={`/events/${latestReservation.eventId}`}
                className="inline-flex rounded-xl border border-white/15 px-4 py-2 font-semibold text-slate-200 transition hover:bg-white/10"
              >
                Ver evento reservado
              </Link>
            </div>
          ) : (
            <p className="mt-4 text-slate-300">
              Aún no has reservado eventos. Explora el catálogo y guarda tu primera reserva.
            </p>
          )}
        </section>
      </div>
    </div>
  )
}