import { useMemo } from 'react'
import { Link } from 'react-router'
import { events } from '../data/events'
import InfoCard from '../components/InfoCard'
import { formatEventDateTime } from '../utils/eventFormatters'
import useReservations from '../hooks/useReservations'

function getEventTimestamp(item) {
  return new Date(`${item.date}T${item.time || '00:00'}`).getTime()
}

export default function DashboardPage() {
  const { reservations, remove, clear } = useReservations()

  const liveCount = useMemo(
    () => events.filter((event) => event.status === 'En vivo').length,
    []
  )

  const upcomingEvents = useMemo(
    () =>
      events
        .filter((event) => event.status === 'Próximo')
        .sort((a, b) => getEventTimestamp(a) - getEventTimestamp(b)),
    []
  )

  const recentReservations = useMemo(
    () => reservations.slice(0, 3),
    [reservations]
  )

  const dashboardMetrics = useMemo(() => {
    const sortedReservations = [...reservations].sort(
      (a, b) => getEventTimestamp(a) - getEventTimestamp(b)
    )

    const nextReservation = sortedReservations[0] || null
    const latestReservation = reservations[0] || null

    const reservedEventIds = new Set(
      reservations.map((reservation) => reservation.eventId)
    )

    const reservedEvents = events.filter((event) => reservedEventIds.has(event.id))

    const categoryCount = reservedEvents.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1
      return acc
    }, {})

    const [topCategory, topCategoryCount] =
      Object.entries(categoryCount).sort(([, a], [, b]) => b - a)[0] || []

    return {
      nextReservation,
      latestReservation,
      topCategory,
      topCategoryCount,
    }
  }, [reservations])

  const cards = [
    {
      label: 'Eventos disponibles',
      value: String(events.length),
    },
    {
      label: 'En vivo ahora',
      value: String(liveCount),
    },
    {
      label: 'Reservas guardadas',
      value: String(reservations.length),
    },
    {
      label: 'Próxima reserva',
      value: dashboardMetrics.nextReservation
        ? formatEventDateTime(
            dashboardMetrics.nextReservation.date,
            dashboardMetrics.nextReservation.time
          )
        : 'Sin reservas',
      valueClassName: 'mt-3 text-xl font-bold text-white',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-wider text-indigo-300">
          dashboard
        </p>
        <h1 className="text-3xl font-bold text-white">Tu espacio en LiveSpot</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Consulta el estado general de la plataforma, revisa próximos eventos,
          administra tus reservas y visualiza indicadores simples de actividad.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {cards.map((card) => (
          <InfoCard
            key={card.label}
            label={card.label}
            value={card.value}
            cardClassName="rounded-3xl border border-white/10 bg-white/5 p-6"
            valueClassName={
              card.valueClassName || 'mt-3 text-3xl font-bold text-white'
            }
          />
        ))}
      </div>

      <section className="rounded-3xl border border-white/10 bg-indigo-500/10 p-6">
        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-wider text-indigo-300">
              resumen de actividad
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              Indicadores útiles para el usuario
            </h2>
            <p className="mt-3 text-slate-300">
              Este panel resume información clave de reservas y eventos. En una
              versión full stack, estos datos podrían evolucionar hacia métricas
              reales para usuarios, clientes y equipos internos.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">Última reserva</p>
              <p className="mt-2 font-semibold text-white">
                {dashboardMetrics.latestReservation
                  ? dashboardMetrics.latestReservation.title
                  : 'Sin actividad reciente'}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">Categoría reservada</p>
              <p className="mt-2 font-semibold text-white">
                {dashboardMetrics.topCategory
                  ? `${dashboardMetrics.topCategory} (${dashboardMetrics.topCategoryCount})`
                  : 'Sin datos todavía'}
              </p>
            </div>
          </div>
        </div>
      </section>

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
                      {formatEventDateTime(event.date, event.time)} ·{' '}
                      {event.category}
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-white">Tus reservas</h2>

            {reservations.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Limpiar todas
              </button>
            )}
          </div>

          {recentReservations.length > 0 ? (
            <div className="mt-4 space-y-3">
              {recentReservations.map((reservation) => (
                <div
                  key={reservation.eventId}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-sm text-slate-400">Reserva registrada</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {reservation.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    {formatEventDateTime(reservation.date, reservation.time)}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Reservado por: {reservation.email}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-3">
                    <Link
                      to={`/events/${reservation.eventId}`}
                      className="inline-flex rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                    >
                      Ver evento reservado
                    </Link>

                    <button
                      type="button"
                      onClick={() => remove(reservation.eventId)}
                      className="inline-flex rounded-xl border border-rose-400/20 px-4 py-2 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/10"
                    >
                      Eliminar reserva
                    </button>
                  </div>
                </div>
              ))}

              {reservations.length > 3 && (
                <p className="pt-1 text-xs text-slate-500">
                  Mostrando las 3 reservas más recientes.
                </p>
              )}
            </div>
          ) : (
            <p className="mt-4 text-slate-300">
              Aún no has reservado eventos. Explora el catálogo y guarda tu
              primera reserva.
            </p>
          )}
        </section>
      </div>
    </div>
  )
}