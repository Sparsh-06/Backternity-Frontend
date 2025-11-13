"use client";

import { useEffect, useState } from "react";
import { Spotlight } from "@/components/ui/spotlight-new";
import ComponentSidebar from "@/components/component-sidebar";
import TableOfContents from "@/components/table-of-contents";
import ComponentRegistry from "@/lib/registry";
import { HeroHeader } from "@/components/header";
import ContactUs from "@/components/sections/contact-us";
import EmeraldDivider from "@/components/ui/emeraldDivider";

export function BrowseClientWrapper({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const components = Object.entries(ComponentRegistry);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileSidebar = () => {
    // TODO: Implement mobile sidebar toggle
    alert("Mobile sidebar would open here");
  };

  return (
    <>
      <Spotlight />
      <HeroHeader />

      <div className="mx-auto max-w-[95vw] lg:max-w-[85vw] xl:max-w-[80vw] 2xl:max-w-[75vw] pt-[80px] sm:pt-[100px] flex flex-col lg:flex-row gap-4 lg:gap-8 px-4 sm:px-6 lg:px-0">
        <aside className="hidden lg:block w-64 xl:w-72 sticky top-[100px] self-start h-[calc(100vh-100px)] hide-scrollbar scrollbar-none overflow-y-auto border-r border-white/5 pr-4 xl:pr-6">
          <ComponentSidebar components={components} />
        </aside>

        <main className="flex-1 min-h-screen max-w-none">{children}</main>

        {/* RIGHT SIDEBAR (TOC) - Hidden on mobile/tablet, visible on large screens */}
        <aside className="hidden xl:block w-60 2xl:w-64 sticky top-[100px] self-start h-[calc(100vh-100px)] border-l border-white/5 pl-4 2xl:pl-6">
          <TableOfContents />
        </aside>
      </div>

      <div>
        <EmeraldDivider speed={2} />
        <ContactUs />
      </div>

      {/* Mobile Navigation Drawer - Only show on mobile when sidebar is hidden */}
      <div className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30">
        <button
          className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 px-4 py-2 rounded-full text-sm font-medium shadow-lg transition-colors"
          onClick={handleMobileSidebar}
        >
          Browse Components
        </button>
      </div>
    </>
  );
}