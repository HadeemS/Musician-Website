// Analytics helper - tracks CTA clicks and page views
// Set VITE_ANALYTICS=true in production to enable

const isAnalyticsEnabled = import.meta.env.VITE_ANALYTICS === 'true'

export function trackEvent(action: string, label?: string, value?: number) {
  if (!isAnalyticsEnabled) return

  // Google Analytics 4 example
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', action, {
      event_label: label,
      value: value,
    })
  }

  // Plausible example
  if (typeof window !== 'undefined' && (window as any).plausible) {
    ;(window as any).plausible(action, { props: { label } })
  }

  // Console log for debugging
  if (import.meta.env.DEV) {
    console.log('Analytics Event:', { action, label, value })
  }
}

export function trackCTAClick(ctaType: string, url: string) {
  trackEvent('cta_click', `${ctaType}: ${url}`)
}

export function trackPageView(path: string) {
  trackEvent('page_view', path)
}
