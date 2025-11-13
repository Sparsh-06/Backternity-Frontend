  import { notFound } from "next/navigation";
  import ComponentRegistry from "@/lib/registry";
  import ComponentViewer from "@/components/component-viewer";

// Generate dynamic metadata for each component page
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const component = ComponentRegistry[slug];    if (!component) {
      return {
        title: "Component Not Found - Backternity",
        description: "The requested component could not be found."
      };
    }

    const name = component.name || slug;
    const type = component.type || "component";
    const short = component.description || "";

    // Controlled, bounded description
    const desc = short.length > 160 
      ? short.slice(0, 157) + "…" 
      : short;

    return {
      title: `${name} – ${type[0].toUpperCase() + type.slice(1)} Component | Backternity`,
      description: desc,
      keywords: [
        type,
        ...(component.tags || []),
        name.toLowerCase(),
        slug,
        "express",
        "node",
        "backend"
      ],
      openGraph: {
        title: name,
        description: desc,
        type: "article",
        url: `/browse/${slug}`,
        images: [
          {
            url: `/api/og?component=${encodeURIComponent(name)}&type=${type}`,
            width: 1200,
            height: 630,
            alt: `${name} component preview`
          }
        ]
      },
      twitter: {
        card: "summary_large_image",
        title: name,
        description: desc,
        images: [`/api/og?component=${encodeURIComponent(name)}&type=${type}`]
      },
      alternates: {
        canonical: `/browse/${slug}`
      }
    };
  }

/** 🔸 Server Component Page */
export default async function ComponentSlugPage({ params }) {
  const { slug } = await params;
  const component = ComponentRegistry[slug];    // Return 404 if component doesn't exist
    if (!component) {
      notFound();
    }

    return (
      <div className="p-4">
        <ComponentViewer component={component} componentKey={slug} />
      </div>
    );
  }
