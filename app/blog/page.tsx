// @ts-nocheck
import { Metadata } from 'next';
import Link from 'next/link';
import { getClientData } from '@/lib/client-data';

export async function generateMetadata(): Promise<Metadata> {
  const data = getClientData();
  const businessName = data.business_name ?? data.business?.name ?? '';
  const niche = data.business?.niche ?? '';
  const city = data.business?.city ?? '';
  const siteUrl = data.website ?? '';
  const title = `Blog | ${businessName}`;
  const description = `Tips, advice and insights from ${businessName}${niche ? ` — your local ${niche} experts` : ''}${city ? ` in ${city}` : ''}.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl ? `${siteUrl}/blog` : undefined,
      siteName: businessName || undefined,
      locale: 'en_AU',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: siteUrl ? { canonical: `${siteUrl}/blog` } : undefined,
  };
}

export default function BlogPage() {
  const data = getClientData();
  const businessName = data.business_name ?? data.business?.name ?? '';
  const city = data.business?.city ?? '';
  const phone = data.phone ?? data.business?.phone ?? '';
  const phoneClean = phone.replace(/\s/g, '');

  const posts = data.blog_posts ?? [];
  const sortedPosts = [...posts].sort(
    (a, b) =>
      new Date(b.published_at || b.date || '').getTime() -
      new Date(a.published_at || a.date || '').getTime()
  );

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Advice</h1>
            <p className="text-xl text-white/90">
              Expert insights from {businessName}{city ? ` — tips, guides and local advice for ${city}` : ''}.
            </p>
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {sortedPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-8">Check back soon for helpful tips and advice!</p>
              <Link
                href="/contact"
                className="inline-block bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Contact Us Today
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {sortedPosts.map((post) => {
                const postDate = post.published_at || post.date
                  ? new Date(post.published_at || post.date)
                  : null;
                const formattedDate = postDate
                  ? postDate.toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : '';
                return (
                  <article
                    key={post.slug}
                    className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <Link href={`/blog/${post.slug}`} className="block p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        {post.category && (
                          <span className="bg-[var(--color-primary)] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">
                            {post.category}
                          </span>
                        )}
                        {formattedDate && (
                          <span className="text-sm text-gray-600">{formattedDate}</span>
                        )}
                        {post.read_time && (
                          <span className="text-sm text-gray-500">{post.read_time}</span>
                        )}
                      </div>
                      <h2 className="text-2xl font-bold mb-3 hover:text-[var(--color-primary)] transition-colors">
                        {post.title}
                      </h2>
                      {(post.excerpt || post.meta_description) && (
                        <p className="text-gray-700 mb-4 line-clamp-3">
                          {post.excerpt || post.meta_description}
                        </p>
                      )}
                      <span className="text-[var(--color-primary)] font-semibold">Read More →</span>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      {businessName && (
        <section className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need Help Right Now?</h2>
            {city && (
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {businessName} — available now for {city} and surrounding areas.
              </p>
            )}
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
      )}
    </main>
  );
}
