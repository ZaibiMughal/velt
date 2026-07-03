/**
 * Ad conversion tracking. All tags are opt-in via env vars, so the site
 * works identically with none of them set. Add real IDs to .env.local
 * (and your hosting provider's env settings) once ad accounts exist:
 *
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID           GA4 property ID, e.g. G-XXXXXXX
 *   NEXT_PUBLIC_GOOGLE_ADS_ID               Google Ads tag ID, e.g. AW-XXXXXXXXX
 *   NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL The label part of a Google Ads
 *                                           conversion action (Tools > Conversions
 *                                           > your action > "See conversion action
 *                                           details" > the string after AW-XXXX/)
 *   NEXT_PUBLIC_META_PIXEL_ID               Meta Pixel ID (Events Manager)
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export type ConversionEvent = 'contact_submit' | 'brief_submit';

/**
 * Fire a lead-conversion event to every configured ad platform at once.
 * Call this the moment a lead is successfully captured (after the API
 * call succeeds), not on button click, so unsuccessful submissions never
 * get counted.
 */
export function trackConversion(event: ConversionEvent): void {
  if (typeof window === 'undefined') return;

  window.gtag?.('event', 'generate_lead', {
    event_category: 'engagement',
    event_label: event,
  });

  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  if (adsId && label) {
    window.gtag?.('event', 'conversion', { send_to: `${adsId}/${label}` });
  }

  window.fbq?.('track', 'Lead', { content_name: event });
}
