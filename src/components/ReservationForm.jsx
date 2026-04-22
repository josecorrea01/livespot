import { useEffect, useState } from 'react'
import useReservations from '../hooks/useReservations'

export default function ReservationForm({ event }) {
  const { getReservation, save } = useReservations()

  const [existingReservation, setExistingReservation] = useState(() =>
    getReservation(event.id)
  )

  const [formData, setFormData] = useState(() => ({
    name: existingReservation?.name || '',
    email: existingReservation?.email || '',
  }))

  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const reservation = getReservation(event.id)
    setExistingReservation(reservation)
    setFormData({
      name: reservation?.name || '',
      email: reservation?.email || '',
    })
  }, [event.id, getReservation])

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

      const savedReservation = {
        eventId: event.id,
        title: event.title,
        date: event.date,
        time: event.time,
        status: event.status,
        name: formData.name.trim(),
        email: formData.email.trim(),
        reservedAt: new Date().toISOString(),
      }

      save(savedReservation)
      setExistingReservation(savedReservation)

      setSuccessMessage(
        existingReservation
          ? `Reserva actualizada para ${event.title}.`
          : `Reserva confirmada para ${event.title}. Hemos enviado la confirmación a ${formData.email}.`
      )

      setFormData({
        name: savedReservation.name,
        email: savedReservation.email,
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
      <p className="mt-2 text-xs leading-5 text-slate-400">
        Los campos marcados son obligatorios. Recibirás la confirmación en el correo ingresado.
      </p>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-slate-400">Evento seleccionado</p>
        <p className="mt-1 font-medium text-white">{event.title}</p>
      </div>

      {existingReservation && (
        <div className="mt-5 rounded-2xl border border-indigo-400/20 bg-indigo-500/10 px-4 py-3 text-sm leading-6 text-indigo-200">
          Ya existe una reserva guardada para este evento en este navegador.
          Puedes actualizar tus datos si lo necesitas.
        </div>
      )}

      {successMessage && (
        <div
          className="mt-5 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm leading-6 text-emerald-200"
          aria-live="polite"
        >
          {successMessage}
        </div>
      )}

      <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
        <FormField
          id="reservation-name"
          label="Nombre"
          type="text"
          name="name"
          placeholder="Ej: José Correa"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          disabled={isSubmitting}
          autoComplete="name"
        />

        <FormField
          id="reservation-email"
          label="Correo electrónico"
          type="email"
          name="email"
          placeholder="tucorreo@ejemplo.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isSubmitting}
          autoComplete="email"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={`w-full rounded-2xl px-4 py-3 font-semibold text-white transition ${
            isSubmitting
              ? 'cursor-not-allowed bg-indigo-300/60'
              : 'bg-indigo-500 hover:bg-indigo-400'
          }`}
        >
          {isSubmitting
            ? 'Procesando reserva...'
            : existingReservation
              ? 'Actualizar reserva'
              : 'Reservar lugar'}
        </button>
      </form>
    </aside>
  )
}

function FormField({
  id,
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  autoComplete,
}) {
  const errorId = `${id}-error`
  const helpId = `${id}-help`

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-slate-200">
        {label}
      </label>

      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : helpId}
        className={`w-full rounded-2xl border bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-70 ${
          error
            ? 'border-rose-400/60 focus:border-rose-400'
            : 'border-white/10 focus:border-indigo-400'
        }`}
      />

      {error ? (
        <p id={errorId} className="text-sm text-rose-300" role="alert">
          {error}
        </p>
      ) : (
        <p id={helpId} className="text-xs text-slate-500">
          {type === 'email'
            ? 'Usa un correo válido para recibir la confirmación.'
            : 'Ingresa tu nombre tal como quieres que aparezca en la reserva.'}
        </p>
      )}
    </div>
  )
}