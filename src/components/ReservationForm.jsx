import { useState } from 'react'

export default function ReservationForm({ eventTitle }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

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
      `Reserva confirmada para ${eventTitle}. Hemos enviado la confirmación a ${formData.email}.`
    )

    setFormData({
      name: '',
      email: '',
    })
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
        />

        <FormField
          type="email"
          name="email"
          placeholder="Tu correo"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <button
          type="submit"
          className="w-full rounded-2xl bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-400"
        >
          Reservar lugar
        </button>
      </form>
    </aside>
  )
}

function FormField({ type, name, placeholder, value, onChange, error }) {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-2xl border bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 ${
          error
            ? 'border-rose-400/60 focus:border-rose-400'
            : 'border-white/10 focus:border-indigo-400'
        }`}
      />
      {error && <p className="mt-2 text-sm text-rose-300">{error}</p>}
    </div>
  )
}