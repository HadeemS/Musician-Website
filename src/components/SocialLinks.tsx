import siteConfig from '../content/siteConfig.json'

interface SocialLinksProps {
  variant?: 'header' | 'footer'
}

const socialConfig = {
  instagram: { label: 'Instagram', icon: '📷' },
  tiktok: { label: 'TikTok', icon: '🎵' },
  youtube: { label: 'YouTube', icon: '▶️' },
  spotify: { label: 'Spotify', icon: '🎵' },
  apple: { label: 'Apple Music', icon: '🍎' },
  soundcloud: { label: 'SoundCloud', icon: '🔊' },
  twitter: { label: 'Twitter', icon: '🐦' },
  facebook: { label: 'Facebook', icon: '👥' },
}

export default function SocialLinks({ variant = 'header' }: SocialLinksProps) {
  const socials = Object.entries(siteConfig.artist.socials).filter(([_, url]) => url)

  if (socials.length === 0) return null

  if (variant === 'footer') {
    return (
      <div className="flex flex-wrap gap-4">
        {socials.map(([key, url]) => {
          const config = socialConfig[key as keyof typeof socialConfig]
          if (!config) return null

          return (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors focus-visible-ring"
              aria-label={config.label}
            >
              <span className="sr-only">{config.label}</span>
              <span className="not-sr-only">{config.icon}</span>
            </a>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex gap-4">
      {socials.map(([key, url]) => {
        const config = socialConfig[key as keyof typeof socialConfig]
        if (!config) return null

        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity focus-visible-ring"
            aria-label={config.label}
          >
            {config.icon}
          </a>
        )
      })}
    </div>
  )
}

