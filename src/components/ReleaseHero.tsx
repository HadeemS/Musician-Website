import { motion } from 'framer-motion'
import PlatformButtons from './PlatformButtons'
import { trackCTAClick } from '../utils/analytics'
import siteConfig from '../content/siteConfig.json'

export default function ReleaseHero() {
  const { rollout, featuredReleases } = siteConfig
  const featuredRelease = featuredReleases[0]

  if (!featuredRelease) return null

  const getPrimaryCTA = () => {
    if (rollout.primaryCtaLabel && rollout.primaryCtaUrl) {
      return {
        label: rollout.primaryCtaLabel,
        url: rollout.primaryCtaUrl,
      }
    }

    // Fallback based on rollout mode
    switch (rollout.mode) {
      case 'presave':
        return {
          label: 'Pre-Save Now',
          url: featuredRelease.primaryCta?.url || '#',
        }
      case 'outnow':
        return {
          label: 'Listen Now',
          url: featuredRelease.platformLinks?.spotify || '#',
        }
      case 'video':
        return {
          label: 'Watch Premiere',
          url: featuredRelease.platformLinks?.youtube || '#',
        }
      default:
        return featuredRelease.primaryCta || { label: 'Listen Now', url: '#' }
    }
  }

  const primaryCTA = getPrimaryCTA()

  const handlePrimaryClick = () => {
    trackCTAClick('primary', primaryCTA.url)
    window.open(primaryCTA.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        {rollout.campaignName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base uppercase tracking-wider text-gray-400 mb-4"
          >
            {rollout.campaignName}
          </motion.div>
        )}

        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          src={featuredRelease.coverImage}
          alt={featuredRelease.title}
          className="w-full max-w-md mx-auto mb-8 shadow-2xl"
        />

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          {featuredRelease.title}
        </motion.h1>

        {featuredRelease.statusLabel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-gray-400 mb-8"
          >
            {featuredRelease.statusLabel}
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={handlePrimaryClick}
          className="bg-white text-black px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-semibold hover:bg-gray-200 transition-colors focus-visible-ring mb-8 w-full sm:w-auto"
        >
          {primaryCTA.label}
        </motion.button>

        {!rollout.disableOldCtas && featuredRelease.platformLinks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <PlatformButtons
              links={featuredRelease.platformLinks}
              variant="secondary"
            />
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}


