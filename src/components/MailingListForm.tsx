import { useState } from 'react'
import siteConfig from '../content/siteConfig.json'

export default function MailingListForm() {
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { mailingList } = siteConfig

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    if (mailingList.provider === 'netlify') {
      // Netlify Forms
      const netlifyFormData = new URLSearchParams()
      netlifyFormData.append('form-name', mailingList.netlifyFormName || 'mailing-list')
      netlifyFormData.append('email', email)
      if (country) netlifyFormData.append('country', country)

      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: netlifyFormData.toString(),
        })

        if (response.ok) {
          setStatus('success')
          setEmail('')
          setCountry('')
        } else {
          setStatus('error')
        }
      } catch (error) {
        setStatus('error')
      }
    } else {
      // Mailto fallback
      const subject = encodeURIComponent('Mailing List Signup')
      const body = encodeURIComponent(`Email: ${email}\nCountry: ${country || 'Not provided'}`)
      window.location.href = `mailto:${mailingList.mailtoEmail}?subject=${subject}&body=${body}`
      setStatus('success')
      setEmail('')
      setCountry('')
    }

    setIsSubmitting(false)
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-400 mb-8">
          Get the latest news, releases, and tour dates delivered to your inbox.
        </p>

        <form
          name={mailingList.netlifyFormName || 'mailing-list'}
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Honeypot field for Netlify */}
          <input type="hidden" name="form-name" value={mailingList.netlifyFormName || 'mailing-list'} />
          <input type="hidden" name="bot-field" />

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-500 text-base"
            />
            <select
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white text-base"
            >
              <option value="">Select country (optional)</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              {/* Add more countries as needed */}
            </select>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-black px-6 md:px-8 py-3 font-semibold hover:bg-gray-200 transition-colors focus-visible-ring disabled:opacity-50 disabled:cursor-not-allowed text-base whitespace-nowrap"
            >
              {isSubmitting ? 'Submitting...' : 'Subscribe'}
            </button>
          </div>

          {status === 'success' && (
            <div className="text-green-400 mt-4">
              Thanks for subscribing! Check your email to confirm.
            </div>
          )}

          {status === 'error' && (
            <div className="text-red-400 mt-4">
              Something went wrong. Please try again or contact us directly.
            </div>
          )}

          <p className="text-xs text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </section>
  )
}
