'use client';

import { useState, useEffect } from 'react';
import { FaGithub, FaCodeBranch, FaBook, FaGitAlt, FaCopy } from 'react-icons/fa';
import { BsGit } from 'react-icons/bs';
import { ChevronRight, ExternalLink, Database, GitPullRequest, Code2, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { motion } from 'motion/react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function ContributePage() {
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pb-24 pt-32">
        <div className="bg-grid-pattern bg-secondary/5 absolute inset-0 z-0 opacity-40"></div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="border-border bg-muted/10 text-muted-foreground mb-6 inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium shadow-sm backdrop-blur-sm transition-all hover:scale-105">
                <GitPullRequest className="mr-2 h-4 w-4" />
                Open Source Project
              </div>

              <h1 className="text-foreground from-primary to-primary/70 mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                How to Contribute
              </h1>

              <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg sm:text-xl lg:mx-0">
                Join me in building a better BeatSync. Your contributions help me learn and improve this project.
              </p>

              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 lg:justify-start">
                <motion.a
                  href="https://github.com/devharshthakur/ht-beatsync/fork"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground border-primary hover:bg-primary/90 relative inline-flex w-full items-center justify-center space-x-2 rounded-md border-2 px-6 py-3 text-base font-medium shadow-lg transition-all duration-300 hover:scale-105 sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCodeBranch className="h-5 w-5" />
                  <span>Fork Repository</span>
                </motion.a>
                <motion.a
                  href="https://github.com/devharshthakur/ht-beatsync/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary text-secondary-foreground border-primary/60 hover:bg-secondary/90 hover:border-primary relative inline-flex w-full items-center justify-center space-x-2 rounded-md border-2 px-6 py-3 text-base font-medium shadow-md transition-all duration-300 hover:scale-105 sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>View Issues</span>
                  <ExternalLink className="ml-1 h-4 w-4" />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="border-border bg-card hover:border-primary/50 overflow-hidden rounded-lg border shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                {/* App header */}
                <div className="border-border bg-secondary/10 flex items-center justify-between border-b px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-muted-foreground font-mono text-xs">contribution workflow</div>
                  <div className="w-16"></div> {/* Spacer for balance */}
                </div>

                {/* App content */}
                <div className="to-secondary/5 bg-gradient-to-b from-transparent p-6">
                  <div className="relative font-mono text-sm">
                    <div className="text-muted-foreground mb-4 font-bold opacity-75">{'// Git workflow example'}</div>
                    <div className="text-foreground/90">
                      git clone https://github.com/devharshthakur/ht-beatsync.git
                    </div>
                    <div className="text-foreground/90">cd ht-beatsync</div>
                    <div className="text-foreground/90">git checkout -b feature/your-feature</div>
                    <div className="text-primary mt-2 font-bold opacity-75">{'// Make your changes'}</div>
                    <div className="text-foreground/90">git add .</div>
                    <div className="text-foreground/90">git commit -m "Add awesome feature"</div>
                    <div className="text-foreground/90">git push origin feature/your-feature</div>
                    <div className="text-primary mt-2 font-bold opacity-75">
                      {'// Create a pull request to dev branch'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-primary/40 absolute right-1/2 top-1/2 -z-10 h-32 w-32 rounded-full blur-[100px]"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section id="getting-started" className="relative py-20">
        <div className="bg-noise-pattern absolute inset-0 z-0 opacity-5"></div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
          >
            <div className="bg-primary/10 text-primary mb-2 inline-block rounded-full px-3 py-1 text-sm font-medium">
              Step-by-Step Guide
            </div>
            <h2 className="text-foreground from-foreground to-foreground/70 mb-4 bg-gradient-to-r bg-clip-text text-3xl font-bold sm:text-4xl">
              Getting Started
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Follow these steps to start contributing to the BeatSync project
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div className="group relative" variants={fadeIn}>
              <div className="border-border bg-card hover:border-primary/50 relative h-full rounded-lg border p-6 shadow-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md shadow-sm transition-all group-hover:scale-110">
                  <FaGithub className="h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-semibold">Fork the Repository</h3>
                <p className="text-muted-foreground mb-4">
                  Start by forking the main repository to your GitHub account.
                </p>
                <a
                  href="https://github.com/devharshthakur/ht-beatsync"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary mt-4 flex items-center transition-all hover:underline group-hover:translate-x-1"
                >
                  Visit Repository
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>

            <motion.div className="group relative" variants={fadeIn}>
              <div className="border-border bg-card hover:border-primary/50 relative h-full rounded-lg border p-6 shadow-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md shadow-sm transition-all group-hover:scale-110">
                  <FaCodeBranch className="h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-semibold">Clone Your Fork</h3>
                <p className="text-muted-foreground mb-4">
                  Clone the repository to your local machine to start working on it.
                </p>
                <div className="bg-secondary/20 group-hover:bg-secondary/30 relative mt-4 flex items-center overflow-hidden rounded-md p-3 font-mono text-sm shadow-inner transition-all">
                  <div className="text-foreground/80 flex-grow break-all pr-2">
                    git clone https://github.com/devharshthakur/ht-beatsync.git
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('git clone https://github.com/devharshthakur/ht-beatsync.git');
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-foreground/70 hover:text-foreground hover:bg-secondary/30 relative rounded-md p-1 transition-colors duration-200"
                    aria-label="Copy clone command"
                  >
                    {copied ? (
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-8 right-0 rounded-md bg-green-500 px-2 py-1 text-xs text-white"
                      >
                        Copied!
                      </motion.span>
                    ) : null}
                    <FaCopy className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div className="group relative" variants={fadeIn}>
              <div className="border-border bg-card hover:border-primary/50 relative h-full rounded-lg border p-6 shadow-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md shadow-sm transition-all group-hover:scale-110">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-semibold">Install Dependencies</h3>
                <p className="text-muted-foreground mb-4">
                  Navigate to the project directory and install all required dependencies.
                </p>
                <div className="bg-secondary/20 group-hover:bg-secondary/30 mt-4 rounded-md p-3 font-mono text-sm shadow-inner transition-all">
                  <div className="text-foreground/80">cd ht-beatsync</div>
                  <div className="text-primary font-bold">pnpm install</div>
                </div>
              </div>
            </motion.div>

            <motion.div className="group relative" variants={fadeIn}>
              <div className="border-border bg-card hover:border-primary/50 relative h-full rounded-lg border p-6 shadow-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md shadow-sm transition-all group-hover:scale-110">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-semibold">Run Development Server</h3>
                <p className="text-muted-foreground mb-4">
                  Start the development server to see your changes in real-time.
                </p>
                <div className="bg-secondary/20 group-hover:bg-secondary/30 mt-4 rounded-md p-3 font-mono text-sm shadow-inner transition-all">
                  <div className="text-primary font-bold">pnpm dev</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Branching Strategy Section */}
      <section id="branching" className="bg-secondary/10 relative py-20">
        <div className="from-background absolute left-0 top-0 z-10 h-32 w-full bg-gradient-to-b to-transparent"></div>
        <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="border-border bg-card relative overflow-hidden rounded-lg border shadow-xl backdrop-blur-sm md:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="bg-primary/20 absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-30 blur-3xl"></div>
            <div className="bg-secondary/30 absolute -bottom-24 -left-24 h-64 w-64 rounded-full opacity-30 blur-3xl"></div>

            <div className="relative grid grid-cols-1 items-center gap-10 p-8 lg:grid-cols-2">
              <div>
                <div className="bg-primary/10 text-primary mb-6 inline-flex h-12 w-12 items-center justify-center rounded-md shadow-sm transition-all hover:scale-105">
                  <BsGit className="h-6 w-6" />
                </div>

                <h2 className="text-foreground mb-6 text-3xl font-bold">Branching Strategy</h2>

                <p className="text-foreground/80 mb-6">
                  When contributing, please create a branch with the following naming conventions:
                </p>

                <div className="space-y-4">
                  <motion.div
                    className="border-border rounded-md border p-4 shadow-md transition-all hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/5"
                    whileHover={{ y: -5 }}
                  >
                    <div className="mb-1 flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                      <h4 className="text-foreground font-medium">Feature Branch</h4>
                    </div>
                    <div className="bg-secondary/20 mt-2 rounded p-2 font-mono text-sm shadow-inner">
                      feature/&lt;what-you're-adding&gt;
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm">Example: feature/login-page</p>
                  </motion.div>

                  <motion.div
                    className="border-border rounded-md border p-4 shadow-md transition-all hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/5"
                    whileHover={{ y: -5 }}
                  >
                    <div className="mb-1 flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                      <h4 className="text-foreground font-medium">Fix Branch</h4>
                    </div>
                    <div className="bg-secondary/20 mt-2 rounded p-2 font-mono text-sm shadow-inner">
                      fix/&lt;what-you're-fixing&gt;
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm">Example: fix/button-alignment</p>
                  </motion.div>

                  <motion.div
                    className="border-border rounded-md border p-4 shadow-md transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5"
                    whileHover={{ y: -5 }}
                  >
                    <div className="mb-1 flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
                      <h4 className="text-foreground font-medium">Change Branch</h4>
                    </div>
                    <div className="bg-secondary/20 mt-2 rounded p-2 font-mono text-sm shadow-inner">
                      change/&lt;what-you're-changing&gt;
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm">Example: change/button-styles</p>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="border-border bg-card/80 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl">
                  <CardHeader className="bg-secondary/10 border-border/50 border-b">
                    <CardTitle className="flex items-center text-xl">
                      <GitPullRequest className="text-primary mr-2 h-5 w-5" />
                      Git Workflow
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div className="flex">
                      <div className="mr-4 pt-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 font-medium text-green-500 shadow-sm dark:bg-green-500/10">
                          1
                        </div>
                      </div>
                      <div>
                        <h4 className="text-foreground text-lg font-medium">Fork from Main</h4>
                        <p className="text-muted-foreground">
                          Always fork from the{' '}
                          <code className="bg-secondary/30 text-primary rounded px-1.5 py-0.5">main</code> branch to
                          ensure you're working with the most stable version.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="mr-4 pt-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 font-medium text-blue-500 shadow-sm dark:bg-blue-500/10">
                          2
                        </div>
                      </div>
                      <div>
                        <h4 className="text-foreground text-lg font-medium">Create PR to Dev</h4>
                        <p className="text-muted-foreground">
                          Submit your pull request targeting the{' '}
                          <code className="bg-secondary/30 text-primary rounded px-1.5 py-0.5">dev</code> branch, not{' '}
                          <code className="bg-secondary/30 rounded px-1.5 py-0.5">main</code>.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="mr-4 pt-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 font-medium text-purple-500 shadow-sm dark:bg-purple-500/10">
                          3
                        </div>
                      </div>
                      <div>
                        <h4 className="text-foreground text-lg font-medium">Testing in Dev</h4>
                        <p className="text-muted-foreground">
                          Once merged to <code className="bg-secondary/30 text-primary rounded px-1.5 py-0.5">dev</code>
                          , your changes undergo more thorough testing alongside other features.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="mr-4 pt-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 font-medium text-amber-500 shadow-sm dark:bg-amber-500/10">
                          4
                        </div>
                      </div>
                      <div>
                        <h4 className="text-foreground text-lg font-medium">Promotion to Main</h4>
                        <p className="text-muted-foreground">
                          After rigorous testing, changes from{' '}
                          <code className="bg-secondary/30 text-primary rounded px-1.5 py-0.5">dev</code> are batched
                          and merged to <code className="bg-secondary/30 rounded px-1.5 py-0.5">main</code>.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Making Changes Section */}
      <section id="changes" className="relative py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
          >
            <div className="bg-primary/10 text-primary mb-2 inline-block rounded-full px-3 py-1 text-sm font-medium">
              Best Practices
            </div>
            <h2 className="text-foreground from-foreground to-foreground/70 mb-4 bg-gradient-to-r bg-clip-text text-3xl font-bold sm:text-4xl">
              Making Quality Changes
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Follow these best practices to ensure your contributions are high quality and easy to review
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div className="group relative" variants={fadeIn}>
              <div className="border-border bg-card hover:border-primary/50 relative h-full rounded-lg border p-6 shadow-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md shadow-sm transition-all group-hover:scale-110">
                  <Code2 className="h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-semibold">Code Style</h3>
                <p className="text-muted-foreground mb-4">
                  Write clean, readable code that matches the existing style. Use TypeScript properly and avoid any type
                  when possible.
                </p>
                <ul className="text-muted-foreground list-inside list-disc space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Make changes in small, focused steps</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Add comments to explain complex logic</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Match existing code style</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Use TypeScript properly (avoid any)</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div className="group relative" variants={fadeIn}>
              <div className="border-border bg-card hover:border-primary/50 relative h-full rounded-lg border p-6 shadow-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md shadow-sm transition-all group-hover:scale-110">
                  <FaGitAlt className="h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-semibold">Commit Messages</h3>
                <p className="text-muted-foreground mb-4">
                  Write clear, descriptive commit messages that explain what you changed and why. Reference issues when
                  applicable.
                </p>
                <ul className="text-muted-foreground list-inside list-disc space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Use present tense ("Add feature" not "Added feature")</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>First line should be a summary (50 chars or less)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Reference issues (e.g., "Fixes #123")</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Describe why changes were made, not just what</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div className="group relative" variants={fadeIn}>
              <div className="border-border bg-card hover:border-primary/50 relative h-full rounded-lg border p-6 shadow-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md shadow-sm transition-all group-hover:scale-110">
                  <FaBook className="h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-semibold">Documentation</h3>
                <p className="text-muted-foreground mb-4">
                  Document your code with proper JSDoc comments and update any relevant documentation files.
                </p>
                <ul className="text-muted-foreground list-inside list-disc space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Use JSDoc for functions/methods/classes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Include parameter types and return values</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Add examples where helpful</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Update README or docs for significant changes</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-border overflow-hidden shadow-lg">
              <div className="border-border/40 bg-secondary/30 border-b p-3">
                <div className="text-muted-foreground flex items-center font-mono text-sm">
                  <Code2 className="text-primary mr-2 h-4 w-4" />
                  JSDoc Example
                </div>
              </div>
              <CardContent className="bg-card overflow-hidden p-4 font-mono text-sm">
                <pre className="text-muted-foreground bg-secondary/5 overflow-x-auto rounded p-4 backdrop-blur-sm">
                  {`/**
 * Calculates the total price including tax
 * 
 * @param {number} price - The base price of the item
 * @param {number} taxRate - The tax rate as a decimal (e.g., 0.07 for 7%)
 * @returns {number} The total price including tax
 * 
 * @example
 * // Returns 107
 * calculateTotal(100, 0.07);
 */
function calculateTotal(price: number, taxRate: number): number {
  return price * (1 + taxRate);
}`}
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Pull Requests Section */}
      <section id="pull-requests" className="bg-secondary/10 relative py-20">
        <div className="from-background absolute left-0 top-0 z-10 h-32 w-full bg-gradient-to-b to-transparent"></div>
        <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="border-border bg-card relative overflow-hidden rounded-lg border shadow-xl backdrop-blur-sm md:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="bg-primary/20 absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-30 blur-3xl"></div>
            <div className="bg-secondary/30 absolute -bottom-24 -left-24 h-64 w-64 rounded-full opacity-30 blur-3xl"></div>

            <div className="relative p-8">
              <div className="mb-8">
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md shadow-sm transition-all hover:scale-105">
                  <GitPullRequest className="h-6 w-6" />
                </div>
                <h2 className="text-foreground mb-4 text-3xl font-bold">Creating Pull Requests</h2>
                <p className="text-muted-foreground max-w-2xl">
                  Creating a good pull request helps maintainers understand and review your changes quickly.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-foreground mb-4 text-xl font-semibold">What to Include</h3>
                  <ul className="text-muted-foreground space-y-3">
                    <li className="flex items-start transition-all hover:translate-x-1">
                      <div className="mr-3 mt-1 text-green-500">✓</div>
                      <div>
                        <strong className="text-primary">Descriptive title</strong> - Clearly state what your PR does
                      </div>
                    </li>
                    <li className="flex items-start transition-all hover:translate-x-1">
                      <div className="mr-3 mt-1 text-green-500">✓</div>
                      <div>
                        <strong className="text-primary">Issue references</strong> - Link to related issues (e.g.,
                        "Fixes #123")
                      </div>
                    </li>
                    <li className="flex items-start transition-all hover:translate-x-1">
                      <div className="mr-3 mt-1 text-green-500">✓</div>
                      <div>
                        <strong className="text-primary">Screenshots</strong> - For UI changes, include before/after
                        images
                      </div>
                    </li>
                    <li className="flex items-start transition-all hover:translate-x-1">
                      <div className="mr-3 mt-1 text-green-500">✓</div>
                      <div>
                        <strong className="text-primary">Test results</strong> - Mention what tests you've run
                      </div>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="border-border bg-card hover:border-primary/30 overflow-hidden rounded-lg border shadow-lg transition-all hover:shadow-xl">
                    <div className="border-border bg-secondary/10 flex items-center border-b px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-muted-foreground ml-3 font-mono text-xs">pull_request_template.md</div>
                    </div>
                    <div className="to-secondary/5 bg-gradient-to-b from-transparent p-4 font-mono text-sm">
                      <div className="text-primary mb-2 font-bold">## Description</div>
                      <div className="text-muted-foreground mb-4">A clear description of what this PR does...</div>

                      <div className="text-primary mb-2 font-bold">## Related Issues</div>
                      <div className="text-muted-foreground mb-4">Fixes #123</div>

                      <div className="text-primary mb-2 font-bold">## Screenshots</div>
                      <div className="text-muted-foreground mb-4">
                        If applicable, add screenshots to help explain...
                      </div>

                      <div className="text-primary mb-2 font-bold">## Testing</div>
                      <div className="text-muted-foreground">Describe the tests you ran to verify your changes...</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="border-border bg-card relative overflow-hidden rounded-lg border p-8 text-center shadow-lg md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="from-primary/5 to-secondary/5 absolute inset-0 z-0 bg-gradient-to-br"></div>
            <div className="bg-primary/10 absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl"></div>
            <div className="bg-secondary/10 absolute -bottom-24 -left-24 h-64 w-64 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <motion.h2
                className="text-foreground from-primary to-primary/80 mb-6 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent sm:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Ready to Contribute?
              </motion.h2>

              <motion.p
                className="text-muted-foreground mx-auto mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Join me in making BeatSync better. Your contributions help me learn and improve this project.
              </motion.p>

              <motion.div
                className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href="https://github.com/devharshthakur/ht-beatsync/fork"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground border-primary hover:bg-primary/90 relative inline-flex w-full max-w-xs items-center justify-center space-x-2 rounded-md border-2 px-6 py-3 text-base font-medium shadow-lg transition-all duration-300 sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCodeBranch className="h-5 w-5" />
                  <span>Fork Repository</span>
                </motion.a>
                <motion.a
                  href="https://github.com/devharshthakur/ht-beatsync"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary text-secondary-foreground border-primary/60 hover:bg-secondary/90 hover:border-primary relative inline-flex w-full max-w-xs items-center justify-center space-x-2 rounded-md border-2 px-6 py-3 text-base font-medium shadow-md transition-all duration-300 sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="h-5 w-5" />
                  <span>Star on GitHub</span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
