// @ts-nocheck
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getClientData } from '@/lib/client-data';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

const clientData = getClientData();

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://figure8results.com.au'),
  title: clientData.seo.meta_title,
  description: clientData.seo.meta_description,
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: clientData.business.name,
    title: clientData.seo.meta_title,
    description: clientData.seo.meta_description,
  },
  twitter: {
    card: 'summary_large_image',
    title: clientData.seo.meta_title,
    description: clientData.seo.meta_description,
  },
  icons: {
    icon: clientData.branding.favicon_url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: clientData.business.name,
    image: clientData.branding.logo_url,
    '@id': process.env.NEXT_PUBLIC_SITE_URL || 'https://figure8results.com.au',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://figure8results.com.au',
    telephone: clientData.business.phone,
    email: clientData.business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: clientData.business.address,
      addressLocality: clientData.business.city,
      addressRegion: clientData.business.state,
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -34.9285,
      longitude: 138.6007,
    },
    areaServed: clientData.service_areas.map(area => ({
      '@type': 'City',
      name: area,
    })),
    priceRange: '$$',
    aggregateRating: clientData.reviews.count > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: clientData.reviews.rating,
      reviewCount: clientData.reviews.count,
    } : undefined,
  };

  return (
    <html lang="en-AU" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {clientData.analytics.google_tag_id && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${clientData.analytics.google_tag_id}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${clientData.analytics.google_tag_id}');
                `,
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