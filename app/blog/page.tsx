// @ts-nocheck
import { Metadata } from 'next'
import { getClientData } from '@/lib/client-data'
import Link from 'next/link'
import { Calendar, User, ArrowRight, TrendingUp } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  const clientData = getClientData()
  const business = clientData.business

  const title = `Marketing Blog | ${business.name} Adelaide`
  const description = `Expert marketing insights, digital strategy tips, and industry news from ${business.name}. Learn how to grow your Adelaide business with proven marketing tactics.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${business.website}/blog`,
      siteName: business.name,
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${business.website}/blog`,
    },
  }
}

export default function BlogPage() {
  const clientData = getClientData()
  const business = clientData.business
  const posts = clientData.blog.posts

  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // Get featured post (newest)
  const featuredPost = sortedPosts[0]
  const otherPosts = sortedPosts.slice(1)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#213872] to-[#1a2d5a] text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#f25f22] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <TrendingUp className="w-4 h-4" />
              Marketing Insights
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Marketing Strategies That Work
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Actionable marketing advice from Adelaide's results-driven agency
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-[#F8F9FA] to-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-200">
                <div className="flex items-center gap-2 text-[#f25f22] font-semibold mb-4">
                  <TrendingUp className="w-5 h-5" />
                  Featured Article
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#213872] mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 text-lg mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(featuredPost.date)}
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </div>
                    </div>
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 bg-[#213872] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a2d5a] transition-colors"
                    >
                      Read Full Article
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="bg-gradient-to-br from-[#213872] to-[#1a2d5a] p-8 rounded-xl text-white">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-[#f25f22] rounded-full"></div>
                        {featuredPost.category}
                      </div>
                      <p className="text-gray-200 leading-relaxed">
                        Discover proven strategies and actionable insights to elevate your marketing performance.
                      </p>
                      <div className="pt-4 border-t border-gray-600">
                        <p className="text-sm text-gray-300">
                          <strong className="text-white">Reading time:</strong> 5 min read
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Blog Posts Grid */}
      <section className="py-16 md:py-20 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#213872] mb-12 text-center">
              Latest Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 bg-[#213872] text-white text-xs font-semibold rounded-full mb-4">
                      {post.category}
                    </div>
                    <h3 className="text-xl font-bold text-[#213872] mb-3 group-hover:text-[#f25f22] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.date)}
                      </div>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-[#f25f22] font-semibold hover:gap-3 transition-all"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#213872] mb-12 text-center">
              Browse by Topic
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from(new Set(posts.map((p) => p.category))).map((category) => {
                const count = posts.filter((p) => p.category === category).length
                return (
                  <div
                    key={category}
                    className="bg-[#F8F9FA] p-6 rounded-xl border border-gray-200 text-center hover:border-[#f25f22] transition-colors cursor-pointer"
                  >
                    <h3 className="font-bold text-[#213872] mb-2">{category}</h3>
                    <p className="text-sm text-gray-600">{count} {count === 1 ? 'article' : 'articles'}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#213872] to-[#1a2d5a] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Help With Your Marketing Strategy?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Our Adelaide team is ready to create a custom plan for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#f25f22] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#d94e15] transition-all hover:scale-105 shadow-lg"
              >
                Get Your Free Strategy Session
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${business.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-white text-[#213872] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all"
              >
                Or Call {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}