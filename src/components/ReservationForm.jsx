import { useState } from 'react'
import { saveReservation } from '../utils/reservationStorage'

export default function ReservationForm({ event }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Ingresa al menos 3 caracteres.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Ingresa tu correo.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un correo válido.'
    }

    return newErrors
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setSuccessMessage('')
      return
    }

    setIsSubmitting(true)
    setErrors({})
    setSuccessMessage('')

    try {
      await new Promise((resolve) => setTimeout(resolve, 900))

      saveReservation({
        eventId: event.id,
        title: event.title,
        date: event.date,
        time: event.time,
        status: event.status,
        name: formData.name.trim(),
        email: formData.email.trim(),
        reservedAt: new Date().toISOString(),
      })

      setSuccessMessage(
        `Reserva confirmada para ${event.title}. Hemos enviado la confirmación a ${formData.email}.`
      )

      setFormData({
        name: '',
        email: '',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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
        <FormField
          type="text"
          name="name"
          placeholder="Tu nombre"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          disabled={isSubmitting}
        />

        <FormField
          type="email"
          name="email"
          placeholder="Tu correo"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isSubmitting}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full rounded-2xl px-4 py-3 font-semibold text-white transition ${
            isSubmitting
              ? 'cursor-not-allowed bg-indigo-300/60'
              : 'bg-indigo-500 hover:bg-indigo-400'
          }`}
        >
          {isSubmitting ? 'Procesando reserva...' : 'Reservar lugar'}
        </button>
      </form>
    </aside>
  )
}

function FormField({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  disabled,
}) {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full rounded-2xl border bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-70 ${
          error
            ? 'border-rose-400/60 focus:border-rose-400'
            : 'border-white/10 focus:border-indigo-400'
        }`}
      />
      {error && <p className="mt-2 text-sm text-rose-300">{error}</p>}
    </div>
  )
}