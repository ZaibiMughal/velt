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
 * Returns a signed URL for a private portfolio-assets path.
 * Expires in 1 hour. Returns null if path is falsy or Supabase is unavailable.
 */
export async function getSignedImageUrl(path: string | null | undefined): Promise<string | null> {
  if (!path) return null;
  if (path.startsWith('/')) return path;
  if (!supabase) return null;
  const { data, error } = await supabase.storage
    .from('portfolio-assets')
    .createSignedUrl(path, 3600);
  if (error || !data) return null;
  return data.signedUrl;
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
