import { Link, useParams } from 'react-router'
import { events } from '../data/events'

export default function EventDetailPage() {
  const { id } = useParams()
  const event = events.find((item) => item.id === id)

  if (!event) {
    return (
      <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-8">
        <h1 className="text-2xl font-bold text-white">Evento no encontrado</h1>
        <p className="mt-3 text-slate-300">
          El evento que buscas no existe o fue removido.
        </p>
        <Link
          to="/events"
          className="mt-5 inline-flex rounded-xl bg-indigo-500 px-4 py-2 font-semibold text-white"
        >
          Volver al catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <img
          src={event.image}
          alt={event.title}
          className="h-80 w-full object-cover"
        />
        <div className="space-y-5 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
              {event.category}
            </span>
            <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs text-indigo-300">
              {event.status}
            </span>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">{event.title}</h1>
            <p className="mt-3 leading-7 text-slate-300">{event.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard label="Fecha" value={event.date} />
            <InfoCard label="Hora" value={event.time} />
            <InfoCard label="Anfitrión" value={event.host} />
            <InfoCard label="Precio" value={event.price} />
          </div>
        </div>
      </section>

      <aside className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h2 className="text-xl font-semibold text-white">Reserva tu acceso</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Completa tus datos para reservar tu acceso al evento.
        </p>

        <form className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Tu nombre"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
          />
          <input
            type="email"
            placeholder="Tu correo"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
          />
          <button
            type="button"
            className="w-full rounded-2xl bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-400"
          >
            Reservar lugar
          </button>
        </form>
      </aside>
    </div>
  )
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 font-medium text-white">{value}</p>
    </div>
  )
}