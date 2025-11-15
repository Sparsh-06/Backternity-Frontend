import { redirect } from "next/navigation";
import ComponentRegistry from "@/lib/registry";

export const metadata = {
  title: "Browse All Components - Backternity",
  description:
    "Explore our complete collection of backend components including authentication, databases, storage solutions, and more for Express.js applications. Modular, scalable, production-ready backend building blocks.",
  keywords: [
    "backend components",
    "express",
    "authentication components",
    "database connectors",
    "storage solutions",
    "scalable backend",
    "production ready backend",
    "api modules",
    "node.js microservices",
    "backend-as-a-service"
  ],
  alternates: {
    canonical: "https://backternity.dev/browse" // Use absolute URL
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function BrowseIndexPage() {
  const keys = Object.keys(ComponentRegistry).sort();
  const first = keys[0];

  if (first) {
    redirect(`/browse/${first}`);
  }

  return (
    <main
      role="main"
      aria-labelledby="no-components-heading"
      className="p-8 text-center text-neutral-400 min-h-screen flex flex-col justify-center items-center"
    >
      <h1 id="no-components-heading" className="text-2xl font-bold mb-4">
        No Components Available
      </h1>
      <p className="max-w-md">
        The component registry appears to be empty at the moment. Please check back later or contact support for assistance.
      </p>
    </main>
  );
}
