// @ts-nocheck
import type { Metadata } from 'next';
import Link from 'next/link';
import { getClientData } from '@/lib/client-data';
import ServiceCard from '@/components/ServiceCard';

export async function generateMetadata(): Promise<Metadata> {
  const data = getClientData();
  const businessName = data.business_name ?? data.business?.name ?? '';
  const city = data.business?.city ?? '';
  const title = `Services${city ? ` in ${city}` : ''} | ${businessName}`;
  const description = `Professional services from ${businessName}${city ? ` in ${city}` : ''}. View our full range of services.`;
  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: '/services' },
  };
}

export default function ServicesPage() {
  const data = getClientData();
  const businessName = data.business_name ?? data.business?.name ?? '';
  const phone = data.phone ?? data.business?.phone ?? '';
  const phoneClean = phone.replace(/\s/g, '');
  const city = data.business?.city ?? '';
  const services = data.services ?? [];
  const serviceAreas = data.service_areas ?? [];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-white/90">
              {businessName} provides professional services{city ? ` in ${city}` : ''}
              {serviceAreas.length > 0 ? ` and surrounding areas including ${serviceAreas.slice(0, 3).join(', ')}` : ''}.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {services.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-8">Our services are coming soon. Contact us to find out how we can help.</p>
              <Link href="/contact" className="inline-block bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Contact Us
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {services.map((service: any) => (
                <ServiceCard
                  key={service.slug}
                  title={service.title}
                  slug={service.slug}
                  description={service.meta_description}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Service Areas */}
      {serviceAreas.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-8">Areas We Serve</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {serviceAreas.map((area: string) => (
                <span key={area} className="bg-white border border-gray-200 px-4 py-2 rounded-full text-gray-700 font-medium shadow-sm">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
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
  );
}
