'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getClientData } from '@/lib/client-data';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const clientData = getClientData();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={clientData.branding.logo_url}
              alt={`${clientData.business.name} logo`}
              width={180}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-[#1A1A2E] hover:text-[#213872] font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-[#1A1A2E] hover:text-[#213872] font-medium transition-colors">
              About
            </Link>
            
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="text-[#1A1A2E] hover:text-[#213872] font-medium transition-colors flex items-center gap-1">
                Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white shadow-xl rounded-lg py-4 px-2">
                  {clientData.services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="block px-4 py-2 text-[#1A1A2E] hover:bg-[#F8F9FA] hover:text-[#213872] rounded transition-colors"
                    >
                      {service.title.replace(' | Figure 8 Results', '')}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/blog" className="text-[#1A1A2E] hover:text-[#213872] font-medium transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-[#1A1A2E] hover:text-[#213872] font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Phone CTA - Desktop */}
          <a
            href={`tel:${clientData.business.phone}`}
            className="hidden lg:inline-flex items-center gap-2 bg-[#f25f22] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d94d15] transition-all shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {clientData.business.phone}
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#213872] p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200 mt-4">
            <nav className="flex flex-col gap-4 pt-4">
              <Link href="/" className="text-[#1A1A2E] hover:text-[#213872] font-medium" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/about" className="text-[#1A1A2E] hover:text-[#213872] font-medium" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="/services" className="text-[#1A1A2E] hover:text-[#213872] font-medium" onClick={() => setMobileMenuOpen(false)}>
                Services
              </Link>
              <Link href="/blog" className="text-[#1A1A2E] hover:text-[#213872] font-medium" onClick={() => setMobileMenuOpen(false)}>
                Blog
              </Link>
              <Link href="/contact" className="text-[#1A1A2E] hover:text-[#213872] font-medium" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <a
                href={`tel:${clientData.business.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-[#f25f22] text-white px-6 py-3 rounded-lg font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {clientData.business.phone}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}