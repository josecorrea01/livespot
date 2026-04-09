export default function DashboardPage() {
  const cards = [
    { label: 'Eventos reservados', value: '4' },
    { label: 'Horas vistas', value: '12h' },
    { label: 'Membresía', value: 'Pro' },
  ]

  const upcoming = [
    'Neon Nights Experience — 10 Abr 2026',
    'Creator Economy Workshop — 12 Abr 2026',
    'Gaming Arena Live Session — 14 Abr 2026',
  ]

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-wider text-indigo-300">
          dashboard
        </p>
        <h1 className="text-3xl font-bold text-white">Tu espacio en LiveSpot</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Consulta tu actividad reciente, revisa tus eventos y mantén organizada tu experiencia dentro de la plataforma.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <p className="text-sm text-slate-400">{card.label}</p>
            <p className="mt-3 text-3xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Próximos eventos</h2>
          <ul className="mt-5 space-y-3">
            {upcoming.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <h2 className="text-xl font-semibold text-white">Actividad</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Último acceso hace 2 horas. Próximo paso recomendado: completar perfil,
            reservar nuevos eventos y revisar historial.
          </p>
        </section>
      </div>
    </div>
  )
}