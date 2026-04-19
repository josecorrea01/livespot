import { Link } from 'react-router'
import EventCard from '../components/EventCard'
import { events } from '../data/events'

export default function HomePage() {
  const featured = events.slice(0, 3)

  return (
    <div className="space-y-14">
      <section className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl lg:grid-cols-2">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-indigo-400/40 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300">
            Eventos y experiencias en vivo
          </span>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Vive y gestiona experiencias digitales en una sola plataforma.
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-300 md:text-lg">
              LiveSpot te permite descubrir, reservar y administrar eventos en vivo
              desde una experiencia simple, moderna y pensada para distintos tipos de usuarios.
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
            <StatCard label="Eventos activos" value="28" />
            <StatCard label="Usuarios registrados" value="1.4K" />
            <StatCard label="Satisfacción" value="96%" />
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
            <p className="text-sm text-slate-400">Próximo gran evento</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Neon Nights Experience
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Descubre eventos destacados, gestiona tus reservas y accede a una experiencia digital fluida en un solo lugar.
            </p>
          </div>
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
          <Link to="/events" className="text-sm font-medium text-slate-300 hover:text-white">
            Ver todos
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((event) => (
            <EventCard key={event.id} event={event} variant="featured" />
          ))}
        </div>
      </section>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  )
}
