export default function robots() {
  const domain = "https://backternity.dev";

  return {
    rules: [
      {
        userAgent: "*",        // Applies to all bots
        allow: "/",            // Allow crawling of everything except disallowed paths
        disallow: ["/private/", "/admin/"], // Disallow sensitive or admin paths
      },
    ],
    sitemap: `${domain}/sitemap.xml`,  // Explicit location of your sitemap
    host: domain,                     // Preferred host for crawling
  };
}
