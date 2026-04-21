const STORAGE_KEY = 'livespot_reservations'

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

export function saveReservation(reservation) {
  const current = getReservations()

  const next = [
    reservation,
    ...current.filter(
      (item) =>
        !(item.eventId === reservation.eventId && item.email === reservation.email)
    ),
  ]

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

export function removeReservation(eventId, email) {
  const current = getReservations()

  const next = current.filter(
    (item) => !(item.eventId === eventId && item.email === email)
  )

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

export function clearReservations() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
  return []
}