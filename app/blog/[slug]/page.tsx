// @ts-nocheck
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getClientData } from '@/lib/client-data';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const data = getClientData();
  const posts = data.blog_posts ?? [];
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getClientData();
  const posts = data.blog_posts ?? [];
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };

  const businessName = data.business_name ?? data.business?.name ?? '';
  const siteUrl = data.website ?? '';
  const title = `${post.title} | ${businessName}`;
  const description = post.meta_description || post.excerpt || '';
  const authors: string[] = post.author ? [post.author] : businessName ? [businessName] : [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl ? `${siteUrl}/blog/${post.slug}` : undefined,
      siteName: businessName || undefined,
      locale: 'en_AU',
      type: 'article',
      publishedTime: post.published_at || post.date || undefined,
      authors,
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: siteUrl ? { canonical: `${siteUrl}/blog/${post.slug}` } : undefined,
  };
}

export default function BlogPostPage({ params }: Props) {
  const data = getClientData();
  const posts = data.blog_posts ?? [];
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const businessName = data.business_name ?? data.business?.name ?? '';
  const phone = data.phone ?? data.business?.phone ?? '';
  const siteUrl = data.website ?? '';

  const postDate = post.published_at || post.date
    ? new Date(post.published_at || post.date)
    : null;
  const formattedDate = postDate
    ? postDate.toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description || post.excerpt || '',
    datePublished: post.published_at || post.date || '',
    dateModified: post.published_at || post.date || '',
    author: { '@type': 'Organization', name: businessName, url: siteUrl },
    publisher: {
      '@type': 'Organization',
      name: businessName,
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: siteUrl ? `${siteUrl}/logo.png` : '' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': siteUrl ? `${siteUrl}/blog/${post.slug}` : '',
    },
  };

  const relatedPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const phoneClean = phone.replace(/\s/g, '');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link href="/blog" className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {post.category && (
                  <span className="bg-white text-[var(--color-primary)] text-xs font-semibold px-3 py-1 rounded-full uppercase">
                    {post.category}
                  </span>
                )}
                {formattedDate && <span className="text-white/90 text-sm">{formattedDate}</span>}
                {post.read_time && <span className="text-white/90 text-sm">{post.read_time}</span>}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
              {(post.excerpt || post.meta_description) && (
                <p className="text-xl text-white/90">{post.excerpt || post.meta_description}</p>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {post.body_html ? (
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.body_html }}
                />
              ) : (
                <p className="text-gray-600 text-lg">Content coming soon.</p>
              )}

              {/* CTA box */}
              {businessName && (
                <div className="mt-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-lg p-8 text-white">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">Need Professional Help?</h3>
                      <p className="text-white/90">Contact {businessName} today — local experts ready to help.</p>
                    </div>
                    {phone && (
                      <a
                        href={`tel:${phoneClean}`}
                        className="inline-flex items-center bg-white text-[var(--color-primary)] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
                      >
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {phone}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((rp) => (
                  <article key={rp.slug} className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <Link href={`/blog/${rp.slug}`} className="block p-6">
                      {rp.category && (
                        <span className="bg-[var(--color-primary)] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase mb-4 inline-block">
                          {rp.category}
                        </span>
                      )}
                      <h3 className="text-xl font-bold mb-3">{rp.title}</h3>
                      {(rp.excerpt || rp.meta_description) && (
                        <p className="text-gray-700 mb-4 line-clamp-3">{rp.excerpt || rp.meta_description}</p>
                      )}
                      <span className="text-[var(--color-primary)] font-semibold">Read More →</span>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        {businessName && (
          <section className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Work with {businessName}?
              </h2>
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
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
