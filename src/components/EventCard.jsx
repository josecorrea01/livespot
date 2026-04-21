import { Link } from 'react-router'
import { formatEventDateTime } from '../utils/eventFormatters'

export default function EventCard({
  event,
  variant = 'catalog',
  isReserved = false,
}) {
  const isFeatured = variant === 'featured'

  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <img
        src={event.image}
        alt={event.title}
        className="h-52 w-full object-cover"
      />

      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
            {event.category}
          </span>

          <div className="flex items-center gap-2">
            {isReserved && (
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-300">
                Reservado
              </span>
            )}

            <span className="text-xs text-indigo-300">
              {isFeatured ? event.status : event.price}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white">{event.title}</h3>

        {!isFeatured && (
          <p className="text-sm text-slate-400">
            {formatEventDateTime(event.date, event.time)}
          </p>
        )}

        <p className="text-sm leading-6 text-slate-300">{event.description}</p>

        <Link
          to={`/events/${event.id}`}
          className={
            isFeatured
              ? 'inline-flex rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white'
              : 'inline-flex rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400'
          }
        >
          {isReserved ? 'Ver reserva' : 'Ver detalle'}
        </Link>
      </div>
    </article>
  )
}