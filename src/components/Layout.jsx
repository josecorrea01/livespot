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
    </div>
  )
}