// @ts-nocheck
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getClientData } from '@/lib/client-data';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const data = getClientData();
  return (data.services ?? []).map((service: any) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getClientData();
  const service = (data.services ?? []).find((s: any) => s.slug === params.slug);
  if (!service) return { title: 'Service Not Found' };

  const businessName = data.business_name ?? data.business?.name ?? '';
  const title = service.meta_title || `${service.title} | ${businessName}`;
  const description = service.meta_description || `Professional ${service.title} services from ${businessName}.`;
  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: `/services/${params.slug}` },
  };
}

export default function ServicePage({ params }: Props) {
  const data = getClientData();
  const service = (data.services ?? []).find((s: any) => s.slug === params.slug);
  if (!service) notFound();

  const businessName = data.business_name ?? data.business?.name ?? '';
  const phone = data.phone ?? data.business?.phone ?? '';
  const phoneClean = phone.replace(/\s/g, '');
  const city = data.business?.city ?? '';
  const siteUrl = data.website ?? '';
  const faqs = service.faqs ?? [];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.meta_description || service.title,
    provider: {
      '@type': 'LocalBusiness',
      name: businessName,
      url: siteUrl || undefined,
      telephone: phone || undefined,
    },
    areaServed: city ? { '@type': 'City', name: city } : undefined,
  };

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Link href="/services" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                All Services
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
              {service.meta_description && <p className="text-xl text-white/90">{service.meta_description}</p>}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            {service.body_html ? (
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: service.body_html }} />
            ) : (
              <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                <p>
                  {businessName} provides professional {service.title} services{city ? ` in ${city}` : ''}.
                  Contact us today to learn more about how we can help.
                </p>
              </div>
            )}

            {/* Mid-page CTA */}
            {phone && (
              <div className="my-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-lg p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Need {service.title}?</h3>
                <a
                  href={`tel:${phoneClean}`}
                  className="inline-flex items-center gap-2 bg-white text-[var(--color-primary)] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
                >
                  Call {phone}
                </a>
              </div>
            )}

            {/* FAQs */}
            {faqs.length > 0 && (
              <div className="mt-12">
                <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq: any, i: number) => (
                    <details key={i} className="bg-gray-50 rounded-lg p-6">
                      <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center">
                        {faq.question}
                        <span className="text-[var(--color-primary)] ml-4">+</span>
                      </summary>
                      <p className="mt-4 text-gray-700 leading-relaxed">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Get {service.title} Today</h2>
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
                Request a Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
