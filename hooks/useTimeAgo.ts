const DATE_UNITS: [string, number][] = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

const getDateDiffs = (timestamp: number) => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondsUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsUnit || unit === 'second') {
      const value = Math.floor(elapsed / secondsUnit)
      return { value, unit }
    }
  }
}

export const useTimeAgo = (createdAt: number) => {
  const { value, unit } = getDateDiffs(createdAt) ?? { value: 0, unit: '' }
  const rtf = new Intl.RelativeTimeFormat('en', { style: 'long' })
  return rtf.format(value, unit as Intl.RelativeTimeFormatUnit)
}
