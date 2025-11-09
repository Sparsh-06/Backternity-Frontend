"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from "nextjs-toploader/app";
import { cn } from "@/lib/utils";
import ComponentRegistry from "@/lib/registry";

export default function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const down = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  // Flatten registry
  const components = useMemo(() => {
    return Object.entries(ComponentRegistry).map(([id, comp]) => ({
      id,
      name: comp.name,
      description: comp.description || "",
    }));
  }, []);

  // Custom filter logic (controlled)
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return components;
    return components.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [query, components]);

  // Navigation
  const handleSelect = (id) => {
    setOpen(false);
    router.push(`/browse/${id}`);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open search command palette"
        className="flex items-center justify-between w-[290px] px-3 py-[7px] 
          bg-card/70 text-foreground rounded-xl border border-border 
          shadow-sm hover:border-primary/50 hover:bg-card/80 
          transition-all duration-200"
      >
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground">Search Components</span>
        </div>
        <kbd className="flex items-center gap-1 text-xs text-primary bg-secondary px-1.5 py-[2px] pt-1 rounded font-mono tracking-wide">
          ⌘ + K
        </kbd>
      </button>

      {/* Command Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={cn(
            "p-0 max-w-lg rounded-lg border border-border/50 shadow-2xl bg-card backdrop-blur-sm"
          )}
        >
          <VisuallyHidden>
            <DialogTitle>Search Components</DialogTitle>
          </VisuallyHidden>

          {/* ✅ Disable internal filtering */}
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search components..."
              value={query}
              onValueChange={setQuery}
              className="bg-transparent text-foreground border-none px-6 py-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-0"
              autoFocus
            />

            <CommandList
              className={cn(
                "max-h-[420px] overflow-y-auto px-3 py-4 pb-2",
                // ✅ Completely hide scrollbar (cross-browser)
                "[&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0",
                "scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]"
              )}
            >
              <CommandEmpty className="px-6 py-8 text-sm text-muted-foreground text-center">
                No components found.
              </CommandEmpty>

              {filtered.map((comp) => (
                <CommandItem
                  key={comp.id}
                  onSelect={() => handleSelect(comp.id)}
                  className={cn(
                    "cursor-pointer px-3 py-3 rounded-md text-foreground flex justify-between transition-all duration-150",
                    "hover:bg-secondary/60 focus:bg-secondary/60 data-[selected=true]:bg-secondary/60",
                    "border border-transparent hover:border-border/30"
                  )}
                >
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <span className="font-medium text-white text-sm">
                      {comp.name}
                    </span>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {comp.description}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
