import { unstable_cache } from 'next/cache';
import { supabase } from './supabase';
import type { Database } from './supabase';
import type { CaseStudy } from '@/data/work/index';

type CaseStudyRow   = Database['public']['Tables']['case_studies']['Row'];
type PartnerRow     = Database['public']['Tables']['partners']['Row'];
type TestimonialRow = Database['public']['Tables']['testimonials']['Row'];

export interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  display_order: number;
}

export interface Testimonial {
  id: string;
  case_study_slug: string | null;
  client_name: string;
  client_role: string | null;
  client_company: string | null;
  quote: string;
  avatar_url: string | null;
  video_url: string | null;
  video_thumbnail_url: string | null;
  display_order: number;
}

function rowToCaseStudy(row: CaseStudyRow): CaseStudy {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    tech: row.tech,
    tagline: row.tagline,
    theme_color: row.theme_color ?? '#6366f1',
    challenge: row.challenge,
    key_points: row.key_points ?? [],
    solution: row.solution,
    outcome: {
      metric: row.outcome_metric,
      description: row.outcome_description,
    },
    outcomes: row.outcomes,
    live_url: row.live_url,
    app_store_url: row.app_store_url,
    play_store_url: row.play_store_url,
    cover_image: row.cover_image,
    images: row.images,
  };
}

function rowToPartner(row: PartnerRow): Partner {
  return {
    id: row.id,
    name: row.name,
    logo_url: row.logo_url,
    website_url: row.website_url,
    display_order: row.display_order,
  };
}

function rowToTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    case_study_slug: row.case_study_slug,
    client_name: row.client_name,
    client_role: row.client_role,
    client_company: row.client_company,
    quote: row.quote,
    avatar_url: row.avatar_url,
    video_url: row.video_url,
    video_thumbnail_url: row.video_thumbnail_url,
    display_order: row.display_order,
  };
}

/**
 * Signed URLs carry a unique token, so generating a fresh one on every
 * request means the URL never repeats and neither the browser nor Next's
 * image optimizer can ever cache the image across page loads. Caching the
 * signed URL itself (server-side, keyed by path) keeps the URL stable so
 * repeat requests get cache hits.
 *
 * The token's real expiry (7 days) is deliberately far longer than the
 * revalidate window (1 hour). unstable_cache's revalidate is a minimum
 * staleness age, not a hard refresh guarantee: the actual re-fetch only
 * happens on the next request after the window passes, so under uneven
 * traffic a cached entry can sit stale for much longer than `revalidate`
 * seconds. With a 1-hour token and 50-minute revalidate, any gap in
 * traffic past that margin served an already-expired token and the image
 * just failed to load until something forced a fresh cache miss. A 7-day
 * token makes that impossible regardless of how long revalidation lags.
 */
const getCachedSignedUrl = unstable_cache(
  async (path: string): Promise<string | null> => {
    if (!supabase) return null;
    const { data, error } = await supabase.storage
      .from('portfolio-assets')
      .createSignedUrl(path, 60 * 60 * 24 * 7);
    if (error || !data) return null;
    return data.signedUrl;
  },
  ['portfolio-signed-url'],
  { revalidate: 60 * 60 },
);

/**
 * Returns a signed URL for a private portfolio-assets path.
 * Returns null if path is falsy or Supabase is unavailable.
 */
export async function getSignedImageUrl(path: string | null | undefined): Promise<string | null> {
  if (!path) return null;
  if (path.startsWith('/')) return path;
  return getCachedSignedUrl(path);
}

/**
 * Returns signed URLs for all image paths in a case study.
 * cover_image is index 0; remaining images follow.
 */
export async function getSignedImageUrls(
  cover: string | null | undefined,
  images: string[] = [],
): Promise<string[]> {
  const paths = [cover, ...images].filter((p): p is string => Boolean(p));
  if (paths.length === 0) return [];
  const results = await Promise.all(paths.map(getSignedImageUrl));
  return results.filter((url): url is string => url !== null);
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .order('display_order', { ascending: true });
  if (error || !data) return [];
  return data.map(rowToCaseStudy);
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error || !data) return null;
  return rowToCaseStudy(data);
}

export async function getCaseStudySlugs(): Promise<string[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .order('display_order', { ascending: true });
  if (error || !data) return [];
  return data.map((r) => r.slug);
}

export async function getAllPartners(): Promise<Partner[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .order('display_order', { ascending: true });
  if (error || !data) return [];
  return data.map(rowToPartner);
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('display_order', { ascending: true });
  if (error || !data) return [];
  return data.map(rowToTestimonial);
}

export async function getTestimonialForSlug(slug: string): Promise<Testimonial | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('case_study_slug', slug)
    .single();
  if (error || !data) return null;
  return rowToTestimonial(data);
}
