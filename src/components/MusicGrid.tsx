import { Link } from 'react-router-dom'
import PlatformButtons from './PlatformButtons'
import siteConfig from '../content/siteConfig.json'

interface MusicGridProps {
  limit?: number
}

export default function MusicGrid({ limit }: MusicGridProps) {
  let music = siteConfig.music

  if (limit) {
    music = music.slice(0, limit)
  }

  const getTypeLabel = (type: string) => {
    return type.toUpperCase()
  }

  if (music.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p>No releases available at this time.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {music.map((item) => (
        <div
          key={item.id}
          className="group cursor-pointer"
        >
          <Link
            to={`/music#${item.id}`}
            className="block focus-visible-ring"
          >
            <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-gray-900">
              <img
                src={item.artwork}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-black/80 text-white text-xs px-3 py-1 rounded-full">
                  {getTypeLabel(item.type)}
                </span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:opacity-80 transition-opacity">
              {item.title}
            </h3>
            {item.releaseDate && (
              <p className="text-gray-400 text-sm mb-4">
                {new Date(item.releaseDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
          </Link>
          <div className="mt-4">
            <PlatformButtons links={item.links} variant="secondary" />
          </div>
        </div>
      ))}
    </div>
  )
}
