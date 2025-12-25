import { useEffect } from 'react'
import { useSEO } from '../app/seo'
import { trackPageView } from '../utils/analytics'
import siteConfig from '../content/siteConfig.json'

export default function Privacy() {
  useSEO({
    title: 'Privacy Policy',
    description: `Privacy policy for ${siteConfig.artist.name}'s official website.`,
  })

  useEffect(() => {
    trackPageView('/privacy')
  }, [])

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
            <p>
              This privacy policy explains how {siteConfig.artist.name} ("we", "our", or "us") collects,
              uses, and protects your personal information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Email address (when you subscribe to our mailing list)</li>
              <li>Country (optional, when subscribing to our mailing list)</li>
              <li>Name and message (when you contact us through the contact form)</li>
              <li>Automatically collected information such as IP address, browser type, and device information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Send you updates about new releases, tour dates, and news</li>
              <li>Respond to your inquiries and requests</li>
              <li>Improve our website and user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
            <p>
              We may use third-party services such as:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Netlify Forms (for form submissions)</li>
              <li>Google Analytics or Plausible Analytics (for website analytics)</li>
              <li>Social media platforms (when you interact with our social media content)</li>
            </ul>
            <p className="mt-4">
              These services have their own privacy policies governing the use of your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Unsubscribe from our mailing list at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Cookies</h2>
            <p>
              We may use cookies to improve your experience on our website. You can control cookies
              through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes
              by posting the new policy on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at{' '}
              <a
                href={`mailto:${siteConfig.contact.bookingEmail}`}
                className="text-white hover:underline"
              >
                {siteConfig.contact.bookingEmail}
              </a>
              .
            </p>
          </section>

          <section className="mt-8 text-sm text-gray-400">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </section>
        </div>
      </div>
    </div>
  )
}

