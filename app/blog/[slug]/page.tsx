// @ts-nocheck
import { Metadata } from 'next'
import { getClientData } from '@/lib/client-data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, User, ArrowLeft, Phone, CheckCircle2 } from 'lucide-react'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const clientData = getClientData()
  return clientData.blog_posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const clientData = getClientData()
  const post = clientData.blog_posts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const business = clientData.business

  return {
    title: `${post.title} | ${business.name}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${business.website}/blog/${post.slug}`,
      siteName: business.name,
      locale: 'en_AU',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `${business.website}/blog/${post.slug}`,
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const clientData = getClientData()
  const post = clientData.blog_posts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const business = clientData.business

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = clientData.blog_posts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3)

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: business.name,
      logo: {
        '@type': 'ImageObject',
        url: `${business.website}/logo.png`,
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${business.website}/blog/${post.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Breadcrumb & Back Link */}
      <section className="bg-[#F8F9FA] py-6 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#213872] hover:text-[#f25f22] font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Article Header */}
      <article className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-[#213872] text-white text-sm font-semibold rounded-full mb-6">
              {post.category}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#213872] mb-6">
              {post.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-gray-500 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-semibold">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="text-sm">
                <span className="font-semibold">5 min read</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {post.content.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#213872] mb-4">
                    {section.heading}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Key Takeaways Box */}
            <div className="bg-gradient-to-br from-[#213872] to-[#1a2d5a] p-8 rounded-xl text-white mt-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-7 h-7 text-[#f25f22]" />
                Key Takeaways
              </h3>
              <ul className="space-y-3">
                {post.content.slice(0, 3).map((section, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#f25f22] flex-shrink-0 mt-1" />
                    <span className="text-gray-100">{section.heading}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#213872] to-[#1a2d5a] p-8 md:p-12 rounded-2xl text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Implement These Strategies?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Let {business.name} create a custom marketing plan for your Adelaide business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#f25f22] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#d94e15] transition-all hover:scale-105 shadow-lg"
              >
                Get Your Free Consultation
              </Link>
              <a
                href={`tel:${business.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-white text-[#213872] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all"
              >
                <Phone className="w-5 h-5" />
                {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#213872] mb-12 text-center">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.slug}
                    className="bg-[#F8F9FA] rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="p-6">
                      <div className="inline-block px-3 py-1 bg-[#213872] text-white text-xs font-semibold rounded-full mb-4">
                        {relatedPost.category}
                      </div>
                      <h3 className="text-xl font-bold text-[#213872] mb-3 group-hover:text-[#f25f22] transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="inline-flex items-center gap-2 text-[#f25f22] font-semibold hover:gap-3 transition-all"
                      >
                        Read More
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Author Bio */}
      <section className="py-12 bg-[#F8F9FA] border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#213872] to-[#1a2d5a] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {post.author.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#213872] mb-2">
                  Written by {post.author}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.author} is a marketing specialist at {business.name}, helping Adelaide businesses grow through data-driven digital marketing strategies.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[#f25f22] font-semibold hover:gap-3 transition-all"
                >
                  Get in touch with our team
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}