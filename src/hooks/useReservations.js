import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  RESERVATIONS_CHANGED_EVENT,
  clearReservations,
  getReservations,
  removeReservation,
  saveReservation,
} from '../utils/reservationStorage'

export default function useReservations() {
  const [reservations, setReservations] = useState(() => getReservations())

  const reservedEventIds = useMemo(
    () => new Set(reservations.map((item) => item.eventId)),
    [reservations]
  )

  const refresh = useCallback(() => {
    const next = getReservations()
    setReservations(next)
    return next
  }, [])

  useEffect(() => {
    function handleReservationsChanged() {
      refresh()
    }

    function handleStorage(e) {
      if (e.key === 'livespot_reservations') {
        refresh()
      }
    }

    window.addEventListener(RESERVATIONS_CHANGED_EVENT, handleReservationsChanged)
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener(
        RESERVATIONS_CHANGED_EVENT,
        handleReservationsChanged
      )
      window.removeEventListener('storage', handleStorage)
    }
  }, [refresh])

  const isReserved = useCallback(
    (eventId) => reservedEventIds.has(eventId),
    [reservedEventIds]
  )

  const getReservation = useCallback(
    (eventId) => reservations.find((item) => item.eventId === eventId) || null,
    [reservations]
  )

  const save = useCallback((reservation) => {
    const next = saveReservation(reservation)
    setReservations(next)
    return next
  }, [])

  const remove = useCallback((eventId) => {
    const next = removeReservation(eventId)
    setReservations(next)
    return next
  }, [])

  const clear = useCallback(() => {
    const next = clearReservations()
    setReservations(next)
    return next
  }, [])

  return {
    reservations,
    reservedEventIds,
    isReserved,
    getReservation,
    save,
    remove,
    clear,
    refresh,
  }
}