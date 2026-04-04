import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  slug: string;
  description?: string;
}

export default function ServiceCard({ title, slug, description }: ServiceCardProps) {
  const displayTitle = title.replace(' | Figure 8 Results', '');

  return (
    <Link href={`/services/${slug}`} className="group">
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6 h-full hover:border-[#f25f22] hover:shadow-xl transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="bg-[#213872] text-white p-3 rounded-lg group-hover:bg-[#f25f22] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#1A1A2E] mb-2 group-hover:text-[#213872] transition-colors">
              {displayTitle}
            </h3>
            {description && (
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            )}
            <div className="mt-4 flex items-center text-[#f25f22] font-semibold group-hover:gap-2 transition-all">
              <span>Learn more</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}