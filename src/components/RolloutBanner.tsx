import { motion, AnimatePresence } from 'framer-motion'
import siteConfig from '../content/siteConfig.json'

export default function RolloutBanner() {
  const { rollout } = siteConfig

  if (!rollout.bannerEnabled || !rollout.bannerText) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white text-black py-3 text-center font-semibold text-sm md:text-base"
      >
        {rollout.bannerText}
      </motion.div>
    </AnimatePresence>
  )
}


