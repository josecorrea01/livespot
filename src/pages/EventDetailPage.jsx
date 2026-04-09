import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { events } from '../data/events'

export default function EventDetailPage() {
  const { id } = useParams()
  const event = events.find((item) => item.id === id)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  if (!event) {
    return (
      <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-8">
        <h1 className="text-2xl font-bold text-white">Evento no encontrado</h1>
        <p className="mt-3 text-slate-300">
          El evento que buscas no existe o no está disponible en este momento.
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

  function handleChange(e) {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }))

    setSuccessMessage('')
  }

  function validateForm() {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Ingresa tu nombre.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Ingresa tu correo.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un correo válido.'
    }

    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setSuccessMessage('')
      return
    }

    setErrors({})
    setSuccessMessage(
      `Reserva confirmada para ${formData.name}. Hemos enviado la confirmación a ${formData.email}.`
    )

    setFormData({
      name: '',
      email: '',
    })
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

        {successMessage && (
          <div className="mt-5 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm leading-6 text-emerald-200">
            {successMessage}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-indigo-400"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-rose-300">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Tu correo"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-indigo-400"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-rose-300">{errors.email}</p>
            )}
          </div>

          <button
            type="submit"
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