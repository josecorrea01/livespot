export default function InfoCard({
  label,
  value,
  cardClassName = 'rounded-2xl border border-white/10 bg-white/5 p-4',
  labelClassName = 'text-sm text-slate-400',
  valueClassName = 'mt-2 font-medium text-white',
}) {
  return (
    <div className={cardClassName}>
      <p className={labelClassName}>{label}</p>
      <p className={valueClassName}>{value}</p>
    </div>
  )
}