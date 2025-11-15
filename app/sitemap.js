import ComponentRegistry from '@/lib/registry';

export default function sitemap() {
  const baseUrl = 'https://backternity.dev';
  const nowIso = new Date().toISOString();

  // Generate URLs for all components in the registry
  const componentUrls = Object.keys(ComponentRegistry).map((slug) => ({
    url: `${baseUrl}/browse/${slug}`,
    lastModified: nowIso, // Use ISO 8601 format for date consistency
    changefreq: 'weekly',  // Use 'changefreq' (all lowercase) per sitemap protocol
    priority: 0.8,
  }));

  // Define static and important site-wide URLs
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: nowIso,
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/browse`,
      lastModified: nowIso,
      changefreq: 'daily',
      priority: 0.9,
    },
    // Optionally add more static important pages:
  ];

  // Merge static and dynamic URLs
  return [...staticRoutes, ...componentUrls];
}
