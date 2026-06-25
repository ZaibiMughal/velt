export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  tech: string[];
  tagline: string;
  theme_color: string;
  challenge: string;
  key_points: string[];
  solution: string;
  outcome: {
    metric: string;
    description: string;
  };
  outcomes: { label: string; value: string }[];
  live_url?: string | null;
  app_store_url?: string | null;
  play_store_url?: string | null;
  cover_image?: string | null;
  images?: string[];
}
