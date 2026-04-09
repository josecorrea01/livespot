import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center">
      <h1 className="text-3xl font-bold text-white">404</h1>
      <p className="mt-3 text-slate-300">La ruta que intentaste abrir no existe.</p>
      <Link
        to="/"
        className="mt-5 inline-flex rounded-xl bg-indigo-500 px-4 py-2 font-semibold text-white"
      >
        Volver al inicio
      </Link>
    </div>
  )
}