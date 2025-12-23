import { useEffect } from 'react'
import { useSEO } from '../app/seo'
import { trackPageView } from '../utils/analytics'
import ContactForm from '../components/ContactForm'
import siteConfig from '../content/siteConfig.json'

export default function Contact() {
  useSEO({
    title: 'Contact',
    description: `Get in touch with ${siteConfig.artist.name} for bookings, press inquiries, and more.`,
  })

  useEffect(() => {
    trackPageView('/contact')
  }, [])

  const { contact } = siteConfig

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Contact</h1>
        <p className="text-gray-400 text-center mb-12">
          For booking, press, or general inquiries, reach out below.
        </p>

        <ContactForm />

        <div className="mt-16 pt-16 border-t border-gray-900">
          <h2 className="text-2xl font-semibold mb-6">Direct Email</h2>
          <div className="space-y-4">
            {contact.bookingEmail && (
              <div>
                <h3 className="font-semibold mb-2">Booking</h3>
                <a
                  href={`mailto:${contact.bookingEmail}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {contact.bookingEmail}
                </a>
              </div>
            )}
            {contact.pressEmail && (
              <div>
                <h3 className="font-semibold mb-2">Press</h3>
                <a
                  href={`mailto:${contact.pressEmail}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {contact.pressEmail}
                </a>
              </div>
            )}
            {contact.managementEmail && (
              <div>
                <h3 className="font-semibold mb-2">Management</h3>
                <a
                  href={`mailto:${contact.managementEmail}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {contact.managementEmail}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
