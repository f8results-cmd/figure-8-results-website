// @ts-nocheck
import { Metadata } from 'next';
import { getClientData } from '@/lib/client-data';
import ContactForm from '@/components/ContactForm';

export async function generateMetadata(): Promise<Metadata> {
  const data = getClientData();
  const businessName = data.business_name ?? data.business?.name ?? '';
  const city = data.business?.city ?? '';
  const siteUrl = data.website ?? '';
  const phone = data.phone ?? data.business?.phone ?? '';
  const title = `Contact ${businessName} | Get a Free Consultation`;
  const description = `Get in touch with ${businessName}${city ? ` in ${city}` : ''}. Call ${phone} or fill out our contact form. We're here to help.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl ? `${siteUrl}/contact` : undefined,
      siteName: businessName || undefined,
      locale: 'en_AU',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: siteUrl ? { canonical: `${siteUrl}/contact` } : undefined,
  };
}

export default function ContactPage() {
  const data = getClientData();
  const businessName = data.business_name ?? data.business?.name ?? '';
  const phone = data.phone ?? data.business?.phone ?? '';
  const phoneClean = phone.replace(/\s/g, '');
  const email = data.business?.email ?? '';
  const address = data.business?.address ?? '';
  const city = data.business?.city ?? '';
  const state = data.business?.state ?? '';
  const mapsEmbedUrl = data.business?.google_maps_embed_url ?? null;
  const serviceAreas = data.service_areas ?? [];
  const siteUrl = data.website ?? '';

  const locationLine = [address, city, state].filter(Boolean).join(', ');

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessName,
    telephone: phone,
    email: email || undefined,
    url: siteUrl || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address || undefined,
      addressLocality: city || undefined,
      addressRegion: state || undefined,
      addressCountry: 'AU',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl text-white/90 mb-8">
                Ready to grow your business? Get in touch with {businessName} today.
              </p>
              {phone && (
                <a
                  href={`tel:${phoneClean}`}
                  className="inline-flex items-center gap-2 bg-white text-[var(--color-primary)] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call {phone}
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Contact Info + Form */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Contact details */}
              <div className="lg:col-span-1 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                  <div className="space-y-6">
                    {phone && (
                      <div className="flex items-start gap-4">
                        <div className="bg-[var(--color-primary)] p-3 rounded-lg flex-shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Phone</p>
                          <a href={`tel:${phoneClean}`} className="text-[var(--color-primary)] hover:underline text-lg">
                            {phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {email && (
                      <div className="flex items-start gap-4">
                        <div className="bg-[var(--color-primary)] p-3 rounded-lg flex-shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Email</p>
                          <a href={`mailto:${email}`} className="text-[var(--color-primary)] hover:underline break-all">
                            {email}
                          </a>
                        </div>
                      </div>
                    )}

                    {locationLine && (
                      <div className="flex items-start gap-4">
                        <div className="bg-[var(--color-primary)] p-3 rounded-lg flex-shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Location</p>
                          <p className="text-gray-700">{locationLine}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {serviceAreas.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold mb-3">Areas We Serve</h3>
                    <ul className="space-y-1">
                      {serviceAreas.map((area) => (
                        <li key={area} className="text-gray-700 flex items-center gap-2">
                          <svg className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-gray-50 p-8 rounded-xl">
                  <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
                  <p className="text-gray-600 mb-8">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Maps embed */}
        {mapsEmbedUrl && (
          <section className="h-96 w-full">
            <iframe
              src={mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${businessName} location map`}
            />
          </section>
        )}

        {/* CTA */}
        {businessName && (
          <section className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] py-16">
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
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[var(--color-primary)] transition-colors"
                  >
                    Email Us
                  </a>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
