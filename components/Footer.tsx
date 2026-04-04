import Link from 'next/link';
import { getClientData } from '@/lib/client-data';

export default function Footer() {
  const clientData = getClientData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#213872] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Business Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{clientData.business.name}</h3>
            <div className="space-y-2 text-gray-300">
              {clientData.business.address && (
                <p>{clientData.business.address}</p>
              )}
              <p>{clientData.business.city}, {clientData.business.state}</p>
              <p>
                <a href={`tel:${clientData.business.phone}`} className="hover:text-[#f25f22] transition-colors">
                  {clientData.business.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${clientData.business.email}`} className="hover:text-[#f25f22] transition-colors">
                  {clientData.business.email}
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#f25f22] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#f25f22] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-[#f25f22] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-[#f25f22] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#f25f22] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {clientData.services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link 
                    href={`/services/${service.slug}`} 
                    className="text-gray-300 hover:text-[#f25f22] transition-colors text-sm"
                  >
                    {service.title.replace(' | Figure 8 Results', '').replace(' Adelaide', '')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-xl font-bold mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {clientData.service_areas.map((area) => (
                <li key={area} className="text-gray-300">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} {clientData.business.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}