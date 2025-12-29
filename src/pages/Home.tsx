import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../app/seo'
import { trackPageView } from '../utils/analytics'
import ReleaseHero from '../components/ReleaseHero'
import VideoGrid from '../components/VideoGrid'
import MusicGrid from '../components/MusicGrid'
import TourTeaser from '../components/TourTeaser'
import MailingListForm from '../components/MailingListForm'
import siteConfig from '../content/siteConfig.json'

export default function Home() {
  useSEO({
    title: '',
    description: siteConfig.seo.description,
  })

  useEffect(() => {
    trackPageView('/')
  }, [])

  return (
    <>
      <ReleaseHero />
      
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">Watch</h2>
        <VideoGrid featuredOnly={true} limit={3} />
        <div className="text-center mt-6 md:mt-8">
          <a
            href={siteConfig.artist.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors underline text-sm md:text-base"
          >
            Watch more on YouTube →
          </a>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">Listen</h2>
        <MusicGrid limit={3} />
        <div className="text-center mt-6 md:mt-8">
          <Link
            to="/music"
            className="border border-white text-white px-6 md:px-8 py-3 font-semibold hover:bg-white hover:text-black transition-colors focus-visible-ring inline-block text-sm md:text-base"
          >
            View All Releases
          </Link>
        </div>
      </section>

      <TourTeaser />

      <MailingListForm />
    </>
  )
}
