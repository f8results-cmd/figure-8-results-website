// @ts-nocheck
import type { Metadata } from 'next';
import Link from 'next/link';
import { getClientData } from '@/lib/client-data';
import ServiceCard from '@/components/ServiceCard';

export async function generateMetadata(): Promise<Metadata> {
  const data = getClientData();
  return {
    title: data.seo?.meta_title ?? data.business_name ?? '',
    description: data.seo?.meta_description ?? '',
    openGraph: { title: data.seo?.meta_title ?? '', description: data.seo?.meta_description ?? '', type: 'website' },
    twitter: { card: 'summary_large_image', title: data.seo?.meta_title ?? '', description: data.seo?.meta_description ?? '' },
    alternates: { canonical: '/' },
  };
}

export default function HomePage() {
  const data = getClientData();
  const businessName = data.business_name ?? data.business?.name ?? '';
  const phone = data.phone ?? data.business?.phone ?? '';
  const phoneClean = phone.replace(/\s/g, '');
  const tagline = data.business?.tagline ?? `Welcome to ${businessName}`;
  const city = data.business?.city ?? '';
  const services = data.services ?? [];
  const serviceAreas = data.service_areas ?? [];
  const faqs = data.pages?.homepage?.faqs ?? [];

  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq: any) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  } : null;

  return (
    <>
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{tagline}</h1>
            {city && (
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Serving {city}{serviceAreas.length > 0 ? ` and ${serviceAreas.slice(0, 3).join(', ')}` : ''}.
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {phone && (
                <a
                  href={`tel:${phoneClean}`}
                  className="inline-flex items-center justify-center gap-2 bg-white text-[var(--color-primary)] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call {phone}
                </a>
              )}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[var(--color-primary)] transition-colors"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      {services.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Professional services{city ? ` in ${city}` : ''} tailored to your needs.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {services.slice(0, 6).map((service: any) => (
                <ServiceCard key={service.slug} title={service.title} slug={service.slug} description={service.meta_description} />
              ))}
            </div>
            {services.length > 6 && (
              <div className="text-center mt-10">
                <Link href="/services" className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-bold hover:opacity-90 transition-opacity">
                  View All Services →
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Trust Signals */}
      {data.pages?.homepage?.trust_signals?.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {data.pages.homepage.trust_signals.map((signal: string, i: number) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-semibold text-gray-800">{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq: any, i: number) => (
                <details key={i} className="bg-gray-50 rounded-lg p-6 group">
                  <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-[var(--color-primary)] ml-4">+</span>
                  </summary>
                  <p className="mt-4 text-gray-700 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contact {businessName} today for a free consultation.
          </p>
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
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
