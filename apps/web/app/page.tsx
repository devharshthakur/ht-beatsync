'use client';

import { FaGithub, FaCode, FaStar, FaHome } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { ThemeToggle } from '@repo/ui/components/theme-toggle';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="from-background via-background/98 to-background/95 text-foreground flex min-h-screen flex-col bg-gradient-to-b">
      {/* Navbar */}
      <header className="border-border/60 bg-background/75 dark:border-border/40 sticky top-0 z-10 w-full border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="group">
            <span className="from-primary via-primary/90 to-primary/80 group-hover:from-primary/90 group-hover:to-primary bg-gradient-to-r bg-clip-text text-2xl font-bold tracking-tight text-transparent transition-all duration-300">
              BeatSync
            </span>
            <span className="text-muted-foreground border-border/40 bg-background/50 dark:bg-background/30 ml-1 rounded-md border px-1.5 py-0.5 text-xs font-medium">
              PORT
            </span>
          </h1>
          <nav className="flex items-center gap-4">
            <a
              href="https://github.com/devharshthakur/ht-beatsync"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="border-border hover:border-primary hover:text-primary flex items-center gap-2 rounded-md border p-2 transition-all duration-200 hover:shadow-sm"
            >
              <FaGithub size={18} />
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center px-6 py-12 md:py-20">
        <div className="mx-auto w-full max-w-4xl space-y-16">
          {/* Hero Section */}
          <section aria-labelledby="hero-heading">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8 text-center"
            >
              <div className="bg-primary/15 text-primary ring-primary/40 border-primary/30 dark:ring-primary/50 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium shadow-sm ring-1">
                <span className="relative flex h-2 w-2">
                  <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                  <span className="bg-primary relative inline-flex h-2 w-2 rounded-full"></span>
                </span>
                In Development
              </div>

              <h2
                id="hero-heading"
                className="from-primary via-primary/90 to-primary/80 bg-gradient-to-r bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent sm:text-6xl md:text-7xl"
              >
                ht-beatSync
              </h2>

              <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
                A powerful Node.js port of the original BeatSync project, bringing enhanced performance and features to
                your audio synchronization needs.
              </p>

              <div className="flex justify-center">
                <div className="bg-background/60 border-border/50 dark:bg-background/40 flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium shadow-sm">
                  <HiDotsVertical className="text-primary" size={16} />
                  Node.js Port
                </div>
              </div>
            </motion.div>
          </section>

          {/* Features */}
          <section aria-labelledby="features-heading">
            <h2 id="features-heading" className="sr-only">
              Key Features
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid gap-8 md:grid-cols-2"
            >
              <article className="border-border/70 dark:border-border/40 bg-background/50 hover:border-primary/50 group rounded-xl border-2 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                <div className="bg-primary/15 text-primary ring-primary/30 border-primary/20 group-hover:bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full border ring-1 transition-all duration-300">
                  <FaCode size={20} />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Node.js Powered</h3>
                <p className="text-muted-foreground">
                  Built with modern Node.js technologies for efficient, scalable performance and enhanced developer
                  experience.
                </p>
              </article>

              <article className="border-border/70 dark:border-border/40 bg-background/50 hover:border-primary/50 group rounded-xl border-2 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                <div className="bg-primary/15 text-primary ring-primary/30 border-primary/20 group-hover:bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full border ring-1 transition-all duration-300">
                  <FaStar size={20} />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Enhanced Features</h3>
                <p className="text-muted-foreground">
                  Enjoy improved capabilities and optimizations while maintaining compatibility with the original
                  project.
                </p>
              </article>
            </motion.div>
          </section>

          {/* Description */}
          <section aria-labelledby="about-heading">
            <h2 id="about-heading" className="sr-only">
              About the Project
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="border-border/70 dark:border-border/40 bg-background/50 rounded-xl border-2 p-8 text-center shadow-sm backdrop-blur-sm"
            >
              <div className="mx-auto max-w-2xl space-y-6">
                <div className="bg-primary/15 text-primary ring-primary/30 border-primary/20 mx-auto mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border ring-1">
                  <FaHome size={18} />
                </div>

                <p className="text-foreground mb-4 text-lg">
                  👋 This is a Node.js port of the original{' '}
                  <a
                    href="https://github.com/freeman-jiang/beatsync"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary decoration-primary/30 hover:decoration-primary after:bg-primary relative font-medium underline decoration-2 underline-offset-4 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-all hover:after:w-full"
                  >
                    BeatSync project
                  </a>{' '}
                  by Freeman Jiang.
                </p>

                <p className="text-muted-foreground">
                  The frontend is currently under development. For comprehensive information about this port, including
                  setup instructions, technical details, and project structure, please refer to the
                  <a
                    href="https://github.com/devharshthakur/ht-beatsync#readme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary decoration-primary/30 hover:decoration-primary after:bg-primary relative font-medium underline decoration-2 underline-offset-4 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-all hover:after:w-full"
                  >
                    {' '}
                    README
                  </a>
                  .
                </p>
              </div>
            </motion.div>
          </section>

          {/* Call to Action */}
          <section aria-labelledby="cta-heading">
            <h2 id="cta-heading" className="sr-only">
              Get Started
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col justify-center gap-4 pt-4 sm:flex-row"
            >
              <a
                href="https://github.com/devharshthakur/ht-beatsync"
                target="_blank"
                rel="noopener noreferrer"
                className="border-border/70 dark:border-border/50 bg-background hover:border-primary/60 hover:bg-accent hover:text-accent-foreground group inline-flex items-center justify-center gap-2 rounded-lg border-2 px-6 py-3.5 font-medium shadow-sm transition-all duration-300"
              >
                <FaGithub size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span>View This Port</span>
              </a>

              <a
                href="https://github.com/freeman-jiang/beatsync"
                target="_blank"
                rel="noopener noreferrer"
                className="border-primary/70 bg-primary text-primary-foreground hover:border-primary hover:bg-primary/90 group inline-flex items-center justify-center gap-2 rounded-lg border-2 px-6 py-3.5 font-medium shadow-sm transition-all duration-300"
              >
                <FaGithub size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span>Original Project</span>
              </a>
            </motion.div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-border/60 dark:border-border/40 w-full border-t py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 text-sm sm:flex-row">
          <div className="text-muted-foreground mb-2 sm:mb-0">© 2024 BeatSync Node.js Port</div>
          <div className="text-muted-foreground">
            Based on{' '}
            <a
              href="https://beatsync.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground decoration-border/50 hover:decoration-primary/70 after:bg-primary relative inline-block font-medium underline decoration-2 underline-offset-4 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-all hover:after:w-full"
            >
              BeatSync
            </a>{' '}
            by Freeman Jiang
          </div>
        </div>
      </footer>
    </div>
  );
}
