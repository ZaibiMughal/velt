/** Site-wide constants. */

/** cal.com booking link. Kept configured even while disabled — see BOOKING_ENABLED. */
export const CAL_URL = 'https://cal.com/zohaib-umar-mjkzgh/15min';

/**
 * Toggle cal.com booking site-wide. When false, every CTA that would open cal.com
 * falls back to the contact form instead.
 *
 * Disabled: working hours (3pm-3am local) don't map cleanly onto cal.com's slot
 * picker for US/Australia visitors, so the calendar was showing awkward times.
 * Flip back to true once availability is sorted out.
 */
export const BOOKING_ENABLED = false;

/** Primary CTA label shown across the site — adapts automatically to BOOKING_ENABLED. */
export const PRIMARY_CTA_LABEL = BOOKING_ENABLED ? 'Book a Call' : 'Claim Your Spot';
