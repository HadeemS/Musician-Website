import { useState } from 'react'
import siteConfig from '../content/siteConfig.json'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'booking',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { contact } = siteConfig

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    // Prepare form data for Netlify Forms
    const netlifyFormData = new URLSearchParams()
    netlifyFormData.append('form-name', 'contact')
    netlifyFormData.append('name', formData.name)
    netlifyFormData.append('email', formData.email)
    netlifyFormData.append('inquiryType', formData.inquiryType)
    netlifyFormData.append('message', formData.message)

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: netlifyFormData.toString(),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          inquiryType: 'booking',
          message: '',
        })
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      // Fallback to mailto
      const subject = encodeURIComponent(`${formData.inquiryType} - ${formData.name}`)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nInquiry Type: ${formData.inquiryType}\n\nMessage:\n${formData.message}`
      )
      const email = contact[`${formData.inquiryType}Email` as keyof typeof contact] as string || contact.bookingEmail
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        inquiryType: 'booking',
        message: '',
      })
    }

    setIsSubmitting(false)
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-6"
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="bot-field" />

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-500"
        />
      </div>

      <div>
        <label htmlFor="inquiryType" className="block text-sm font-medium mb-2">
          Inquiry Type *
        </label>
        <select
          id="inquiryType"
          name="inquiryType"
          value={formData.inquiryType}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white"
        >
          <option value="booking">Booking</option>
          <option value="press">Press</option>
          <option value="management">Management</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-500 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-white text-black px-6 md:px-8 py-3 font-semibold hover:bg-gray-200 transition-colors focus-visible-ring disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto text-base"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && (
        <div className="text-green-400">
          Message sent successfully! We'll get back to you soon.
        </div>
      )}

      {status === 'error' && (
        <div className="text-red-400">
          Something went wrong. Please try again or email us directly.
        </div>
      )}
    </form>
  )
}
