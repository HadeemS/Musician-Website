import { Link } from 'react-router-dom'
import siteConfig from '../content/siteConfig.json'

export default function TourTeaser() {
  const { tour } = siteConfig

  // Get next 3 upcoming dates
  const upcomingDates = tour.mode === 'list'
    ? tour.dates
        .filter((date) => new Date(date.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 3)
    : []

  if (upcomingDates.length === 0) {
    return null
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Tour Dates</h2>
        <div className="space-y-4 mb-8">
          {upcomingDates.map((date) => (
            <div
              key={date.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gray-900 rounded-lg border border-gray-800"
            >
              <div className="mb-4 md:mb-0">
                <div className="text-sm text-gray-400 mb-1">
                  {new Date(date.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
                <h3 className="text-xl font-semibold mb-1">{date.city}</h3>
                <p className="text-gray-400">{date.venue}</p>
              </div>
              {date.ticketUrl && (
                <a
                  href={date.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black px-6 py-3 font-semibold hover:bg-gray-200 transition-colors focus-visible-ring inline-block text-center w-full sm:w-auto"
                >
                  Get Tickets
                </a>
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/tour"
            className="border border-white text-white px-8 py-3 font-semibold hover:bg-white hover:text-black transition-colors focus-visible-ring inline-block"
          >
            View All Dates
          </Link>
        </div>
      </div>
    </section>
  )
}


