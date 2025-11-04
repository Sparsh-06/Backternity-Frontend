'use client'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { useScroll } from 'motion/react'
import { FaProductHunt } from "react-icons/fa6";
import SearchCommand from './ui/search-command'
import SearchShortcut from './ui/search-command'

const menuItems = [
    { name: 'Features', href: '#link' },
    { name: 'Solution', href: '#link' },
    { name: 'About', href: '#link' },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe();
    }, [scrollYProgress])

    // Smooth scroll function
    const smoothScrollTo = (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            const headerHeight = 80; // Account for fixed header
            const elementPosition = element.offsetTop - headerHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
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
            <div className="mx-auto max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between py-3 lg:py-4">
                {/* LEFT - Logo */}
                <div className="flex items-center gap-4 sm:gap-8">
                  <div className="pr-4 sm:pr-8 border-r border-neutral-800">
                    <Link
                      href="/"
                      aria-label="Backternity Home"
                      className="flex items-center space-x-2 text-neutral-100 hover:text-emerald-400 transition-colors"
                    >
                      <h1 className="text-base sm:text-lg font-semibold">Backternity</h1>
                    </Link>
                  </div>

                  {/* Desktop Navigation */}
                  <ul className="hidden lg:flex gap-6 xl:gap-8 text-sm font-medium">
                    <li>
                      <button 
                        onClick={(e) => handleNavClick(e, 'features')}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                      >
                        Features
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={(e) => handleNavClick(e, 'solutions')}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                      >
                        Solutions
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={(e) => handleNavClick(e, 'testimonials')}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                      >
                        Testimonials
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={(e) => handleNavClick(e, 'contact')}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                      >
                        Contact
                      </button>
                    </li>
                  </ul>
                </div>

                {/* RIGHT - Search & Mobile Menu */}
                <div className="flex items-center gap-2 sm:gap-4">
                  {/* Search - Hidden on small screens, visible on medium+ */}
                  <div className="hidden md:flex">
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
                            handleNavClick(e, 'features');
                            setMenuState(false);
                          }}
                          className="block w-full text-left text-emerald-400 hover:text-emerald-300 transition-colors py-2"
                        >
                          Features
                        </button>
                        <button 
                          onClick={(e) => {
                            handleNavClick(e, 'solutions');
                            setMenuState(false);
                          }}
                          className="block w-full text-left text-emerald-400 hover:text-emerald-300 transition-colors py-2"
                        >
                          Solutions
                        </button>
                        <button 
                          onClick={(e) => {
                            handleNavClick(e, 'testimonials');
                            setMenuState(false);
                          }}
                          className="block w-full text-left text-emerald-400 hover:text-emerald-300 transition-colors py-2"
                        >
                          Testimonials
                        </button>
                        <button 
                          onClick={(e) => {
                            handleNavClick(e, 'contact');
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
}

