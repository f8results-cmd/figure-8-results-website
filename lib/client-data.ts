import clientDataJson from '../client-data.json';

export interface Business {
  name: string;
  tagline: string | null;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  niche: string;
  years_in_business: number | null;
  license_number: string | null;
  owner_name: string;
  ghl_webhook_url: string | null;
  google_maps_embed_url: string | null;
  google_place_id: string | null;
}

export interface Branding {
  primary_colour: string | null;
  accent_colour: string | null;
  logo_url: string | null;
  favicon_url: string | null;
}

export interface SEO {
  primary_keyword: string;
  meta_title: string;
  meta_description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  title: string;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  body_html?: string;
  faqs?: FAQ[];
}

export interface BlogPost {
  title: string;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  body_html?: string;
  published_at?: string;
  author?: string;
  schema_json?: string;
  date?: string;
  excerpt?: string;
  category?: string;
  read_time?: string;
  related_services?: string[];
}

export interface Pages {
  homepage: {
    hero_headline: string;
    trust_signals: string[];
    service_areas: string[];
  };
  about?: {
    body_html?: string;
  };
}

export interface Reviews {
  count: number;
  rating: number;
  google_place_id: string | null;
}

export interface Analytics {
  google_tag_id: string | null;
}

export interface ClientData {
  business: Business;
  branding: Branding;
  seo: SEO;
  services: Service[];
  service_areas: string[];
  pages: Pages;
  reviews: Reviews;
  analytics: Analytics;
  blog_posts: BlogPost[];
  business_name: string;
  phone: string;
  website: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const raw = clientDataJson as any;

export function getClientData(): ClientData {
  const siteUrl: string =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : '');

  const blog_posts: BlogPost[] = ((raw.blog_posts as BlogPost[]) || []).map(
    (post: BlogPost) => ({
      ...post,
      date: post.published_at || '',
      excerpt: post.meta_description || '',
      category: post.category || 'General',
    })
  );

  return {
    business: raw.business as Business,
    branding: raw.branding as Branding,
    seo: raw.seo as SEO,
    services: (raw.services as Service[]) || [],
    service_areas: (raw.service_areas as string[]) || [],
    pages: raw.pages as Pages,
    reviews: raw.reviews as Reviews,
    analytics: raw.analytics as Analytics,
    blog_posts,
    business_name: (raw.business as Business).name,
    phone: (raw.business as Business).phone,
    website: siteUrl,
  };
}
