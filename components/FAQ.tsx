'use client';

import { useState } from 'react';
import type { FAQ as FAQType } from '@/lib/client-data';

interface FAQProps {
  faqs: FAQType[];
}

export default function FAQ({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-4 text-left bg-white hover:bg-[#F8F9FA] transition-colors flex items-center justify-between"
          >
            <span className="font-semibold text-[#1A1A2E] pr-8">{faq.question}</span>
            <svg
              className={`w-5 h-5 text-[#213872] transition-transform flex-shrink-0 ${
                openIndex === index ? 'transform rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {openIndex === index && (
            <div className="px-6 py-4 bg-[#F8F9FA] border-t border-gray-200">
              <p className="text-[#1A1A2E] leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}