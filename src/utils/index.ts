/**
 * Converts duration in minutes to a formatted string like Netflix.
 * For example, "125 phút" will be converted to "2h 5m".
 * If the duration is less than 1 hour, it will return only the minutes.
 * For example, "40 phút" will be converted to "40m".
 *
 * @param {string} duration - The duration in the format "X phút".
 * @returns {string} - The formatted duration string.
 */
export function formatDuration(duration: string): string {
  const minutes = parseInt(duration.replace(' phút', ''), 10)
  if (minutes < 60) {
    return `${minutes}m`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}m`
}
