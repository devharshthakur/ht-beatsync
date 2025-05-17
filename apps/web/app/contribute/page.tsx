'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Copy, ExternalLink, Home, GithubIcon, GitForkIcon, HeartIcon, CheckIcon } from 'lucide-react';

import { Button } from '@workspace/ui/components/button';
import { Badge } from '@workspace/ui/components/badge';
import { ThemeToggle } from '@workspace/ui/components/theme-toggle';
import { Separator } from '@workspace/ui/components/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@workspace/ui/components/accordion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@workspace/ui/components/tooltip';

export default function ContributePage() {
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});
  const [scrolled, setScrolled] = useState(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(prev => ({ ...prev, [key]: true }));
    setTimeout(() => setCopied(prev => ({ ...prev, [key]: false })), 2000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define table of contents items
  const tocItems = [
    { icon: '🛠️', title: 'Setup & Installation', href: '#setup' },
    { icon: '🔄', title: 'Git Workflow', href: '#workflow' },
    { icon: '🌿', title: 'Branching Strategy', href: '#branching' },
    { icon: '📝', title: 'Code Style', href: '#code-style' },
    { icon: '🔍', title: 'Pull Requests', href: '#pull-requests' },
    { icon: '❓', title: 'Getting Help', href: '#help' },
  ];

  return (
    <div className="bg-background relative min-h-screen">
      {/* Navigation bar - fixed */}
      <div
        className={`sticky top-0 z-50 w-full transition-all ${scrolled ? 'bg-background/95 shadow-sm backdrop-blur' : 'bg-background'}`}
      >
        <div className="relative flex w-full justify-between py-4">
          <div className="absolute left-6">
            <Button asChild variant="outline" size="icon" className="border-border rounded-md border">
              <Link href="/">
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
          </div>
          <div className="absolute right-6">
            <div className="border-border rounded-md border">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="mx-auto max-w-5xl px-4 py-12">
        {/* Header */}
        <div className="mb-16 space-y-6 text-center">
          <Badge variant="outline" className="px-3 py-1 text-sm">
            ✨ Open Source Project
          </Badge>
          <h1 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Contributing to BeatSync
          </h1>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            Thank you for your interest in contributing to BeatSync! This guide will help you get started with
            contributing to the project.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="default" className="gap-2">
              <a href="https://github.com/devharshthakur/ht-beatsync/fork" target="_blank" rel="noopener noreferrer">
                <GitForkIcon className="h-4 w-4" />
                <span>Fork Repository</span>
              </a>
            </Button>
            <Button asChild variant="outline" size="default" className="gap-2">
              <a href="https://github.com/devharshthakur/ht-beatsync/issues" target="_blank" rel="noopener noreferrer">
                <span>View Issues</span>
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Table of Contents */}
        <Card className="mb-16 border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">📚 Table of Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {tocItems.map(item => (
                <Card key={item.href} className="hover:bg-muted/50 border transition-colors">
                  <CardContent className="p-4">
                    <a
                      href={item.href}
                      className="text-primary flex items-center gap-3 text-sm font-medium no-underline transition-colors"
                    >
                      <div className="bg-background flex h-9 w-9 items-center justify-center rounded-lg border-2">
                        <span className="text-lg">{item.icon}</span>
                      </div>
                      <span className="text-foreground">{item.title}</span>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section: Setup & Installation */}
        <section id="setup" className="mb-16 scroll-mt-20">
          <div className="border-primary mb-8 border-l-4 pl-6">
            <h2 className="text-3xl font-bold">🛠️ Setup & Installation</h2>
          </div>

          <div className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="py-4 text-xl font-semibold no-underline hover:no-underline">
                  1. Fork & Clone
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-4">
                    First, fork the repository on GitHub, then clone your fork locally:
                  </p>
                  <div className="bg-muted/30 border-border/50 relative overflow-hidden rounded-lg border-2 p-4 font-mono text-sm shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-foreground/90 flex-1 whitespace-pre-wrap">
                        git clone https://github.com/YOUR-USERNAME/ht-beatsync.git
                      </div>
                      <div className="flex h-full items-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="bg-background/80 hover:bg-background h-8 w-8 rounded-md"
                                onClick={() =>
                                  copyToClipboard('git clone https://github.com/YOUR-USERNAME/ht-beatsync.git', 'clone')
                                }
                              >
                                {copied['clone'] ? (
                                  <CheckIcon className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{copied['clone'] ? 'Copied!' : 'Copy to clipboard'}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-none">
                <AccordionTrigger className="py-4 text-xl font-semibold no-underline hover:no-underline">
                  2. Navigate & Install Dependencies
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-4">
                    Navigate to the project directory and install dependencies:
                  </p>
                  <div className="bg-muted/30 border-border/50 relative overflow-hidden rounded-lg border-2 p-4 font-mono text-sm shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-foreground/90 flex-1 whitespace-pre-wrap">cd ht-beatsync pnpm install</div>
                      <div className="flex h-full items-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="bg-background/80 hover:bg-background h-8 w-8 rounded-md"
                                onClick={() => copyToClipboard('cd ht-beatsync\npnpm install', 'install')}
                              >
                                {copied['install'] ? (
                                  <CheckIcon className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{copied['install'] ? 'Copied!' : 'Copy to clipboard'}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-none">
                <AccordionTrigger className="py-4 text-xl font-semibold no-underline hover:no-underline">
                  3. Start Development Server
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-4">
                    Run the development server to see your changes in real-time:
                  </p>
                  <div className="bg-muted/30 border-border/50 relative overflow-hidden rounded-lg border-2 p-4 font-mono text-sm shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-foreground/90 flex-1 whitespace-pre-wrap">pnpm dev</div>
                      <div className="flex h-full items-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="bg-background/80 hover:bg-background h-8 w-8 rounded-md"
                                onClick={() => copyToClipboard('pnpm dev', 'dev')}
                              >
                                {copied['dev'] ? (
                                  <CheckIcon className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{copied['dev'] ? 'Copied!' : 'Copy to clipboard'}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4 text-sm">
                    The development server will start at{' '}
                    <span className="text-foreground font-semibold">http://localhost:3000</span>.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Section: Git Workflow */}
        <section id="workflow" className="mb-16 scroll-mt-20">
          <div className="border-primary mb-8 border-l-4 pl-6">
            <h2 className="text-3xl font-bold">🔄 Git Workflow</h2>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground">Follow these steps to contribute changes to the project:</p>

            <div className="mt-10 space-y-12">
              <div className="relative">
                <div className="bg-border absolute bottom-0 left-8 top-10 w-px"></div>
                <div className="flex">
                  <div className="bg-background z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-md border">
                    <GitForkIcon className="text-primary h-6 w-6" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold">Create a new branch</h3>
                    <p className="text-muted-foreground mb-4">Always create a new branch for your changes:</p>
                    <div className="bg-muted/30 border-border/50 relative overflow-hidden rounded-lg border-2 p-4 font-mono text-sm shadow-sm">
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-foreground/90 flex-1 whitespace-pre-wrap">
                          git checkout -b feature/your-feature-name
                        </div>
                        <div className="flex h-full items-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="bg-background/80 hover:bg-background h-8 w-8 rounded-md"
                                  onClick={() => copyToClipboard('git checkout -b feature/your-feature-name', 'branch')}
                                >
                                  {copied['branch'] ? (
                                    <CheckIcon className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{copied['branch'] ? 'Copied!' : 'Copy to clipboard'}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-border absolute bottom-0 left-8 top-10 w-px"></div>
                <div className="flex">
                  <div className="bg-background z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-md border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary h-6 w-6"
                    >
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold">Make your changes</h3>
                    <p className="text-muted-foreground">Make the necessary changes to the codebase.</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-border absolute bottom-0 left-8 top-10 w-px"></div>
                <div className="flex">
                  <div className="bg-background z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-md border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary h-6 w-6"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <line x1="12" y1="3" x2="12" y2="9" />
                      <line x1="12" y1="15" x2="12" y2="21" />
                    </svg>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold">Commit your changes</h3>
                    <p className="text-muted-foreground mb-4">
                      Stage and commit your changes with a descriptive message:
                    </p>
                    <div className="bg-muted/30 border-border/50 relative overflow-hidden rounded-lg border-2 p-4 font-mono text-sm shadow-sm">
                      <div className="flex items-start justify-between gap-4">
                        <div className="text-foreground/90 flex-1 whitespace-pre-wrap">
                          git add . git commit -m "Add feature: your feature description"
                        </div>
                        <div className="flex h-full items-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="bg-background/80 hover:bg-background h-8 w-8 rounded-md"
                                  onClick={() =>
                                    copyToClipboard(
                                      'git add .\ngit commit -m "Add feature: your feature description"',
                                      'commit',
                                    )
                                  }
                                >
                                  {copied['commit'] ? (
                                    <CheckIcon className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{copied['commit'] ? 'Copied!' : 'Copy to clipboard'}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-border absolute bottom-0 left-8 top-10 w-px"></div>
                <div className="flex">
                  <div className="bg-background z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-md border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary h-6 w-6"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold">Push to your fork</h3>
                    <p className="text-muted-foreground mb-4">Push your changes to your forked repository:</p>
                    <div className="bg-muted/30 border-border/50 relative overflow-hidden rounded-lg border-2 p-4 font-mono text-sm shadow-sm">
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-foreground/90 flex-1 whitespace-pre-wrap">
                          git push origin feature/your-feature-name
                        </div>
                        <div className="flex h-full items-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="bg-background/80 hover:bg-background h-8 w-8 rounded-md"
                                  onClick={() => copyToClipboard('git push origin feature/your-feature-name', 'push')}
                                >
                                  {copied['push'] ? (
                                    <CheckIcon className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{copied['push'] ? 'Copied!' : 'Copy to clipboard'}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex">
                  <div className="bg-background z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-md border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary h-6 w-6"
                    >
                      <circle cx="18" cy="18" r="3" />
                      <circle cx="6" cy="6" r="3" />
                      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                      <line x1="6" y1="9" x2="6" y2="21" />
                    </svg>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold">Create a Pull Request</h3>
                    <p className="text-muted-foreground">
                      Go to the GitHub repository and create a pull request from your branch to the{' '}
                      <code className="bg-card border-border rounded border px-1 py-0.5">dev</code> branch of the
                      original repository.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Branching Strategy */}
        <section id="branching" className="mb-16 scroll-mt-20">
          <div className="border-primary mb-8 border-l-4 pl-6">
            <h2 className="text-3xl font-bold">🌿 Branching Strategy</h2>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground">Use the following naming conventions for branches:</p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-2 border-green-500">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-green-500">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <CardTitle className="text-base">Feature Branch</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="bg-card/80 border-border mt-2 rounded border p-2 font-mono text-sm">
                    feature/&lt;what-you're-adding&gt;
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Example:{' '}
                    <code className="bg-card border-border rounded border px-1 py-0.5">feature/login-page</code>
                  </p>
                  <p className="text-muted-foreground text-sm">For new features or major additions to the codebase.</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-500">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-red-500">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <CardTitle className="text-base">Fix Branch</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="bg-card/80 border-border mt-2 rounded border p-2 font-mono text-sm">
                    fix/&lt;what-you're-fixing&gt;
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Example:{' '}
                    <code className="bg-card border-border rounded border px-1 py-0.5">fix/button-alignment</code>
                  </p>
                  <p className="text-muted-foreground text-sm">For bug fixes or error corrections.</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-500">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-blue-500">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <CardTitle className="text-base">Change Branch</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="bg-card/80 border-border mt-2 rounded border p-2 font-mono text-sm">
                    change/&lt;what-you're-changing&gt;
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Example:{' '}
                    <code className="bg-card border-border rounded border px-1 py-0.5">change/button-styles</code>
                  </p>
                  <p className="text-muted-foreground text-sm">
                    For refinements or style updates to existing functionality.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 border-2">
              <CardHeader>
                <CardTitle>⚠️ Important Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-muted-foreground">
                      Always fork from the{' '}
                      <code className="bg-card border-border rounded border px-1 py-0.5">main</code> branch.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-muted-foreground">
                      Create pull requests to the{' '}
                      <code className="bg-card border-border rounded border px-1 py-0.5">dev</code> branch, not{' '}
                      <code className="bg-card border-border rounded border px-1 py-0.5">main</code>.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-muted-foreground">
                      Keep PRs focused on a single feature or fix for easier review.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section: Code Style */}
        <section id="code-style" className="mb-16 scroll-mt-20">
          <div className="border-primary mb-8 border-l-4 pl-6">
            <h2 className="text-3xl font-bold">📝 Code Style</h2>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground">
              Follow these guidelines to ensure your code matches the project style:
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>TypeScript Best Practices</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      <span className="text-muted-foreground">Use proper type annotations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      <span className="text-muted-foreground">
                        Avoid using the <code className="bg-card border-border rounded border px-1 py-0.5">any</code>{' '}
                        type
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      <span className="text-muted-foreground">Use interfaces for object types</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      <span className="text-muted-foreground">Define function parameter and return types</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Code Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      <span className="text-muted-foreground">Add JSDoc comments to functions and complex logic</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      <span className="text-muted-foreground">Document component props with descriptions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      <span className="text-muted-foreground">Add examples where helpful</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6 border-2">
              <CardHeader>
                <CardTitle>📄 JSDoc Example</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-card border-border overflow-x-auto rounded-md border-2 p-4 font-mono text-sm">
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
          </div>
        </section>

        {/* Section: Pull Requests */}
        <section id="pull-requests" className="mb-16 scroll-mt-20">
          <div className="border-primary mb-8 border-l-4 pl-6">
            <h2 className="text-3xl font-bold">🔍 Pull Requests</h2>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground">When creating a pull request, include the following information:</p>

            <Card className="mt-6 border-2">
              <CardHeader>
                <CardTitle>Pull Request Template</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-card border-border rounded-md border-2 p-6 font-mono text-sm">
                  <div className="text-primary mb-2 font-bold">## Description</div>
                  <div className="text-muted-foreground mb-4">A clear description of what this PR does...</div>

                  <div className="text-primary mb-2 font-bold">## Related Issues</div>
                  <div className="text-muted-foreground mb-4">Fixes #123</div>

                  <div className="text-primary mb-2 font-bold">## Screenshots</div>
                  <div className="text-muted-foreground mb-4">If applicable, add screenshots to help explain...</div>

                  <div className="text-primary mb-2 font-bold">## Testing</div>
                  <div className="text-muted-foreground">Describe the tests you ran to verify your changes...</div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>✅ Do</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      <span className="text-muted-foreground">Keep PRs focused on a single feature or fix</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      <span className="text-muted-foreground">Include screenshots for UI changes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      <span className="text-muted-foreground">Reference related issues</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      <span className="text-muted-foreground">Respond to reviewer feedback promptly</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>❌ Don't</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-2 text-red-500">✗</span>
                      <span className="text-muted-foreground">Include multiple unrelated changes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-red-500">✗</span>
                      <span className="text-muted-foreground">Submit PRs without adequate testing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-red-500">✗</span>
                      <span className="text-muted-foreground">Ignore code style guidelines</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-red-500">✗</span>
                      <span className="text-muted-foreground">Submit PRs to the main branch directly</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section: Getting Help */}
        <section id="help" className="mb-16 scroll-mt-20">
          <div className="border-primary mb-8 border-l-4 pl-6">
            <h2 className="text-3xl font-bold">❓ Getting Help</h2>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground">If you need help or have questions, you can:</p>

            <Card className="border-2">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-primary mr-3">•</span>
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Open an issue</strong> on the GitHub repository with a
                      question or problem
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">•</span>
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Check existing issues</strong> to see if your question has
                      been asked before
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">•</span>
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Review documentation</strong> in the repository README and
                      docs folder
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="bg-primary/5 mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full">
              <HeartIcon className="text-primary h-10 w-10" />
            </div>
            <h2 className="from-primary to-primary/80 mb-8 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
              Ready to Contribute?
            </h2>
            <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg">
              Your contributions make BeatSync better. Every PR, issue, and suggestion helps us improve the project!
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="min-w-[200px] gap-2">
                <a href="https://github.com/devharshthakur/ht-beatsync/fork" target="_blank" rel="noopener noreferrer">
                  <GitForkIcon className="h-5 w-5" />
                  <span>Fork Repository</span>
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-[200px] gap-2 border-2">
                <a href="https://github.com/devharshthakur/ht-beatsync" target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="h-5 w-5" />
                  <span>Star on GitHub</span>
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
