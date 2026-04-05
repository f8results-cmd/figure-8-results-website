// @ts-nocheck
import type { Metadata } from 'next';
import Link from 'next/link';
import { getClientData } from '@/lib/client-data';

export async function generateMetadata(): Promise<Metadata> {
  const data = getClientData();
  const businessName = data.business_name ?? data.business?.name ?? '';
  const city = data.business?.city ?? '';
  const title = `About ${businessName}${city ? ` | ${city}` : ''}`;
  const description = `Learn about ${businessName}${city ? ` in ${city}` : ''}. Local experts committed to quality service.`;
  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: '/about' },
  };
}

export default function AboutPage() {
  const data = getClientData();
  const businessName = data.business_name ?? data.business?.name ?? '';
  const phone = data.phone ?? data.business?.phone ?? '';
  const phoneClean = phone.replace(/\s/g, '');
  const city = data.business?.city ?? '';
  const state = data.business?.state ?? '';
  const ownerName = data.business?.owner_name ?? '';
  const yearsInBusiness = data.business?.years_in_business ?? null;
  const bodyHtml = data.pages?.about?.body_html ?? null;
  const siteUrl = data.website ?? '';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessName,
    url: siteUrl || undefined,
    telephone: phone || undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city || undefined,
      addressRegion: state || undefined,
      addressCountry: 'AU',
    },
    ...(ownerName ? { founder: { '@type': 'Person', name: ownerName } } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About {businessName}</h1>
          {city && <p className="text-xl text-white/90">Proudly serving {city}{state ? `, ${state}` : ''}.</p>}
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {bodyHtml ? (
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          ) : (
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                {businessName} is{city ? ` based in ${city}` : ''} and dedicated to providing outstanding service to our clients{state ? ` across ${state}` : ''}.
              </p>
              {ownerName && (
                <p>
                  Founded by {ownerName}{yearsInBusiness ? ` with over ${yearsInBusiness} years of experience` : ''}, we bring expertise and passion to everything we do.
                </p>
              )}
              <p>
                We're committed to quality, reliability, and results. Contact us today to learn how we can help your business grow.
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-8 mt-16 pt-12 border-t border-gray-200">
            {yearsInBusiness && (
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">{yearsInBusiness}+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            )}
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">100%</div>
              <div className="text-gray-600">Client Focus</div>
            </div>
            {city && (
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">Local</div>
                <div className="text-gray-600">{city} Based</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Work With {businessName}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {phone && (
              <a
                href={`tel:${phoneClean}`}
                className="inline-flex items-center justify-center bg-white text-[var(--color-primary)] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Call {phone}
              </a>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[var(--color-primary)] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
