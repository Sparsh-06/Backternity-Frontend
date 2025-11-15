import { BrowseClientWrapper } from "@/components/browse-client-wrapper";

// Enhanced and expanded SEO metadata
export const metadata = {
  title: "Browse Components - Backternity",
  description:
    "Explore production-ready backend components for Express.js, authentication, databases, storage, and more. Build scalable APIs quickly with modular tools and reusable code blocks designed for enterprise-grade reliability.",
  keywords: [
    "backend components",
    "express",
    "node.js",
    "authentication",
    "database",
    "api generator",
    "api toolkit",
    "microservices",
    "modular backend",
    "reusable components",
    "express middleware",
    "jwt authentication",
    "mongodb",
    "postgresql",
    "api security",
    "api design",
    "production-ready backend",
    "serverless",
    "cloud backend",
    "fast api development",
    "backend orchestration"
  ],
  alternates: {
    canonical: "https://backternity.dev/browse" // Use absolute for canonical links
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Browse Backend Components - Backternity",
    description: "Discover ready-to-use backend components for rapid API development and scalable infrastructure.",
    type: "website",
    url: "https://backternity.dev/browse",
    images: [
      {
        url: "/api/og?section=browse",
        width: 1200,
        height: 630,
        alt: "Backternity Component Library"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse Components - Backternity",
    description: "Explore ready-made backend modules designed for speed, security, and reliability.",
    images: ["/api/og?section=browse"]
  },
  // Structured data for better rich results
  other: [
    {
      rel: "preconnect",
      url: "https://www.googletagmanager.com",
    }
  ]
};

// Use semantic HTML, main regions, and accessibility features
export default function BrowseLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Structured data (JSON-LD) for product library */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Backternity Backend Component Library",
              description: "Explore production-ready, modular backend components for Express, databases, auth, and scalable API development.",
              url: "https://backternity.dev/browse",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Express Middleware",
                  url: "https://backternity.dev/browse/express",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Authentication Modules",
                  url: "https://backternity.dev/browse/auth",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Database Connectors",
                  url: "https://backternity.dev/browse/database",
                }
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-neutral-950 text-neutral-200">
        {/* Accessibility: Add skip nav and semantic main container */}
        <main id="browse-main" tabIndex={-1}>
          <BrowseClientWrapper>
            {children}
          </BrowseClientWrapper>
        </main>
      </body>
    </html>
  );
}
