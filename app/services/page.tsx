import type { Metadata } from 'next';
import Link from 'next/link';
import { getClientData } from '@/lib/client-data';
import ServiceCard from '@/components/ServiceCard';

const clientData = getClientData();

export async function generateMetadata(): Promise<Metadata> {
  const title = `Marketing Services in Adelaide | ${clientData.business.name}`;
  const description = `Comprehensive digital marketing services for Adelaide businesses. SEO, Google Ads, social media, content marketing, and more from ${clientData.business.name}.`;

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
      canonical: '/services',
    },
  };
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#213872] to-[#2a4a8f] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-black mb-6">
              Marketing Services That Drive Growth
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed">
              From SEO to paid advertising, we deliver comprehensive digital marketing solutions designed to fill your pipeline with qualified leads across {clientData.service_areas.join(', ')}.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              Every {clientData.business.niche.toLowerCase()} service we offer is built around measurable results and ROI. We don't just generate traffic — we generate customers for Adelaide businesses ready to grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clientData.services.map((service) => (
              <ServiceCard
                key={service.slug}
                title={service.title}
                slug={service.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-black text-[#1A1A2E] mb-12 text-center">
              Why Adelaide Businesses Choose Our Services
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="bg-[#213872] text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A2E] mb-3">Data-Driven Approach</h3>
                <p className="text-gray-700 leading-relaxed">
                  Every strategy is backed by analytics, market research, and proven performance data. We optimize for conversions, not vanity metrics.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="bg-[#f25f22] text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A2E] mb-3">Local Market Expertise</h3>
                <p className="text-gray-700 leading-relaxed">
                  Deep understanding of the Adelaide market, local search behavior, and what SA customers respond to.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="bg-[#213872] text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A2E] mb-3">ROI-Focused Campaigns</h3>
                <p className="text-gray-700 leading-relaxed">
                  Every dollar spent is tracked and optimized for maximum return. You'll know your cost per lead and revenue per campaign.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="bg-[#f25f22] text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A2E] mb-3">Transparent Reporting</h3>
                <p className="text-gray-700 leading-relaxed">
                  Monthly reports showing exactly what's working, what's not, and how we're improving your results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#213872] to-[#2a4a8f] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            Ready to Grow Your Adelaide Business?
          </h2>
          <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Book a free marketing audit and discover which services will deliver the best ROI for your business.
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
              Request Free Audit
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