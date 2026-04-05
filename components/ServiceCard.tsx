import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  slug: string;
  description?: string;
}

export default function ServiceCard({ title, slug, description }: ServiceCardProps) {
  // Extract a cleaner display title (remove business name and pipes)
  const displayTitle = title
    .replace(/\|.*$/, '')
    .replace(/Figure 8 Results/gi, '')
    .trim();

  return (
    <Link
      href={`/services/${slug}`}
      className="group block bg-white rounded-lg border border-gray-200 p-6 hover:border-primary hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-3 bg-secondary rounded-lg group-hover:bg-primary/10 transition-colors">
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <svg
          className="w-5 h-5 text-gray-400 group-hover:text-accent group-hover:translate-x-1 transition-all"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-textColor mb-2 group-hover:text-primary transition-colors">
        {displayTitle}
      </h3>
      
      {description && (
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
      )}
      
      <div className="mt-4 inline-flex items-center text-primary font-medium text-sm group-hover:text-accent transition-colors">
        Learn more
        <svg
          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}