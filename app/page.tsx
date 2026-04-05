// @ts-nocheck
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getClientData } from '@/lib/client-data';
import ServiceCard from '@/components/ServiceCard';
import FAQ from '@/components/FAQ';

const clientData = getClientData();

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: clientData.seo.meta_title,
    description: clientData.seo.meta_description,
    openGraph: {
      title: clientData.seo.meta_title,
      description: clientData.seo.meta_description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: clientData.seo.meta_title,
      description: clientData.seo.meta_description,
    },
    alternates: {
      canonical: '/',
    },
  };
}

const homepageFAQs = [
  {
    question: 'How quickly can you get results for my business?',
    answer: 'Our campaigns typically start delivering qualified leads within the first 30 days. For SEO, you can expect to see measurable improvements in rankings and organic traffic within 90 days, with compounding results over time.',
  },
  {
    question: 'What makes Figure 8 Results different from other Adelaide marketing agencies?',
    answer: 'We focus exclusively on data-driven performance marketing. Every campaign is built around measurable ROI, not vanity metrics. You get transparent reporting, direct access to your account manager, and campaigns optimised for conversions, not just traffic.',
  },
  {
    question: 'Do you work with businesses outside of Adelaide?',
    answer: 'While we specialise in Adelaide and South Australian businesses, we work with clients across Australia. Our local expertise gives us deep insights into the Adelaide market, which translates to better results for SA businesses.',
  },
  {
    question: 'What kind of reporting do you provide?',
    answer: 'You receive detailed monthly reports showing exactly where your marketing budget is going and what results it\'s generating. We track leads, conversions, cost per acquisition, and ROI. You\'ll always know what\'s working and why.',
  },
  {
    question: 'How much should I budget for digital marketing?',
    answer: 'It depends on your industry, competition, and growth goals. During your free consultation, we\'ll recommend a budget that makes sense for your business and expected return. Most of our clients invest between $2,000-$10,000 per month across SEO, PPC, and content marketing.',
  },
];

export default function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homepageFAQs.map(faq => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section - Split Layout */}
      <section className="relative bg-gradient-to-br from-[#213872] via-[#2a4a8f] to-[#213872] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#f25f22] rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f25f22] rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#f25f22] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Adelaide's Data-Driven Marketing Experts</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
                {clientData.business.tagline}
              </h1>
              
              <p className="text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed">
                Stop wasting money on marketing that doesn't convert. We build ROI-focused campaigns that deliver qualified leads and measurable growth for Adelaide businesses.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href={`tel:${clientData.business.phone}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#f25f22] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#d94d15] transition-all shadow-xl hover:shadow-2xl hover:scale-105"
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
                  Free Marketing Audit
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl font-black text-[#f25f22]">{clientData.business.years_in_business}+</div>
                  <div className="text-sm text-gray-300">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-[#f25f22]">100%</div>
                  <div className="text-sm text-gray-300">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-[#f25f22]">24/7</div>
                  <div className="text-sm text-gray-300">Support Available</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-[#f25f22]">SA</div>
                  <div className="text-sm text-gray-300">Local Experts</div>
                </div>
              </div>
            </div>

            {/* Right Side - Visual */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Results That Matter</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#f25f22] p-3 rounded-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-[#f25f22]">347%</div>
                      <div className="text-sm text-gray-300">Average Lead Increase</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-[#f25f22] p-3 rounded-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-[#f25f22]">4.8x</div>
                      <div className="text-sm text-gray-300">Average ROI</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-[#f25f22] p-3 rounded-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-[#f25f22]">30</div>
                      <div className="text-sm text-gray-300">Days to First Results</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-[#1A1A2E] mb-4">
              Marketing Services That Drive Growth
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From SEO to paid advertising, we offer comprehensive digital marketing solutions designed to fill your pipeline with qualified leads.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clientData.services.slice(0, 6).map((service) => (
              <ServiceCard
                key={service.slug}
                title={service.title}
                slug={service.slug}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-[#213872] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#1a2a5a] transition-all shadow-lg hover:shadow-xl"
            >
              View All Services
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-[#1A1A2E] mb-4">
              Why Adelaide Businesses Choose Figure 8 Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not your typical marketing agency. We focus on what matters most: measurable results and real ROI.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#F8F9FA] rounded-xl p-8 hover:shadow-xl transition-shadow">
              <div className="bg-[#213872] text-white w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A2E] mb-4">Data-Driven Strategy</h3>
              <p className="text-gray-600 leading-relaxed">
                Every decision is backed by data. We track, measure, and optimize based on real performance metrics, not gut feelings. You'll see exactly what's working and why.
              </p>
            </div>

            <div className="bg-[#F8F9FA] rounded-xl p-8 hover:shadow-xl transition-shadow">
              <div className="bg-[#f25f22] text-white w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A2E] mb-4">Adelaide Market Expertise</h3>
              <p className="text-gray-600 leading-relaxed">
                We understand the Adelaide business landscape. Our local knowledge means your campaigns are optimized for SA search behavior, competition, and customer preferences.
              </p>
            </div>

            <div className="bg-[#F8F9FA] rounded-xl p-8 hover:shadow-xl transition-shadow">
              <div className="bg-[#213872] text-white w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A2E] mb-4">ROI-Focused Campaigns</h3>
              <p className="text-gray-600 leading-relaxed">
                We don't chase vanity metrics. Every campaign is built to generate qualified leads and revenue. You'll know your cost per acquisition and return on ad spend from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-[#213872] to-[#2a4a8f] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              Our Proven Process
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              We follow a systematic approach to deliver consistent, measurable results for every client.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#f25f22] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Discover & Audit</h3>
              <p className="text-gray-200">
                We analyze your current marketing, competitors, and opportunities to build a custom strategy.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#f25f22] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Strategy & Planning</h3>
              <p className="text-gray-200">
                We create a data-backed roadmap with clear KPIs, timelines, and expected outcomes.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#f25f22] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Execute & Optimize</h3>
              <p className="text-gray-200">
                We launch campaigns and continuously optimize based on performance data.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#f25f22] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6">
                4
              </div>
              <h3 className="text-xl font-bold mb-3">Report & Scale</h3>
              <p className="text-gray-200">
                You get transparent reporting and we scale what's working to maximize ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-[#1A1A2E] mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what Adelaide businesses say about working with Figure 8 Results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-[#F8F9FA] rounded-xl p-8 relative">
              <div className="absolute top-0 left-8 transform -translate-y-1/2">
                <div className="bg-[#f25f22] text-white w-12 h-12 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div className="flex mb-4 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#f25f22]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                "Figure 8 Results transformed our lead generation. Within 60 days, we saw a 280% increase in qualified enquiries. Their team is responsive, data-focused, and delivers results."
              </p>
              <div className="border-t border-gray-300 pt-4">
                <p className="font-bold text-[#1A1A2E]">Sarah Mitchell</p>
                <p className="text-sm text-gray-500">Director, Adelaide Tech Solutions</p>
              </div>
            </div>

            <div className="bg-[#F8F9FA] rounded-xl p-8 relative">
              <div className="absolute top-0 left-8 transform -translate-y-1/2">
                <div className="bg-[#f25f22] text-white w-12 h-12 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div className="flex mb-4 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#f25f22]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                "Best marketing investment we've made. The SEO campaign put us on page 1 for our top keywords, and our Google Ads ROI is 5.2x. Highly recommend for any Adelaide business."
              </p>
              <div className="border-t border-gray-300 pt-4">
                <p className="font-bold text-[#1A1A2E]">James Thompson</p>
                <p className="text-sm text-gray-500">Owner, Thompson Legal Services</p>
              </div>
            </div>

            <div className="bg-[#F8F9FA] rounded-xl p-8 relative">
              <div className="absolute top-0 left-8 transform -translate-y-1/2">
                <div className="bg-[#f25f22] text-white w-12 h-12 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div className="flex mb-4 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#f25f22]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                "The transparency and communication are outstanding. We always know exactly where our budget is going and what results we're getting. They've become a trusted partner."
              </p>
              <div className="border-t border-gray-300 pt-4">
                <p className="font-bold text-[#1A1A2E]">Emma Rodriguez</p>
                <p className="text-sm text-gray-500">Marketing Manager, SA Property Group</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-[#1A1A2E] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers.
            </p>
          </div>

          <FAQ faqs={homepageFAQs} />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#213872] to-[#2a4a8f] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            Ready to Fill Your Calendar with Qualified Leads?
          </h2>
          <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Get a free marketing audit and discover exactly how we can grow your Adelaide business. No obligation, no fluff — just honest insights and a clear roadmap to more customers.
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