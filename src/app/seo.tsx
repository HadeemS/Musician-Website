import { useEffect } from 'react'
import siteConfig from '../content/siteConfig.json'

interface SEOProps {
  title?: string
  description?: string
  ogImage?: string
  path?: string
}

export function useSEO({ title, description, ogImage, path = '' }: SEOProps) {
  useEffect(() => {
    const baseUrl = siteConfig.seo.canonicalBaseUrl
    const fullTitle = title ? `${title} | ${siteConfig.artist.name}` : siteConfig.seo.siteTitle
    const fullDescription = description || siteConfig.seo.description
    const fullOgImage = ogImage || siteConfig.seo.ogImage
    const canonicalUrl = `${baseUrl}${path}`

    // Update document title
    document.title = fullTitle

    // Meta description
    updateMetaTag('description', fullDescription)

    // OpenGraph tags
    updateMetaTag('og:title', fullTitle, 'property')
    updateMetaTag('og:description', fullDescription, 'property')
    updateMetaTag('og:image', `${baseUrl}${fullOgImage}`, 'property')
    updateMetaTag('og:url', canonicalUrl, 'property')
    updateMetaTag('og:type', 'website', 'property')

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', fullTitle)
    updateMetaTag('twitter:description', fullDescription)
    updateMetaTag('twitter:image', `${baseUrl}${fullOgImage}`)

    // Theme color
    updateMetaTag('theme-color', siteConfig.seo.themeColor)

    // Canonical URL
    updateCanonicalLink(canonicalUrl)
  }, [title, description, ogImage, path])
}

function updateMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let tag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, name)
    document.head.appendChild(tag)
  }
  tag.content = content
}

function updateCanonicalLink(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = url
}

export function StructuredData() {
  const baseUrl = siteConfig.seo.canonicalBaseUrl
  const featuredRelease = siteConfig.featuredReleases[0]

  const musicGroup = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: siteConfig.artist.name,
    url: baseUrl,
    sameAs: Object.values(siteConfig.artist.socials).filter(Boolean),
  }

  let musicAlbum = null
  if (featuredRelease) {
    musicAlbum = {
      '@context': 'https://schema.org',
      '@type': 'MusicAlbum',
      name: featuredRelease.title,
      datePublished: featuredRelease.releaseDate,
      byArtist: {
        '@type': 'MusicGroup',
        name: siteConfig.artist.name,
      },
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(musicGroup) }}
      />
      {musicAlbum && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(musicAlbum) }}
        />
      )}
    </>
  )
}


