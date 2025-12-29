import { useEffect } from 'react'
import { useSEO } from '../app/seo'
import { trackPageView } from '../utils/analytics'
import VideoGrid from '../components/VideoGrid'
import siteConfig from '../content/siteConfig.json'

export default function Videos() {
  useSEO({
    title: 'Videos',
    description: `Watch ${siteConfig.artist.name}'s official music videos, live performances, and more.`,
  })

  useEffect(() => {
    trackPageView('/videos')
  }, [])

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Videos</h1>
      <p className="text-gray-400 text-center mb-12">
        Official music videos, live performances, and exclusive content
      </p>
      <VideoGrid />
      <div className="text-center mt-8">
        <a
          href={siteConfig.artist.socials.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-white text-white px-6 md:px-8 py-3 font-semibold hover:bg-white hover:text-black transition-colors focus-visible-ring inline-block text-sm md:text-base"
        >
          Watch More on YouTube
        </a>
      </div>
    </div>
  )
}


