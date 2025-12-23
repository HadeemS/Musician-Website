import { useState } from 'react'
import VideoModal from './VideoModal'
import siteConfig from '../content/siteConfig.json'

interface VideoGridProps {
  featuredOnly?: boolean
  limit?: number
}

export default function VideoGrid({ featuredOnly = false, limit }: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  let videos = featuredOnly
    ? siteConfig.videos.filter((v) => v.featured)
    : siteConfig.videos

  if (limit) {
    videos = videos.slice(0, limit)
  }

  const getThumbnailUrl = (youtubeId: string) => {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p>No videos available at this time.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => setSelectedVideo(video.youtubeId)}
            className="group relative aspect-video overflow-hidden bg-gray-900 rounded-lg focus-visible-ring"
            aria-label={`Watch ${video.title}`}
          >
            <img
              src={getThumbnailUrl(video.youtubeId)}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-black ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white font-semibold text-left">{video.title}</h3>
              {video.date && (
                <p className="text-gray-300 text-sm mt-1">
                  {new Date(video.date).toLocaleDateString()}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedVideo && (
        <VideoModal
          youtubeId={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  )
}
