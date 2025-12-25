import { useEffect } from 'react'
import { useSEO } from '../app/seo'
import { trackPageView } from '../utils/analytics'
import TourEmbed from '../components/TourEmbed'
import siteConfig from '../content/siteConfig.json'

export default function Tour() {
  useSEO({
    title: 'Tour',
    description: `See ${siteConfig.artist.name} live. Find tour dates, tickets, and venue information.`,
  })

  useEffect(() => {
    trackPageView('/tour')
  }, [])

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Tour Dates</h1>
        <p className="text-gray-400">
          See you on the road
        </p>
      </div>
      <TourEmbed />
    </div>
  )
}

