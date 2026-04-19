const MONTHS_ES = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
]

export function formatEventDate(dateString) {
  if (!dateString) return ''

  const [year, month, day] = dateString.split('-')
  const monthIndex = Number(month) - 1

  if (!year || monthIndex < 0 || monthIndex > 11 || !day) {
    return dateString
  }

  return `${Number(day)} ${MONTHS_ES[monthIndex]} ${year}`
}

export function formatEventDateTime(dateString, timeString) {
  const formattedDate = formatEventDate(dateString)

  if (!formattedDate) return timeString || ''
  if (!timeString) return formattedDate

  return `${formattedDate} · ${timeString}`
}