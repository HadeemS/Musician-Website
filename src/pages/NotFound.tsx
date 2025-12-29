import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../app/seo'
import { trackPageView } from '../utils/analytics'

export default function NotFound() {
  useSEO({
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
  })

  useEffect(() => {
    trackPageView('/404')
  }, [])

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-white text-black px-8 py-3 font-semibold hover:bg-gray-200 transition-colors focus-visible-ring inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}


