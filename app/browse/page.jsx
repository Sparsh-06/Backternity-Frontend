import { redirect } from "next/navigation";
import ComponentRegistry from "@/lib/registry";

export const metadata = {
  title: "Browse All Components - Backternity",
  description:
    "Explore our complete collection of backend components including authentication, databases, storage solutions, and more for Express.js applications.",
  alternates: {
    canonical: "/browse"
  }
};

export default function BrowseIndexPage() {
  const keys = Object.keys(ComponentRegistry).sort();
  const first = keys[0];

  if (first) {
    redirect(`/browse/${first}`);
  }

  return (
    <div className="p-8 text-center text-neutral-400">
      <h2 className="text-xl font-semibold mb-4">No Components Available</h2>
      <p>The component registry appears to be empty.</p>
    </div>
  );
}
