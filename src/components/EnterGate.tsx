import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ENTER_GATE_KEY = 'musician-site-entered'
const ENTER_GATE_EXPIRY_HOURS = 24

export default function EnterGate() {
  const [show, setShow] = useState(false)
  const [skipNextTime, setSkipNextTime] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const entered = localStorage.getItem(ENTER_GATE_KEY)
    if (!entered) {
      setShow(true)
    } else {
      const expiry = parseInt(entered, 10)
      const now = Date.now()
      if (now > expiry) {
        setShow(true)
      }
    }
  }, [])

  const handleEnter = () => {
    if (skipNextTime) {
      // Set expiry far in the future (1 year)
      localStorage.setItem(ENTER_GATE_KEY, (Date.now() + 365 * 24 * 60 * 60 * 1000).toString())
    } else {
      // Set expiry to 24 hours from now
      localStorage.setItem(ENTER_GATE_KEY, (Date.now() + ENTER_GATE_EXPIRY_HOURS * 60 * 60 * 1000).toString())
    }
    setShow(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleEnter()
    }
  }

  useEffect(() => {
    if (show && closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label="Enter site"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="text-center px-6 max-w-md"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-8">
              Welcome
            </h1>
            <button
              ref={closeButtonRef}
              onClick={handleEnter}
              className="bg-white text-black px-12 py-4 text-lg font-semibold hover:bg-gray-200 transition-colors focus-visible-ring mb-6"
              aria-label="Enter site"
            >
              ENTER SITE
            </button>
            <label className="flex items-center justify-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={skipNextTime}
                onChange={(e) => setSkipNextTime(e.target.checked)}
                className="w-4 h-4"
              />
              Skip next time
            </label>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


