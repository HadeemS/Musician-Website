import { trackCTAClick } from '../utils/analytics'

interface PlatformLinks {
  spotify?: string
  apple?: string
  youtube?: string
  soundcloud?: string
  amazon?: string
  tidal?: string
  youtubeMusic?: string
}

interface PlatformButtonsProps {
  links: PlatformLinks
  variant?: 'primary' | 'secondary'
}

const platformConfig = {
  spotify: { label: 'Spotify', icon: '🎵' },
  apple: { label: 'Apple Music', icon: '🍎' },
  youtube: { label: 'YouTube', icon: '▶️' },
  youtubeMusic: { label: 'YouTube Music', icon: '🎵' },
  soundcloud: { label: 'SoundCloud', icon: '🔊' },
  amazon: { label: 'Amazon Music', icon: '🎶' },
  tidal: { label: 'Tidal', icon: '🌊' },
}

export default function PlatformButtons({ links, variant = 'secondary' }: PlatformButtonsProps) {
  const platforms = Object.entries(links).filter(([_, url]) => url)

  if (platforms.length === 0) return null

  const baseClasses = variant === 'primary'
    ? 'bg-white text-black hover:bg-gray-200'
    : 'border border-white text-white hover:bg-white hover:text-black'

  const handleClick = (platform: string, url: string) => {
    trackCTAClick(platform, url)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {platforms.map(([key, url]) => {
        const config = platformConfig[key as keyof typeof platformConfig]
        if (!config) return null

        return (
          <button
            key={key}
            onClick={() => handleClick(key, url)}
            className={`${baseClasses} px-6 py-3 font-medium transition-colors focus-visible-ring`}
          >
            <span className="mr-2">{config.icon}</span>
            {config.label}
          </button>
        )
      })}
    </div>
  )
}


