import { Metadata } from 'next'
import { getClientData } from '@/lib/client-data'
import ContactForm from '@/components/ContactForm'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  const clientData = getClientData()
  const business = clientData.business

  const title = `Contact ${business.name} | ${business.tagline}`
  const description = `Get in touch with ${business.name} in ${business.location.city}. Call ${business.phone} or fill out our contact form for a free marketing consultation. We're here to help your business grow.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${business.website}/contact`,
      siteName: business.name,
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${business.website}/contact`,
    },
  }
}

export default function ContactPage() {
  const clientData = getClientData()
  const business = clientData.business

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#213872] to-[#1a2d5a] text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Let's Talk About Growing Your Business
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Ready to transform your marketing? Get in touch with Adelaide's results-driven marketing agency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`tel:${business.phone}`}
                className="inline-flex items-center gap-2 bg-[#f25f22] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#d94e15] transition-all hover:scale-105 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                {business.phone}
              </a>
              <span className="text-gray-300">or fill out the form below</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info + Form Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-[#F8F9FA] p-8 rounded-xl shadow-sm border border-gray-200 h-full">
                <h2 className="text-2xl font-bold text-[#213872] mb-6">Get In Touch</h2>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="bg-[#213872] p-3 rounded-lg flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A1A2E] mb-1">Phone</h3>
                      <a
                        href={`tel:${business.phone}`}
                        className="text-[#f25f22] hover:underline text-lg"
                      >
                        {business.phone}
                      </a>
                      <p className="text-sm text-gray-600 mt-1">Mon-Fri 9am-5pm ACST</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="bg-[#213872] p-3 rounded-lg flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A1A2E] mb-1">Email</h3>
                      <a
                        href={`mailto:${business.email}`}
                        className="text-[#f25f22] hover:underline break-all"
                      >
                        {business.email}
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="bg-[#213872] p-3 rounded-lg flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A1A2E] mb-1">Location</h3>
                      <p className="text-gray-700">
                        {business.location.suburb}, {business.location.city}<br />
                        {business.location.state} {business.location.postcode}
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="bg-[#213872] p-3 rounded-lg flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A1A2E] mb-1">Business Hours</h3>
                      <p className="text-gray-700">
                        Monday - Friday<br />
                        9:00 AM - 5:00 PM ACST
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust Badge */}
                <div className="mt-8 pt-8 border-t border-gray-300">
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <p className="text-[#213872] font-bold text-lg mb-2">⭐⭐⭐⭐⭐</p>
                    <p className="text-sm text-gray-600">Rated 5 stars by Adelaide businesses</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold text-[#213872] mb-4">Send Us a Message</h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Tell us about your business goals and we'll get back to you within 24 hours with a tailored marketing strategy.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Us Section */}
      <section className="py-16 md:py-24 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#213872] mb-12 text-center">
              What Happens Next?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                <div className="bg-[#f25f22] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-[#213872] mb-3">We Listen</h3>
                <p className="text-gray-600">
                  We'll discuss your business, current marketing challenges, and growth goals in detail.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                <div className="bg-[#f25f22] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-[#213872] mb-3">We Analyse</h3>
                <p className="text-gray-600">
                  Our team conducts a comprehensive audit of your current marketing and identifies opportunities.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                <div className="bg-[#f25f22] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-[#213872] mb-3">We Deliver</h3>
                <p className="text-gray-600">
                  You receive a custom marketing strategy with projected ROI and clear next steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#213872] mb-4 text-center">
              Contact FAQs
            </h2>
            <p className="text-gray-600 text-center mb-12 text-lg">
              Quick answers to common questions about getting in touch
            </p>
            
            <div className="space-y-6">
              <div className="bg-[#F8F9FA] p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-[#213872] mb-3">How quickly will you respond?</h3>
                <p className="text-gray-700">
                  We respond to all enquiries within 24 hours during business days. For urgent matters, please call us directly on {business.phone} during business hours (9am-5pm ACST, Mon-Fri).
                </p>
              </div>

              <div className="bg-[#F8F9FA] p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-[#213872] mb-3">Is the initial consultation free?</h3>
                <p className="text-gray-700">
                  Yes! We offer a free 30-minute consultation where we'll discuss your business goals, review your current marketing, and provide initial recommendations. There's no obligation to proceed.
                </p>
              </div>

              <div className="bg-[#F8F9FA] p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-[#213872] mb-3">Do you work with businesses outside Adelaide?</h3>
                <p className="text-gray-700">
                  While we're based in Adelaide, we work with clients across South Australia and Australia-wide. Many of our services are delivered remotely, though we love meeting local clients in person.
                </p>
              </div>

              <div className="bg-[#F8F9FA] p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-[#213872] mb-3">What information should I prepare before contacting you?</h3>
                <p className="text-gray-700">
                  It's helpful to have an understanding of your current marketing budget, your main business goals, and any specific challenges you're facing. However, don't worry if you're not sure – we'll guide you through everything during our consultation.
                </p>
              </div>

              <div className="bg-[#F8F9FA] p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-[#213872] mb-3">Can I visit your office?</h3>
                <p className="text-gray-700">
                  Absolutely! We're located in {business.location.suburb} and welcome in-person meetings. Please call ahead to book an appointment so we can give you our full attention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#213872] to-[#1a2d5a] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join the Adelaide businesses already seeing real results with Figure 8 Results
          </p>
          <a
            href={`tel:${business.phone}`}
            className="inline-flex items-center gap-2 bg-[#f25f22] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#d94e15] transition-all hover:scale-105 shadow-lg"
          >
            <Phone className="w-5 h-5" />
            Call {business.phone} Now
          </a>
        </div>
      </section>
    </>
  )
}