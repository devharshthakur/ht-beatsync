'use client';

import { FaGithub } from 'react-icons/fa';
import { ThemeToggle } from '@repo/ui/components/theme-toggle';

export default function Home() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      {/* Navbar */}
      <nav className="border-border bg-background/80 sticky top-0 z-10 w-full border-b backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-xl font-semibold">BeatSync</span>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center p-6 md:p-10">
        <div className="mx-auto w-full max-w-3xl space-y-14 py-6">
          {/* Hero Section */}
          <div className="space-y-6 text-center">
            <div className="text-primary bg-primary/10 border-primary/20 inline-block rounded-md border px-4 py-2 text-sm font-medium">
              In Development
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">BeatSync</h1>

            <div className="flex justify-center">
              <div className="border-border bg-background/60 mb-2 rounded-md border px-3 py-1 text-sm font-medium">A Node.js Port</div>
            </div>
          </div>

          {/* Description */}
          <div className="border-border space-y-5 border-y py-4 text-center">
            <p className="text-foreground text-lg">
              👋 This is a Node.js port of the original{' '}
              <a
                href="https://github.com/freeman-jiang/beatsync"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                BeatSync project
              </a>{' '}
              by Freeman Jiang.
            </p>

            <p className="text-muted-foreground">
              The frontend is currently under development. For comprehensive information about this port, including setup instructions, technical
              details, and project structure, please refer to the
              <a
                href="https://github.com/devharshthakur/ht-beatsync#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                {' '}
                README
              </a>
              .
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
            <a
              href="https://github.com/devharshthakur/ht-beatsync"
              target="_blank"
              rel="noopener noreferrer"
              className="border-input bg-background hover:bg-accent inline-flex items-center justify-center gap-2 rounded-md border px-6 py-3 font-medium transition-colors"
            >
              <FaGithub size={18} />
              <span>View This Port</span>
            </a>

            <a
              href="https://github.com/freeman-jiang/beatsync"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-medium transition-colors"
            >
              <FaGithub size={18} />
              <span>Original Project</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-border w-full border-t py-5">
        <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col items-center justify-between px-6 text-sm sm:flex-row">
          <div className="mb-2 sm:mb-0">© 2024 BeatSync Node.js Port</div>
          <div>
            Based on{' '}
            <a href="https://beatsync.gg" target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline">
              BeatSync
            </a>{' '}
            by Freeman Jiang
          </div>
        </div>
      </footer>
    </div>
  );
}
