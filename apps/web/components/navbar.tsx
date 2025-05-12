'use client';

import { useState, useEffect } from 'react';
import { ThemeToggle } from '@workspace/ui/components/theme-toggle';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, GitPullRequest, Info } from 'lucide-react'; // Added Info icon

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-card/90 border-border border-b backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-8 w-8">
                <div className="from-muted to-muted-foreground absolute inset-0 rounded-md bg-gradient-to-r"></div>
                <div className="bg-background absolute inset-[2px] flex items-center justify-center rounded-md">
                  <Image src="/icon.svg" alt="BeatSync Icon" width={16} height={16} className="text-muted-foreground" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="from-muted-foreground to-foreground bg-gradient-to-r bg-clip-text text-transparent">
                  BeatSync
                </span>
                <span className="text-muted-foreground bg-secondary ml-1 rounded px-1.5 py-0.5 text-xs font-medium">
                  PORT
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-6 md:flex">
            <Link
              href="/about"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border-primary/60 flex items-center space-x-1 rounded-md border-2 px-4 py-1.5 text-sm font-medium transition-colors"
            >
              <Info className="h-4 w-4" /> {/* Added Info icon for About */}
              <span>About</span>
            </Link>
            <div className="flex items-center space-x-5">
              <Link
                href="/contribute"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border-primary/60 flex items-center space-x-1 rounded-md border-2 px-4 py-1.5 text-sm font-medium transition-colors"
              >
                <GitPullRequest className="h-4 w-4" />
                <span>Contribute</span>
              </Link>
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-muted-foreground hover:bg-secondary hover:text-foreground inline-flex items-center justify-center rounded-md p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="bg-card border-border border-b md:hidden">
          <div className="space-y-1 px-4 py-4">
            <Link
              href="/about"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center space-x-2 py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Info className="h-5 w-5" /> {/* Added Info icon for About */}
              <span>About</span>
            </Link>
            <Link
              href="/contribute"
              className="text-foreground/80 hover:text-foreground flex items-center space-x-2 py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <GitPullRequest className="h-5 w-5" />
              <span>Contribute</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
