// @ts-nocheck
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getClientData } from '@/lib/client-data';
import FAQ from '@/components/FAQ';

const clientData = getClientData();

export async function generateStaticParams() {
  return clientData.services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = clientData.services.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  const title = service.meta_title || service.title;
  const description = service.meta_description || `Professional ${service.title.replace(' | Figure 8 Results', '')} services in ${clientData.business.city}. Contact ${clientData.business.name} for expert ${clientData.business.niche.toLowerCase()} solutions.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/services/${params.slug}`,
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = clientData.services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const displayTitle = service.title.replace(' | Figure 8 Results', '');

  const serviceFAQs = service.faqs || [
    {
      question: `How much does ${displayTitle.toLowerCase()} cost?`,
      answer: `Pricing for ${displayTitle.toLowerCase()} varies based on your specific needs, competition level, and business goals. During your free consultation, we'll provide a detailed quote tailored to your Adelaide business. Most clients invest between $2,000-$5,000 per month for comprehensive campaigns.`,
    },
    {
      question: `How long does it take to see results from ${displayTitle.toLowerCase()}?`,
      answer: `For paid advertising services, you can expect qualified leads within 2-4 weeks. SEO and organic strategies typically show measurable improvements within 90 days, with compounding results over time. We provide transparent monthly reporting so you always know what's working.`,
    },
    {
      question: `Why should I choose Figure 8 Results for ${displayTitle.toLowerCase()}?`,
      answer: `We specialize in data-driven, ROI-focused campaigns for Adelaide businesses. Unlike agencies that focus on vanity metrics, we optimize for conversions and revenue. You get transparent reporting, direct access to your account manager, and campaigns built to generate real business results.`,
    },
    {
      question: `Do you offer ${displayTitle.toLowerCase()} for businesses outside Adelaide?`,
      answer: `Yes, while we specialize in Adelaide and South Australian businesses, we work with clients across Australia. Our local expertise in the Adelaide market gives us insights that translate to better results for SA businesses.`,
    },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: displayTitle,
    provider: {
      '@type': 'ProfessionalService',
      name: clientData.business.name,
      telephone: clientData.business.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: clientData.business.city,
        addressRegion: clientData.business.state,
        addressCountry: 'AU',
      },
    },
    areaServed: clientData.service_areas.map(area => ({
      '@type': 'City',
      name: area,
    })),
    description: service.meta_description || `Professional ${displayTitle} services in ${clientData.business.city}`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: serviceFAQs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#213872] to-[#2a4a8f] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link href="/services" className="inline-flex items-center gap-2 text-gray-200 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Services
              </Link>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black mb-6">
              {displayTitle}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed">
              {service.meta_description || `Expert ${displayTitle.toLowerCase()} services for Adelaide businesses. Drive measurable results with ${clientData.business.name}.`}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${clientData.business.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-[#f25f22] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#d94d15] transition-all shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {clientData.business.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#213872] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {service.body_html ? (
              <div 
                className="prose prose-lg max-w-none prose-headings:text-[#1A1A2E] prose-headings:font-black prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#213872] prose-a:font-semibold hover:prose-a:text-[#f25f22] prose-strong:text-[#1A1A2E] prose-ul:text-gray-700 prose-ol:text-gray-700"
                dangerouslySetInnerHTML={{ __html: service.body_html }}
              />
            ) : (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black text-[#1A1A2E] mb-4">
                    Professional {displayTitle} in Adelaide
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    At {clientData.business.name}, we deliver {displayTitle.toLowerCase()} services that drive real business results. Our data-driven approach ensures every campaign is optimized for conversions and ROI, not just traffic.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Whether you're looking to generate more leads, increase sales, or build brand awareness in {clientData.business.city}, our {displayTitle.toLowerCase()} strategies are built around your specific business goals.
                  </p>
                </div>

                <div className="bg-[#F8F9FA] rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-[#1A1A2E] mb-4">What's Included</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#f25f22] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">Comprehensive strategy tailored to your Adelaide business</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#f25f22] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">Data-driven optimization and continuous improvement</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#f25f22] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">Transparent monthly reporting with clear KPIs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#f25f22] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">Dedicated account manager and responsive support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#f25f22] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">ROI-focused campaigns built to generate revenue</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#1A1A2E] mb-4">Why Choose {clientData.business.name}?</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    We understand the Adelaide market. Our {displayTitle.toLowerCase()} strategies are designed specifically for South Australian businesses competing in local search, and we optimize every campaign for the unique behavior of Adelaide customers.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Unlike agencies that focus on vanity metrics, we measure success by the leads and revenue we generate for your business. You'll always know your cost per acquisition, conversion rates, and ROI.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-16 bg-gradient-to-r from-[#213872] to-[#2a4a8f] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-black mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Book your free consultation and discover how {displayTitle.toLowerCase()} can grow your Adelaide business.
          </p>
          <a
            href={`tel:${clientData.business.phone}`}
            className="inline-flex items-center gap-2 bg-[#f25f22] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#d94d15] transition-all shadow-xl hover:shadow-2xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call {clientData.business.phone}
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-black text-[#1A1A2E] mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <FAQ faqs={serviceFAQs} />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-br from-[#213872] to-[#2a4a8f] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            Let's Grow Your Business Together
          </h2>
          <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Contact {clientData.business.name} today for a free consultation and custom quote for {displayTitle.toLowerCase()} in {clientData.business.city}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${clientData.business.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-[#f25f22] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#d94d15] transition-all shadow-xl hover:shadow-2xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call {clientData.business.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#213872] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
            >
              Request Free Quote
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}