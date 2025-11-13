import { BrowseClientWrapper } from "@/components/browse-client-wrapper";

export const metadata = {
  title: "Browse Components - Backternity",
  description:
    "Explore production-ready backend components for Express.js, authentication, databases, storage, and more. Build scalable APIs quickly.",
  keywords: [
    "backend components",
    "express",
    "node.js",
    "authentication",
    "database",
    "api generator",
    "api toolkit",
    "microservices"
  ],
  alternates: {
    canonical: "/browse"
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Browse Backend Components - Backternity",
    description: "Discover ready-to-use backend components for rapid development.",
    type: "website",
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
    description: "Explore ready-made backend modules designed for speed and reliability.",
    images: ["/api/og?section=browse"]
  }
};

export default function BrowseLayout({ children }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <BrowseClientWrapper>
        {children}
      </BrowseClientWrapper>
    </div>
  );
}
