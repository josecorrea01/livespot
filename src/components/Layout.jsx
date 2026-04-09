import { NavLink } from 'react-router'

export default function Layout({ children }) {
  const base =
    'rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/10'
  const navClass = ({ isActive }) =>
    isActive ? `${base} bg-white/15 text-white` : `${base} text-slate-300`

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <NavLink to="/" className="text-xl font-bold tracking-tight text-white">
            LiveSpot
          </NavLink>

          <nav className="flex items-center gap-2">
            <NavLink to="/" className={navClass}>
              Inicio
            </NavLink>
            <NavLink to="/events" className={navClass}>
              Eventos
            </NavLink>
            <NavLink to="/dashboard" className={navClass}>
              Dashboard
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

      <footer className="border-t border-white/10 bg-slate-950/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-slate-200">LiveSpot</p>
            <p>Eventos y experiencias en vivo en una sola plataforma.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <NavLink to="/" className="transition hover:text-white">
              Inicio
            </NavLink>
            <NavLink to="/events" className="transition hover:text-white">
              Eventos
            </NavLink>
            <NavLink to="/dashboard" className="transition hover:text-white">
              Dashboard
            </NavLink>
          </div>

          <p>© 2026 LiveSpot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}