export default function formatHours(minutes) {
  const remainingMinutes = minutes % 60;
  const remainingHours = Math.floor(minutes / 60);

  return `${remainingHours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}`
}
