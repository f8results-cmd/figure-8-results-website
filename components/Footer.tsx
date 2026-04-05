import Link from 'next/link';
import { getClientData } from '@/lib/client-data';

export default function Footer() {
  const data = getClientData();
  const currentYear = new Date().getFullYear();
  
  const services = data?.services?.slice(0, 6) ?? [];
  const serviceAreas = data?.service_areas?.slice(0, 6) ?? [];

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Business Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{data?.business_name ?? ''}</h3>
            <div className="space-y-3 text-white/80">
              {data?.business?.address && (
                <p>{data.business.address}</p>
              )}
              {(data?.business?.city || data?.business?.state) && (
                <p>
                  {data?.business?.city ?? ''}{data?.business?.city && data?.business?.state ? ', ' : ''}{data?.business?.state ?? ''}
                </p>
              )}
              {data?.phone && (
                <p>
                  <a
                    href={`tel:${data.phone.replace(/\s/g, '')}`}
                    className="hover:text-accent transition-colors"
                  >
                    {data.phone}
                  </a>
                </p>
              )}
              {data?.business?.email && (
                <p>
                  <a
                    href={`mailto:${data.business.email}`}
                    className="hover:text-accent transition-colors"
                  >
                    {data.business.email}
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/80 hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/80 hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          {services.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-white/80 hover:text-accent transition-colors text-sm"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Service Areas */}
          {serviceAreas.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Service Areas</h4>
              <ul className="space-y-2">
                {serviceAreas.map((area) => (
                  <li key={area} className="text-white/80 text-sm">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {currentYear} {data?.business_name ?? ''}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-white/60 hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}