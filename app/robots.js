export default function robots() {
  const domain = "https://backternity.dev"; // ensure consistency

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/admin/"]
      }
    ],
    sitemap: `${domain}/sitemap.xml`,
    host: domain
  };
}
