export function formatEuro(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000
    const formatted = Number.isInteger(millions) ? millions.toFixed(0) : millions.toFixed(1)
    return `€${formatted}M`
  }
  if (value >= 1_000) {
    const thousands = value / 1_000
    const formatted = Number.isInteger(thousands) ? thousands.toFixed(0) : thousands.toFixed(1)
    return `€${formatted}K`
  }
  return `€${value}`
}
