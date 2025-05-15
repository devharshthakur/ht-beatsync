'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@workspace/ui/components/theme-toggle';
import { FaGithub, FaCodeBranch, FaBook, FaGitAlt, FaCopy } from 'react-icons/fa';
import { ChevronRight, ExternalLink, Database, GitPullRequest, Code2, Zap, Github, Home } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@workspace/ui/components/accordion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@workspace/ui/components/hover-card';
import { Badge } from '@workspace/ui/components/badge';

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
    <div className="bg-background relative min-h-screen">
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]" />

      {/* Theme toggle positioned at top-right */}
      <div className="absolute right-6 top-6 z-10">
        <div className="border-border rounded-md border-2">
          <ThemeToggle />
        </div>
      </div>

      {/* Home button positioned at top-left */}
      <div className="absolute left-6 top-6 z-10">
        <Button asChild variant="outline" size="icon" className="border-border rounded-md border-2">
          <Link href="/">
            <Home className="h-5 w-5" />
            <span className="sr-only">Go to home page</span>
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <Badge className="px-3 py-1">Open Source Project</Badge>

              <h1 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                How to Contribute
              </h1>

              <p className="text-muted-foreground max-w-xl text-lg sm:text-xl">
                Join me in building ht-beatSync. Your contributions help me learn and improve this project.
              </p>

              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <Button asChild size="lg" className="gap-2">
                  <a
                    href="https://github.com/devharshthakur/ht-beatsync/fork"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaCodeBranch className="h-5 w-5" />
                    <span>Fork Repository</span>
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <a
                    href="https://github.com/devharshthakur/ht-beatsync/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>View Issues</span>
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            <Card className="border-border shadow-lg">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-muted-foreground font-mono text-lg">
                    <span className="flex">
                      <GitPullRequest className="mr-2" />
                      contribution workflow
                    </span>
                  </div>
                  <div className="w-16"></div>
                </div>
              </CardHeader>
              <CardContent className="to-secondary/5 bg-gradient-to-b from-transparent p-6 font-mono text-sm">
                <div>
                  <div className="text-muted-foreground mb-4 font-bold opacity-75">{'// Git workflow example'}</div>
                  <div className="text-foreground/90">git clone https://github.com/devharshthakur/ht-beatsync.git</div>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section id="getting-started" className="bg-muted/10 py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-2">Step-by-Step Guide</Badge>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Getting Started</h2>
            <p className="text-muted-foreground mx-auto max-w-3xl">
              Follow these steps to start contributing to the BeatSync project
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md">
                  <FaGithub className="h-6 w-6" />
                </div>
                <CardTitle>Fork the Repository</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Start by forking the main repository to your GitHub account.</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild className="flex items-center gap-1 pl-0 transition-all hover:gap-2">
                  <a href="https://github.com/devharshthakur/ht-beatsync" target="_blank" rel="noopener noreferrer">
                    Visit Repository
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md">
                  <FaCodeBranch className="h-6 w-6" />
                </div>
                <CardTitle>Clone Your Fork</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Clone the repository to your local machine to start working on it.
                </p>
                <div className="bg-secondary/20 group-hover:bg-secondary/30 relative flex items-center overflow-hidden rounded-md p-3 font-mono text-sm">
                  <div className="text-foreground/80 flex-grow break-all pr-2">
                    git clone https://github.com/devharshthakur/ht-beatsync.git
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      navigator.clipboard.writeText('git clone https://github.com/devharshthakur/ht-beatsync.git');
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="relative h-8 w-8"
                    title="Copy to clipboard"
                  >
                    {copied && (
                      <span className="absolute -top-8 right-0 rounded-md bg-green-500 px-2 py-1 text-xs text-white">
                        Copied!
                      </span>
                    )}
                    <FaCopy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md">
                  <Database className="h-6 w-6" />
                </div>
                <CardTitle>Install Dependencies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Navigate to the project directory and install all required dependencies.
                </p>
                <div className="bg-secondary/20 rounded-md p-3 font-mono text-sm">
                  <div className="text-foreground/80">cd ht-beatsync</div>
                  <div className="text-primary font-bold">pnpm install</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md">
                  <Zap className="h-6 w-6" />
                </div>
                <CardTitle>Run Development Server</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Start the development server to see your changes in real-time.
                </p>
                <div className="bg-secondary/20 rounded-md p-3 font-mono text-sm">
                  <div className="text-primary font-bold">pnpm dev</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Branching Strategy Section */}
      <section id="branching" className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <Card className="border-border shadow-md">
            <CardContent className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-2">
              <div>
                <div className="bg-primary/10 text-primary mb-6 inline-flex h-12 w-12 items-center justify-center rounded-md">
                  <FaGitAlt className="h-6 w-6" />
                </div>

                <h2 className="mb-6 text-3xl font-bold">Branching Strategy</h2>

                <p className="text-muted-foreground mb-6">
                  When contributing, please create a branch with the following naming conventions:
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Card className="border-green-500/30 transition-all hover:border-green-500/80">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <CardTitle className="text-base">Feature Branch</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-secondary/20 mt-2 rounded p-2 font-mono text-sm">
                            feature/&lt;what-you're-adding&gt;
                          </div>
                          <p className="text-muted-foreground mt-2 text-sm">Example: feature/login-page</p>
                        </CardContent>
                      </Card>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">Feature branches</h4>
                          <p className="text-muted-foreground text-sm">
                            Use for new features, enhancements, or major additions to the codebase.
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>

                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Card className="border-red-500/30 transition-all hover:border-red-500/80">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <CardTitle className="text-base">Fix Branch</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-secondary/20 mt-2 rounded p-2 font-mono text-sm">
                            fix/&lt;what-you're-fixing&gt;
                          </div>
                          <p className="text-muted-foreground mt-2 text-sm">Example: fix/button-alignment</p>
                        </CardContent>
                      </Card>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">Fix branches</h4>
                          <p className="text-muted-foreground text-sm">
                            Use for bug fixes, error corrections, or other issues that need resolution.
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>

                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Card className="border-blue-500/30 transition-all hover:border-blue-500/80">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                            <CardTitle className="text-base">Change Branch</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-secondary/20 mt-2 rounded p-2 font-mono text-sm">
                            change/&lt;what-you're-changing&gt;
                          </div>
                          <p className="text-muted-foreground mt-2 text-sm">Example: change/button-styles</p>
                        </CardContent>
                      </Card>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">Change branches</h4>
                          <p className="text-muted-foreground text-sm">
                            Use for modifications, refactoring, or style updates to existing functionality.
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>

              <div>
                <Card className="border-border bg-card/80 shadow-md">
                  <CardHeader className="border-b">
                    <CardTitle className="flex items-center text-xl">
                      <GitPullRequest className="text-primary mr-2 h-5 w-5" />
                      Git Workflow
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="step1" className="border-b">
                        <AccordionTrigger>
                          <div className="flex items-center gap-3">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500/20 font-medium text-green-500">
                              1
                            </div>
                            <span>Fork from Main</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          Always fork from the{' '}
                          <code className="bg-secondary/30 text-primary rounded px-1.5 py-0.5">main</code> branch to
                          ensure you're working with the most stable version.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="step2" className="border-b">
                        <AccordionTrigger>
                          <div className="flex items-center gap-3">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/20 font-medium text-blue-500">
                              2
                            </div>
                            <span>Create PR to Dev</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          Submit your pull request targeting the{' '}
                          <code className="bg-secondary/30 text-primary rounded px-1.5 py-0.5">dev</code> branch, not{' '}
                          <code className="bg-secondary/30 rounded px-1.5 py-0.5">main</code>.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="step3" className="border-b">
                        <AccordionTrigger>
                          <div className="flex items-center gap-3">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500/20 font-medium text-purple-500">
                              3
                            </div>
                            <span>Testing in Dev</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          Once merged to <code className="bg-secondary/30 text-primary rounded px-1.5 py-0.5">dev</code>
                          , your changes undergo more thorough testing alongside other features.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="step4">
                        <AccordionTrigger>
                          <div className="flex items-center gap-3">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 font-medium text-amber-500">
                              4
                            </div>
                            <span>Promotion to Main</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          After rigorous testing, changes from{' '}
                          <code className="bg-secondary/30 text-primary rounded px-1.5 py-0.5">dev</code> are batched
                          and merged to <code className="bg-secondary/30 rounded px-1.5 py-0.5">main</code>.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Making Changes Section */}
      <section id="changes" className="bg-muted/10 py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-2">Best Practices</Badge>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Making Quality Changes</h2>
            <p className="text-muted-foreground mx-auto max-w-3xl">
              Follow these best practices to ensure your contributions are high quality and easy to review
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border hover:border-primary/50 shadow-sm transition-all hover:shadow-md">
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md">
                  <Code2 className="h-6 w-6" />
                </div>
                <CardTitle>Code Style</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Write clean, readable code that matches the existing style. Use TypeScript properly and avoid any type
                  when possible.
                </p>
                <ul className="text-muted-foreground space-y-2">
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
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 shadow-sm transition-all hover:shadow-md">
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md">
                  <FaGitAlt className="h-6 w-6" />
                </div>
                <CardTitle>Commit Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Write clear, descriptive commit messages that explain what you changed and why. Reference issues when
                  applicable.
                </p>
                <ul className="text-muted-foreground space-y-2">
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
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 shadow-sm transition-all hover:shadow-md">
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md">
                  <FaBook className="h-6 w-6" />
                </div>
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Document your code with proper JSDoc comments and update any relevant documentation files.
                </p>
                <ul className="text-muted-foreground space-y-2">
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
              </CardContent>
            </Card>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <Card className="border-border shadow-md">
              <div className="border-b p-3">
                <div className="text-muted-foreground flex items-center font-mono text-sm">
                  <Code2 className="text-primary mr-2 h-4 w-4" />
                  JSDoc Example
                </div>
              </div>
              <CardContent className="p-4">
                <pre className="text-muted-foreground bg-secondary/5 overflow-x-auto rounded p-4 font-mono text-sm">
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
        </div>
      </section>

      {/* Pull Requests Section */}
      <section id="pull-requests" className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <Card className="border-border shadow-md">
            <CardContent className="p-8 lg:p-12">
              <div className="mb-8">
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md">
                  <GitPullRequest className="h-6 w-6" />
                </div>
                <h2 className="mb-4 text-3xl font-bold">Creating Pull Requests</h2>
                <p className="text-muted-foreground max-w-3xl">
                  Creating a good pull request helps maintainers understand and review your changes quickly.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-xl font-semibold">What to Include</h3>
                  <ul className="space-y-5">
                    <li className="flex items-start transition-all hover:translate-x-1">
                      <div className="mr-3 mt-1 text-green-500">✓</div>
                      <div className="text-muted-foreground">
                        <strong className="text-primary">Descriptive title</strong> - Clearly state what your PR does
                      </div>
                    </li>
                    <li className="flex items-start transition-all hover:translate-x-1">
                      <div className="mr-3 mt-1 text-green-500">✓</div>
                      <div className="text-muted-foreground">
                        <strong className="text-primary">Issue references</strong> - Link to related issues (e.g.,
                        "Fixes #123")
                      </div>
                    </li>
                    <li className="flex items-start transition-all hover:translate-x-1">
                      <div className="mr-3 mt-1 text-green-500">✓</div>
                      <div className="text-muted-foreground">
                        <strong className="text-primary">Screenshots</strong> - For UI changes, include before/after
                        images
                      </div>
                    </li>
                    <li className="flex items-start transition-all hover:translate-x-1">
                      <div className="mr-3 mt-1 text-green-500">✓</div>
                      <div className="text-muted-foreground">
                        <strong className="text-primary">Test results</strong> - Mention what tests you've run
                      </div>
                    </li>
                  </ul>
                </div>

                <Card className="border-border shadow-md">
                  <div className="flex items-center border-b px-4">
                    <div className="flex items-center space-x-2 py-3">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-muted-foreground ml-3 font-mono text-xs font-bold">
                      pull_request_template.md
                    </div>
                  </div>
                  <CardContent className="to-secondary/5 bg-gradient-to-b from-transparent p-6 font-mono text-sm">
                    <div className="text-primary mb-2 font-bold">## Description</div>
                    <div className="text-muted-foreground mb-4">A clear description of what this PR does...</div>

                    <div className="text-primary mb-2 font-bold">## Related Issues</div>
                    <div className="text-muted-foreground mb-4">Fixes #123</div>

                    <div className="text-primary mb-2 font-bold">## Screenshots</div>
                    <div className="text-muted-foreground mb-4">If applicable, add screenshots to help explain...</div>

                    <div className="text-primary mb-2 font-bold">## Testing</div>
                    <div className="text-muted-foreground">Describe the tests you ran to verify your changes...</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/10 py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <Card className="border-border shadow-lg">
            <CardContent className="relative overflow-hidden p-12 text-center">
              <div className="from-primary/5 to-secondary/5 absolute inset-0 -z-10 bg-gradient-to-br"></div>
              <div className="bg-primary/10 absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full blur-3xl"></div>
              <div className="bg-secondary/10 absolute -bottom-24 -left-24 -z-10 h-64 w-64 rounded-full blur-3xl"></div>

              <h2 className="from-primary to-primary/80 mb-6 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                Ready to Contribute?
              </h2>

              <p className="text-muted-foreground mx-auto mb-8 max-w-3xl">
                Join me in making BeatSync better. Your contributions help me learn and improve this project.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="gap-2">
                  <a
                    href="https://github.com/devharshthakur/ht-beatsync/fork"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaCodeBranch className="h-5 w-5" />
                    <span>Fork Repository</span>
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <a href="https://github.com/devharshthakur/ht-beatsync" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="h-5 w-5" />
                    <span>Star on GitHub</span>
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
