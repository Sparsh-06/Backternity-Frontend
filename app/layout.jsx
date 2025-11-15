import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';

// Enhanced Metadata for SEO
export const metadata = {
  metadataBase: new URL("https://backternity.dev"),
  title: {
    default: "Backternity - Build Scalable Backends with One Command",
    template: "%s | Backternity",
  },
  description:
    "Build scalable backend systems in minutes with modular, production-ready components. Modular Backend. Minimal Effort. Authentication, data, and messaging that integrate in minutes.",
  icons: {
    icon: [
      { url: "/fav.png", type: "image/png" },
      { url: "/fav.png", sizes: "32x32", type: "image/png" },
      { url: "/fav.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: [{ url: "/fav.png", type: "image/png" }],
    apple: [{ url: "/fav.png", type: "image/png" }],
    other: [
      { rel: "icon", url: "/fav.png" },
    ],
  },
  openGraph: {
    title: "Backternity - Build Scalable Backends with One Command",
    description: "Build scalable backend systems in minutes with modular, production-ready components. Authentication, data, and messaging that integrate in minutes.",
    type: "website",
    url: "https://backternity.dev",
    siteName: "Backternity",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Backternity - Modular Backend Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Backternity - Build Scalable Backends with One Command",
    description: "Build scalable backend systems in minutes with modular, production-ready components.",
    images: ["/opengraph-image.png"],
    creator: "@backternity",
  },
  alternates: {
    canonical: "https://backternity.dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: [
    'backend',
    'modular backend',
    'backend components',
    'scalable backend',
    'backend infrastructure',
    'API development',
    'microservices',
    'backend-as-a-service',
    'production-ready API',
    'cloud-native backend',
    'plug and play backend',
    'node.js backend development',
    'express backend components',
    'authentication service',
    'backend data integration',
    'message queue',
    'real-time backend',
    'low-code backend platform',
    'serverless backend',
    'api orchestration',
  ],
  // Structured data for enhanced SEO (add in <head> as a script or through Next SEO plugin)
  other: [
    {
      rel: "preconnect",
      url: "https://www.googletagmanager.com",
    },
  ],
};

// Make sure to use semantic HTML in your layout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Backternity",
              url: "https://backternity.dev",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "All",
              description: "Build scalable backend systems in minutes with modular, production-ready components.",
              keywords: [
                'backend','modular backend','backend components','API development','microservices'
              ],
              publisher: {
                "@type": "Organization",
                name: "Backternity.dev",
                url: "https://backternity.dev",
              },
            }),
          }}
        />
      </head>
      <body className="text-foreground antialiased selection:bg-primary selection:text-primary-foreground min-w-[320px] max-w-[100vw] overflow-x-hidden">
        {/* Accessibility: Provide skip navigation and semantic containers */}
        <NextTopLoader color="#50C878" showAtBottom />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
      </body>
      <GoogleAnalytics gaId="G-1YLP9NEWXL" />
    </html>
  );
}
