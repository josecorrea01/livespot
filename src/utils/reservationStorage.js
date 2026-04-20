const STORAGE_KEY = 'livespot_reservations'

export function getReservations() {
  if (typeof window === 'undefined') return []

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
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