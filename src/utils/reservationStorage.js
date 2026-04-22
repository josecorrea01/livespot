const STORAGE_KEY = 'livespot_reservations'
const RESERVATIONS_CHANGED_EVENT = 'livespot:reservations-changed'

function emitReservationsChanged() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(RESERVATIONS_CHANGED_EVENT))
  }
}

export function getReservations() {
  if (typeof window === 'undefined') return []

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function getReservationByEventId(eventId) {
  return getReservations().find((item) => item.eventId === eventId) || null
}

export function saveReservation(reservation) {
  const current = getReservations()

  const next = [
    reservation,
    ...current.filter((item) => item.eventId !== reservation.eventId),
  ]

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  emitReservationsChanged()
  return next
}

export function removeReservation(eventId) {
  const current = getReservations()

  const next = current.filter((item) => item.eventId !== eventId)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  emitReservationsChanged()
  return next
}

export function clearReservations() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
  emitReservationsChanged()
  return []
}

export { RESERVATIONS_CHANGED_EVENT }