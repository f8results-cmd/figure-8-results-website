import clientDataJson from '../client-data.json';

export interface Business {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  niche: string;
  years_in_business: number;
  license_number: string | null;
  owner_name: string;
  ghl_webhook_url: string | null;
  google_maps_embed_url: string | null;
  google_place_id: string | null;
}

export interface Branding {
  primary_colour: string;
  accent_colour: string;
  logo_url: string;
  favicon_url: string;
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
}

export interface Pages {
  homepage: {
    hero_headline: string;
    trust_signals: string[];
    service_areas: string[];
    faqs?: FAQ[];
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
  pages: Pages;
  service_areas: string[];
  reviews: Reviews;
  analytics: Analytics;
  blog?: BlogPost[];
}

export function getClientData(): ClientData {
  return clientDataJson as ClientData;
}