import siteConfig from '../content/siteConfig.json'

export default function TourEmbed() {
  const { tour } = siteConfig

  if (tour.mode === 'bandsintown' && tour.bandsintownWidgetUrl) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <iframe
            src={tour.bandsintownWidgetUrl}
            title="Tour dates"
            className="w-full h-screen min-h-[600px] border-0"
            loading="lazy"
          />
        </div>
      </div>
    )
  }

  // List mode
  const sortedDates = [...tour.dates].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  const upcomingDates = sortedDates.filter((date) => new Date(date.date) >= new Date())
  const pastDates = sortedDates.filter((date) => new Date(date.date) < new Date())

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {upcomingDates.length > 0 && (
          <>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Upcoming Shows</h2>
            <div className="space-y-4 mb-16">
              {upcomingDates.map((date) => (
                <div
                  key={date.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gray-900 rounded-lg border border-gray-800"
                >
                  <div className="mb-4 md:mb-0">
                    <div className="text-sm text-gray-400 mb-1">
                      {new Date(date.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
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
                      className="bg-white text-black px-6 py-3 font-semibold hover:bg-gray-200 transition-colors focus-visible-ring inline-block text-center"
                    >
                      Get Tickets
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {pastDates.length > 0 && (
          <>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Past Shows</h2>
            <div className="space-y-4">
              {pastDates.map((date) => (
                <div
                  key={date.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gray-900/50 rounded-lg border border-gray-800 opacity-60"
                >
                  <div className="mb-4 md:mb-0">
                    <div className="text-sm text-gray-400 mb-1">
                      {new Date(date.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{date.city}</h3>
                    <p className="text-gray-400">{date.venue}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {upcomingDates.length === 0 && pastDates.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-xl mb-4">No tour dates scheduled at this time.</p>
            <p>Check back soon for updates!</p>
          </div>
        )}
      </div>
    </div>
  )
}


