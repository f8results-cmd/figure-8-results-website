'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getClientData } from '@/lib/client-data';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  
  const data = getClientData();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const services = data?.services?.slice(0, 8) ?? [];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center z-50">
            {data?.branding?.logo_url ? (
              <Image
                src={data.branding.logo_url}
                alt={`${data?.business_name ?? 'Business'} logo`}
                width={180}
                height={60}
                className="h-12 w-auto"
                priority
              />
            ) : (
              <span className="text-2xl font-bold text-primary">
                {data?.business_name ?? 'Business'}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-textColor hover:text-primary font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-textColor hover:text-primary font-medium transition-colors"
            >
              About
            </Link>
            
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button className="text-textColor hover:text-primary font-medium transition-colors flex items-center">
                Services
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              {servicesDropdownOpen && services.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-4">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="block px-6 py-2.5 text-textColor hover:bg-secondary hover:text-primary transition-colors text-sm"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className="text-textColor hover:text-primary font-medium transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-textColor hover:text-primary font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="hidden lg:block bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
          >
            Get Started
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden z-50 p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white z-40 overflow-y-auto">
          <nav className="container-custom py-8 flex flex-col space-y-6">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-textColor hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-textColor hover:text-primary transition-colors"
            >
              About
            </Link>
            
            <div>
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="text-lg font-medium text-textColor hover:text-primary transition-colors flex items-center w-full"
              >
                Services
                <svg
                  className={`ml-2 w-5 h-5 transition-transform ${
                    servicesDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              {servicesDropdownOpen && services.length > 0 && (
                <div className="mt-4 ml-4 space-y-3">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-base text-textColor hover:text-primary transition-colors"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-textColor hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-textColor hover:text-primary transition-colors"
            >
              Contact
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 text-center mt-4"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}