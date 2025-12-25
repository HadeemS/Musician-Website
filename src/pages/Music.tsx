import { useEffect } from 'react'
import { useSEO } from '../app/seo'
import { trackPageView } from '../utils/analytics'
import MusicGrid from '../components/MusicGrid'
import siteConfig from '../content/siteConfig.json'

export default function Music() {
  useSEO({
    title: 'Music',
    description: `Stream ${siteConfig.artist.name}'s latest releases, albums, and singles.`,
  })

  useEffect(() => {
    trackPageView('/music')
  }, [])

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Music</h1>
      <p className="text-gray-400 text-center mb-12">
        Stream and download all releases
      </p>
      <MusicGrid />
    </div>
  )
}

