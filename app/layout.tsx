// @ts-nocheck
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getClientData } from '@/lib/client-data';

export async function generateMetadata(): Promise<Metadata> {
  const data = getClientData();
  return {
    metadataBase: new URL(data.website || process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'),
    title: { default: data.seo?.meta_title ?? data.business_name ?? '', template: `%s | ${data.business_name ?? ''}` },
    description: data.seo?.meta_description ?? '',
    openGraph: {
      type: 'website',
      locale: 'en_AU',
      siteName: data.business_name ?? '',
      title: data.seo?.meta_title ?? '',
      description: data.seo?.meta_description ?? '',
    },
    twitter: { card: 'summary_large_image', title: data.seo?.meta_title ?? '', description: data.seo?.meta_description ?? '' },
    icons: data.branding?.favicon_url ? { icon: data.branding.favicon_url } : undefined,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const data = getClientData();
  const siteUrl = data.website || process.env.NEXT_PUBLIC_SITE_URL || '';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.business_name ?? '',
    image: data.branding?.logo_url ?? undefined,
    '@id': siteUrl,
    url: siteUrl,
    telephone: data.phone ?? '',
    email: data.business?.email ?? '',
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.business?.address ?? '',
      addressLocality: data.business?.city ?? '',
      addressRegion: data.business?.state ?? '',
      addressCountry: 'AU',
    },
    areaServed: (data.service_areas ?? []).map((area: string) => ({ '@type': 'City', name: area })),
    ...(data.reviews?.count > 0 ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: data.reviews.rating,
        reviewCount: data.reviews.count,
      },
    } : {}),
  };

  return (
    <html lang="en-AU">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {data.analytics?.google_tag_id && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${data.analytics.google_tag_id}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${data.analytics.google_tag_id}');`,
              }}
            />
          </>
        )}
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
