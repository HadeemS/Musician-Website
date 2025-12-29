import { useEffect } from 'react'
import { useSEO } from '../app/seo'
import { trackPageView } from '../utils/analytics'
import { trackCTAClick } from '../utils/analytics'
import siteConfig from '../content/siteConfig.json'

export default function Links() {
  useSEO({
    title: 'Links',
    description: `All links to ${siteConfig.artist.name}'s music, social media, and more.`,
  })

  useEffect(() => {
    trackPageView('/links')
  }, [])

  const linkGroups = [
    {
      title: 'Stream Music',
      links: [
        { label: 'Spotify', url: siteConfig.artist.socials.spotify, icon: '🎵' },
        { label: 'Apple Music', url: siteConfig.artist.socials.apple, icon: '🍎' },
        { label: 'YouTube Music', url: siteConfig.artist.socials.youtube, icon: '▶️' },
        { label: 'SoundCloud', url: siteConfig.artist.socials.soundcloud, icon: '🔊' },
      ],
    },
    {
      title: 'Follow',
      links: [
        { label: 'Instagram', url: siteConfig.artist.socials.instagram, icon: '📷' },
        { label: 'TikTok', url: siteConfig.artist.socials.tiktok, icon: '🎵' },
        { label: 'YouTube', url: siteConfig.artist.socials.youtube, icon: '▶️' },
        { label: 'Twitter', url: siteConfig.artist.socials.twitter, icon: '🐦' },
        { label: 'Facebook', url: siteConfig.artist.socials.facebook, icon: '👥' },
      ],
    },
    {
      title: 'More',
      links: [
        { label: 'Official Website', url: siteConfig.seo.canonicalBaseUrl, icon: '🌐' },
        { label: 'Tour Dates', url: '/tour', icon: '🎤' },
        { label: 'Contact', url: '/contact', icon: '📧' },
      ],
    },
  ].map((group) => ({
    ...group,
    links: group.links.filter((link) => link.url),
  }))

  const handleClick = (_label: string, url: string) => {
    trackCTAClick('link', url)
    if (url.startsWith('http') || url.startsWith('//')) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      // Internal link - use React Router navigation
      window.location.href = url
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{siteConfig.artist.name}</h1>
          <p className="text-gray-400">{siteConfig.artist.tagline}</p>
        </div>

        <div className="space-y-8">
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-2xl font-semibold mb-4">{group.title}</h2>
              <div className="space-y-3">
                {group.links.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleClick(link.label, link.url)}
                    className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg p-4 flex items-center justify-between transition-colors focus-visible-ring"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{link.icon}</span>
                      <span className="text-lg font-medium">{link.label}</span>
                    </div>
                    <span className="text-gray-400">→</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
