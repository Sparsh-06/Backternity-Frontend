import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export const metadata = {
  title: {
    default: "Backternity",
    template: "%s | Backternity"
  },
  description:
    "Build scalable backend systems in minutes with modular, production-ready components.",
  icons: {
    icon: [
      { url: "/fav.png" },
      { url: "/fav.png", sizes: "32x32", type: "image/png" }
    ],
    shortcut: "/fav.png",
    apple: "/fav.png"
  },
  metadataBase: new URL("https://backternity.dev"),
  openGraph: {
    title: "Backternity",
    description: "Generate production-grade backend infrastructure rapidly.",
    type: "website",
    url: "/",
    siteName: "Backternity",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Backternity",
    description:
      "Build backend systems rapidly using modular components.",
    images: ["/opengraph-image.png"]
  },
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-foreground antialiased selection:bg-primary selection:text-primary-foreground min-w-[320px] max-w-[100vw] overflow-x-hidden">
        <NextTopLoader color="#50C878" showAtBottom />
        {children}
      </body>
    </html>
  );
}
