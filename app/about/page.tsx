// @ts-nocheck
import type { Metadata } from 'next';
import Link from 'next/link';
import { getClientData } from '@/lib/client-data';

const clientData = getClientData();

export async function generateMetadata(): Promise<Metadata> {
  const title = `About ${clientData.business.name} | Adelaide Marketing Agency`;
  const description = `Learn about ${clientData.business.name}, Adelaide's data-driven marketing agency. Founded by ${clientData.business.owner_name}, we deliver measurable results for SA businesses.`;

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
      canonical: '/about',
    },
  };
}

export default function AboutPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: clientData.business.name,
    image: clientData.branding.logo_url,
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://figure8results.com.au'}/about`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://figure8results.com.au'}/about`,
    telephone: clientData.business.phone,
    email: clientData.business.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: clientData.business.city,
      addressRegion: clientData.business.state,
      addressCountry: 'AU',
    },
    founder: {
      '@type': 'Person',
      name: clientData.business.owner_name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#213872] to-[#2a4a8f] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-black mb-6">
              About {clientData.business.name}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed">
              Adelaide's performance-focused marketing agency, built on data, transparency, and measurable results.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-4xl font-black text-[#1A1A2E] mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  At Figure 8 Results, we believe marketing should be accountable. Too many Adelaide businesses waste thousands on campaigns that look good but deliver nothing. We're here to change that.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Every campaign we run is built around one goal: generating qualified leads and measurable ROI for your business. No fluff, no vanity metrics — just results that impact your bottom line.
                </p>
              </div>
              <div className="bg-[#F8F9FA] p-8 rounded-xl">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#213872] text-white p-3 rounded-lg flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A1A2E] mb-2">Performance First</h3>
                      <p className="text-gray-600">We optimize for conversions and revenue, not clicks and impressions.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-[#f25f22] text-white p-3 rounded-lg flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A1A2E] mb-2">Data-Driven</h3>
                      <p className="text-gray-600">Every decision backed by analytics and real performance data.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-[#213872] text-white p-3 rounded-lg flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A1A2E] mb-2">Transparent</h3>
                      <p className="text-gray-600">Clear reporting, honest communication, no surprises.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Section */}
            <div className="bg-gradient-to-br from-[#F8F9FA] to-white rounded-xl p-8 lg:p-12 border border-gray-200">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3">
                  <div className="bg-[#213872] text-white w-32 h-32 rounded-full flex items-center justify-center mx-auto text-4xl font-black">
                    {clientData.business.owner_name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-3xl font-black text-[#1A1A2E] mb-4">
                    Meet {clientData.business.owner_name}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Founded by {clientData.business.owner_name}, Figure 8 Results was born from frustration with the marketing industry's lack of accountability. After seeing too many Adelaide businesses burned by agencies making big promises and delivering little, we set out to do things differently.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Our approach is simple: transparent reporting, data-driven strategy, and campaigns built to generate actual business results. We work with Adelaide businesses who are ready to grow and want a marketing partner they can trust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-black text-[#1A1A2E] mb-12 text-center">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-[#213872] mb-4">Results Over Activity</h3>
                <p className="text-gray-700 leading-relaxed">
                  We don't measure success by how busy we look. We measure it by the leads, sales, and revenue we generate for your business.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-[#213872] mb-4">Honest Communication</h3>
                <p className="text-gray-700 leading-relaxed">
                  If something isn't working, we tell you. If we see a better opportunity, we pivot. You'll always know where you stand.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-[#213872] mb-4">Local Expertise</h3>
                <p className="text-gray-700 leading-relaxed">
                  We live and work in Adelaide. We understand the local market, your competitors, and what SA customers respond to.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-[#213872] mb-4">Continuous Improvement</h3>
                <p className="text-gray-700 leading-relaxed">
                  Marketing is never "finished." We constantly test, optimize, and refine to improve your results month over month.
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
            Ready to Work Together?
          </h2>
          <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Let's have an honest conversation about your marketing goals and how we can help you achieve them.
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
              Get Your Free Audit
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