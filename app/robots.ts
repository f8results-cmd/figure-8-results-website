import { MetadataRoute } from 'next'
import { getClientData } from '@/lib/client-data'

export default function robots(): MetadataRoute.Robots {
  const clientData = getClientData()
  const baseUrl = clientData.business.website

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}