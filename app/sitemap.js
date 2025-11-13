import ComponentRegistry from '@/lib/registry'

export default function sitemap() {
  const baseUrl = 'https://backternity.dev'
  
  // Get all component URLs
  const componentUrls = Object.keys(ComponentRegistry).map((slug) => ({
    url: `${baseUrl}/browse/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/browse`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    }
  ]

  return [...staticRoutes, ...componentUrls]
}