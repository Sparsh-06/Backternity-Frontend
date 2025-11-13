"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { useScroll } from "motion/react";
import SearchShortcut from "./ui/search-command";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { ChevronsRight } from "lucide-react";
import { ThumbsUp } from "lucide-react";
import { MoveRightIcon } from "lucide-react";
import { MoveRight } from "lucide-react";
import Image from "next/image";

function RequestAComponent() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    componentName: "",
    description: "",
    useCase: "",
    priority: "Medium",
  });
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/component-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          componentName: "",
          description: "",
          useCase: "",
          priority: "Medium",
        });
        setTimeout(() => {
          setIsSubmitted(false);
          setIsOpen(false);
        }, 3000);
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      componentName: "",
      description: "",
      useCase: "",
      priority: "Medium",
    });
    setError("");
    setIsSubmitted(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <h1 className="text-sm font-light my-auto text-emerald-300 hover:text-white cursor-pointer underline-offset-2 underline">
          Request a Component
        </h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto gap-5">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            Request a New Component
          </DialogTitle>
          <hr className="pb-2"/>
          <DialogDescription>
            We're excited to hear your ideas! Tell us about the backend
            component you need and we'll consider adding it to our library.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">
                <ThumbsUp />
              </span>
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Request Submitted!
            </h4>
            <p className="text-sm text-muted-foreground">
              Thank you for your suggestion. We'll review it and get back to you
              soon.
            </p>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Your Name *
                  </label>
                  <InputGroup>
                    <InputGroupInput
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      disabled={isLoading}
                    />
                  </InputGroup>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email Address *
                  </label>
                  <InputGroup>
                    <InputGroupInput
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      disabled={isLoading}
                    />
                  </InputGroup>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="componentName"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Component Name *
                  </label>
                  <InputGroup>
                    <InputGroupInput
                      id="componentName"
                      name="componentName"
                      type="text"
                      required
                      value={formData.componentName}
                      onChange={handleChange}
                      placeholder="e.g., Advanced JWT Auth, Redis Caching"
                      disabled={isLoading}
                    />
                  </InputGroup>
                </div>

                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Priority Level
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start bg-background/60 hover:bg-emerald-600/20 hover:text-white border-white/10"
                        disabled={isLoading}
                      >
                        {formData.priority === "Low" && "Low - Nice to have"}
                        {formData.priority === "Medium" && "Med - Would be useful"}
                        {formData.priority === "High" && "High - Really need this"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Priority Level</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={formData.priority}
                        onValueChange={(value) => setFormData({ ...formData, priority: value })}
                      >
                        <DropdownMenuRadioItem value="Low">
                          Low - Nice to have
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Medium">
                          Med - Would be useful
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="High">
                          High - Really need this
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Component Description *
                </label>
                <InputGroup>
                  <Textarea
                    id="description"
                    name="description"
                    rows={3}
                    required
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe what this component should do, its main features, and how it should work..."
                    className="w-full px-3 py-2 rounded-md bg-background/60 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground focus:ring-1 focus:ring-primary/40 focus:border-primary/40 resize-none disabled:opacity-50"
                    disabled={isLoading}
                  />
                </InputGroup>
              </div>

              <div>
                <label
                  htmlFor="useCase"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Use Case (Optional)
                </label>
                <InputGroup>
                  <Textarea
                    id="useCase"
                    name="useCase"
                    rows={2}
                    value={formData.useCase}
                    onChange={handleChange}
                    placeholder="Tell us about your specific use case or project where you'd use this component..."
                    className="w-full px-3 py-2 rounded-md bg-background/60 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground focus:ring-1 focus:ring-primary/40 focus:border-primary/40 resize-none disabled:opacity-50"
                    disabled={isLoading}
                  />
                </InputGroup>
              </div>

              <DialogFooter className="gap-3">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-white/10"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-neutral-950/30 border-t-neutral-950 rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <span className="mr-2"><MoveRight/></span>
                      Submit
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const { scrollYProgress } = useScroll();

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Smooth scroll function
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    smoothScrollTo(targetId);
  };

  return (
    <header>
      <nav
        className={cn(
          "fixed z-20 w-full border-b border-neutral-800 transition-all duration-150",
          scrolled ? "bg-black/20 backdrop-blur-2xl" : "backdrop-blur-2xl"
        )}
      >
        <div className="mx-auto max-w-[85rem] min-w-0 px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between py-3 lg:py-4">
            {/* LEFT - Logo */}
            <div className="flex items-center gap-4 sm:gap-8">
              <div className="pr-4 sm:pr-8 border-r border-neutral-800">
                <Link
                  href="/"
                  aria-label="Backternity Home"
                  className="flex items-center space-x-2 "
                >
                    <Image src="/backternity.png"  alt="Backternity Logo" width={160} height={80} />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <ul className="hidden lg:flex gap-6 xl:gap-8 text-sm font-medium">
                <li>
                  <button
                    onClick={(e) => handleNavClick(e, "features")}
                    className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => handleNavClick(e, "solutions")}
                    className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                  >
                    Solutions
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => handleNavClick(e, "testimonials")}
                    className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                  >
                    Testimonials
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => handleNavClick(e, "contact")}
                    className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                </li>

                <Link href="/playground">
                  <button
                    className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                  >
                    Playground
                  </button>
                </Link>
              </ul>
            </div>

            {/* RIGHT - Search & Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search - Hidden on small screens, visible on medium+ */}
              <div className="hidden md:flex gap-4">
                <RequestAComponent />
                <SearchShortcut />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuState(!menuState)}
                className="lg:hidden p-2 text-neutral-400 hover:text-emerald-400 transition-colors"
                aria-label="Toggle menu"
              >
                {menuState ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Mobile Menu Overlay */}
            {menuState && (
              <div className="lg:hidden absolute top-full left-0 right-0 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
                <div className="px-4 py-6 space-y-4">
                  {/* Mobile Search */}
                  <div className="md:hidden mb-4">
                    <SearchShortcut />
                  </div>

                  {/* Mobile Navigation */}
                  <div className="space-y-3">
                    <button
                      onClick={(e) => {
                        handleNavClick(e, "features");
                        setMenuState(false);
                      }}
                      className="block w-full text-left text-emerald-400 hover:text-emerald-300 transition-colors py-2"
                    >
                      Features
                    </button>
                    <button
                      onClick={(e) => {
                        handleNavClick(e, "solutions");
                        setMenuState(false);
                      }}
                      className="block w-full text-left text-emerald-400 hover:text-emerald-300 transition-colors py-2"
                    >
                      Solutions
                    </button>
                    <button
                      onClick={(e) => {
                        handleNavClick(e, "testimonials");
                        setMenuState(false);
                      }}
                      className="block w-full text-left text-emerald-400 hover:text-emerald-300 transition-colors py-2"
                    >
                      Testimonials
                    </button>
                    <button
                      onClick={(e) => {
                        handleNavClick(e, "contact");
                        setMenuState(false);
                      }}
                      className="block w-full text-left text-emerald-400 hover:text-emerald-300 transition-colors py-2"
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
