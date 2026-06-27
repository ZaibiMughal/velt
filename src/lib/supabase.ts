import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export interface Database {
  public: {
    Tables: {
      case_studies: {
        Relationships: [];
        Row: {
          id: string;
          created_at: string;
          display_order: number;
          slug: string;
          title: string;
          category: string;
          tech: string[];
          tagline: string;
          theme_color: string;
          challenge: string;
          key_points: string[];
          solution: string;
          outcome_metric: string;
          outcome_description: string;
          outcomes: { label: string; value: string }[];
          live_url: string | null;
          app_store_url: string | null;
          play_store_url: string | null;
          cover_image: string | null;
          images: string[];
        };
        Insert: {
          display_order?: number;
          slug: string;
          title: string;
          category: string;
          tech: string[];
          tagline: string;
          theme_color?: string;
          challenge: string;
          key_points?: string[];
          solution: string;
          outcome_metric: string;
          outcome_description: string;
          outcomes: { label: string; value: string }[];
          live_url?: string | null;
          app_store_url?: string | null;
          play_store_url?: string | null;
          cover_image?: string | null;
          images?: string[];
        };
        Update: {
          display_order?: number;
          slug?: string;
          title?: string;
          category?: string;
          tech?: string[];
          tagline?: string;
          theme_color?: string;
          challenge?: string;
          key_points?: string[];
          solution?: string;
          outcome_metric?: string;
          outcome_description?: string;
          outcomes?: { label: string; value: string }[];
          live_url?: string | null;
          app_store_url?: string | null;
          play_store_url?: string | null;
          cover_image?: string | null;
          images?: string[];
        };
      };
      contact_submissions: {
        Relationships: [];
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          company: string | null;
          budget: string;
          project_type: string;
          description: string;
        };
        Insert: {
          name: string;
          email: string;
          company?: string | null;
          budget: string;
          project_type: string;
          description: string;
        };
        Update: {
          name?: string;
          email?: string;
          company?: string | null;
          budget?: string;
          project_type?: string;
          description?: string;
        };
      };
      testimonials: {
        Relationships: [];
        Row: {
          id: string;
          created_at: string;
          case_study_slug: string | null;
          client_name: string;
          client_role: string | null;
          client_company: string | null;
          quote: string;
          avatar_url: string | null;
          video_url: string | null;
          video_thumbnail_url: string | null;
          display_order: number;
        };
        Insert: {
          case_study_slug?: string | null;
          client_name: string;
          client_role?: string | null;
          client_company?: string | null;
          quote: string;
          avatar_url?: string | null;
          video_url?: string | null;
          video_thumbnail_url?: string | null;
          display_order?: number;
        };
        Update: {
          case_study_slug?: string | null;
          client_name?: string;
          client_role?: string | null;
          client_company?: string | null;
          quote?: string;
          avatar_url?: string | null;
          video_url?: string | null;
          video_thumbnail_url?: string | null;
          display_order?: number;
        };
      };
      partners: {
        Relationships: [];
        Row: {
          id: string;
          created_at: string;
          display_order: number;
          name: string;
          logo_url: string | null;
          website_url: string | null;
        };
        Insert: {
          display_order?: number;
          name: string;
          logo_url?: string | null;
          website_url?: string | null;
        };
        Update: {
          display_order?: number;
          name?: string;
          logo_url?: string | null;
          website_url?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type TypedSupabaseClient = SupabaseClient<Database>;

function createSupabaseClient(): TypedSupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient<Database>(url, key, {
    auth: { persistSession: false },
  });
}

export const supabase = createSupabaseClient();
