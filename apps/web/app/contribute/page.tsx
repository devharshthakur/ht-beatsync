'use client';

import { useState } from 'react';
import { FaGithub, FaCodeBranch, FaBook, FaGitAlt, FaCopy } from 'react-icons/fa';
import { BsGit } from 'react-icons/bs';
import { ChevronRight, ExternalLink, Database, GitPullRequest, Code2, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';

export default function ContributePage() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="relative pb-24 pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
              <div className="border-border bg-muted/10 text-muted-foreground mb-6 inline-flex items-center rounded-md border px-4 py-1.5 text-sm font-medium shadow-sm">
                <GitPullRequest className="mr-2 h-4 w-4" />
                Open Source Project
              </div>

              <h1 className="text-foreground mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                How to Contribute
              </h1>

              <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg sm:text-xl lg:mx-0">
                Join me in building a better BeatSync. Your contributions help me learn and improve this project.
              </p>

              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 lg:justify-start">
                <a
                  href="https://github.com/devharshthakur/ht-beatsync/fork"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground border-primary hover:bg-primary/90 before:border-primary/30 after:border-primary/20 relative inline-flex w-full items-center justify-center space-x-2 rounded-md border-2 px-6 py-3 text-base font-medium shadow-lg transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-md before:border-2 before:content-[''] after:absolute after:inset-[-5px] after:-z-20 after:rounded-lg after:border-2 after:content-[''] sm:w-auto"
                >
                  <FaCodeBranch className="h-5 w-5" />
                  <span>Fork Repository</span>
                </a>
                <a
                  href="https://github.com/devharshthakur/ht-beatsync/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary text-secondary-foreground border-primary/60 hover:bg-secondary/90 hover:border-primary before:border-primary/20 after:border-primary/10 relative inline-flex w-full items-center justify-center space-x-2 rounded-md border-2 px-6 py-3 text-base font-medium shadow-md transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-md before:border-2 before:content-[''] after:absolute after:inset-[-5px] after:-z-20 after:rounded-lg after:border-2 after:content-[''] sm:w-auto"
                >
                  <span>View Issues</span>
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="border-border bg-card overflow-hidden rounded-lg border shadow-xl">
                {/* App header */}
                <div className="border-border flex items-center justify-between border-b px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-md bg-red-500"></div>
                    <div className="h-3 w-3 rounded-md bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-md bg-green-500"></div>
                  </div>
                  <div className="text-muted-foreground text-xs">contribution workflow</div>
                  <div className="w-16"></div> {/* Spacer for balance */}
                </div>

                {/* App content */}
                <div className="p-6">
                  <div className="relative font-mono text-sm">
                    <div className="text-muted-foreground mb-4">{'// Git workflow example'}</div>
                    <div className="text-foreground/80">git clone https://github.com/yourusername/ht-beatsync.git</div>
                    <div className="text-foreground/80">cd ht-beatsync</div>
                    <div className="text-foreground/80">git checkout -b feature/your-feature</div>
                    <div className="text-foreground/80 mt-2">{'// Make your changes'}</div>
                    <div className="text-foreground/80">git add .</div>
                    <div className="text-foreground/80">git commit -m "Add awesome feature"</div>
                    <div className="text-foreground/80">git push origin feature/your-feature</div>
                    <div className="text-foreground/80 mt-2">{'// Create a pull request to dev branch'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section id="getting-started" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">Getting Started</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Follow these steps to start contributing to the BeatSync project
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="group relative">
              <div className="border-border bg-card relative h-full rounded-lg border p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="bg-secondary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md shadow-sm">
                  <FaGithub className="text-foreground/80 h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-semibold">Fork the Repository</h3>
                <p className="text-muted-foreground mb-4">
                  Start by forking the main repository to your GitHub account.
                </p>
                <a
                  href="https://github.com/devharshthakur/ht-beatsync"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary mt-4 flex items-center hover:underline"
                >
                  Visit Repository
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="group relative">
              <div className="border-border bg-card relative h-full rounded-lg border p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="bg-secondary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md shadow-sm">
                  <FaCodeBranch className="text-foreground/80 h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-semibold">Clone Your Fork</h3>
                <p className="text-muted-foreground mb-4">
                  Clone the repository to your local machine to start working on it.
                </p>
                <div className="bg-secondary/20 mt-4 flex items-center rounded-md p-3 font-mono text-sm shadow-inner">
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
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 transform rounded-md bg-green-500/20 px-2 py-1 text-xs text-green-700">
                        Copied!
                      </span>
                    ) : null}
                    <FaCopy className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="border-border bg-card relative h-full rounded-lg border p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="bg-secondary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md shadow-sm">
                  <Database className="text-foreground/80 h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-semibold">Install Dependencies</h3>
                <p className="text-muted-foreground mb-4">
                  Navigate to the project directory and install all required dependencies.
                </p>
                <div className="bg-secondary/20 mt-4 rounded-md p-3 font-mono text-sm shadow-inner">
                  <div className="text-foreground/80">cd ht-beatsync</div>
                  <div className="text-foreground/80">pnpm install</div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="border-border bg-card relative h-full rounded-lg border p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="bg-secondary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md shadow-sm">
                  <Zap className="text-foreground/80 h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-semibold">Run Development Server</h3>
                <p className="text-muted-foreground mb-4">
                  Start the development server to see your changes in real-time.
                </p>
                <div className="bg-secondary/20 mt-4 rounded-md p-3 font-mono text-sm shadow-inner">
                  <div className="text-foreground/80">pnpm dev</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branching Strategy Section */}
      <section id="branching" className="bg-secondary/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-border bg-card relative overflow-hidden rounded-lg border p-8 shadow-xl md:p-10">
            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div>
                <div className="bg-secondary mb-6 inline-flex h-12 w-12 items-center justify-center rounded-md shadow-sm">
                  <BsGit className="text-secondary-foreground h-6 w-6" />
                </div>

                <h2 className="text-foreground mb-6 text-3xl font-bold">Branching Strategy</h2>

                <p className="text-foreground/80 mb-6">
                  When contributing, please create a branch with the following naming conventions:
                </p>

                <div className="space-y-4">
                  <div className="border-border rounded-md border p-4 shadow-md">
                    <div className="mb-1 flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-md bg-green-500"></div>
                      <h4 className="text-foreground font-medium">Feature Branch</h4>
                    </div>
                    <div className="bg-secondary/20 mt-2 rounded p-2 font-mono text-sm shadow-inner">
                      feature/&lt;what-you're-adding&gt;
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm">Example: feature/login-page</p>
                  </div>

                  <div className="border-border rounded-md border p-4 shadow-md">
                    <div className="mb-1 flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-md bg-red-500"></div>
                      <h4 className="text-foreground font-medium">Fix Branch</h4>
                    </div>
                    <div className="bg-secondary/20 mt-2 rounded p-2 font-mono text-sm shadow-inner">
                      fix/&lt;what-you're-fixing&gt;
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm">Example: fix/button-alignment</p>
                  </div>

                  <div className="border-border rounded-md border p-4 shadow-md">
                    <div className="mb-1 flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-md bg-blue-500"></div>
                      <h4 className="text-foreground font-medium">Change Branch</h4>
                    </div>
                    <div className="bg-secondary/20 mt-2 rounded p-2 font-mono text-sm shadow-inner">
                      change/&lt;what-you're-changing&gt;
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm">Example: change/button-styles</p>
                  </div>
                </div>
              </div>

              <div>
                <Card className="border-border shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <GitPullRequest className="mr-2 h-5 w-5" />
                      Git Workflow
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex">
                      <div className="mr-4 pt-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 font-medium text-green-500 shadow-sm dark:bg-green-500/10">
                          1
                        </div>
                      </div>
                      <div>
                        <h4 className="text-foreground text-lg font-medium">Fork from Main</h4>
                        <p className="text-muted-foreground">
                          Always fork from the <code className="bg-secondary/30 rounded px-1.5 py-0.5">main</code>{' '}
                          branch to ensure you're working with the most stable version.
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
                          <code className="bg-secondary/30 rounded px-1.5 py-0.5">dev</code> branch, not{' '}
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
                          Once merged to <code className="bg-secondary/30 rounded px-1.5 py-0.5">dev</code>, your
                          changes undergo more thorough testing alongside other features.
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
                          <code className="bg-secondary/30 rounded px-1.5 py-0.5">dev</code> are batched and merged to{' '}
                          <code className="bg-secondary/30 rounded px-1.5 py-0.5">main</code>.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Making Changes Section */}
      <section id="changes" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">Making Quality Changes</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Follow these best practices to ensure your contributions are high quality and easy to review
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group relative">
              <div className="border-border bg-card relative h-full rounded-lg border p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="bg-secondary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md shadow-sm">
                  <Code2 className="text-foreground/80 h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-semibold">Code Style</h3>
                <p className="text-muted-foreground mb-4">
                  Write clean, readable code that matches the existing style. Use TypeScript properly and avoid any type
                  when possible.
                </p>
                <ul className="text-muted-foreground list-inside list-disc space-y-2">
                  <li>Make changes in small, focused steps</li>
                  <li>Add comments to explain complex logic</li>
                  <li>Match existing code style</li>
                  <li>Use TypeScript properly (avoid any)</li>
                </ul>
              </div>
            </div>

            <div className="group relative">
              <div className="border-border bg-card relative h-full rounded-lg border p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="bg-secondary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md shadow-sm">
                  <FaGitAlt className="text-foreground/80 h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-semibold">Commit Messages</h3>
                <p className="text-muted-foreground mb-4">
                  Write clear, descriptive commit messages that explain what you changed and why. Reference issues when
                  applicable.
                </p>
                <ul className="text-muted-foreground list-inside list-disc space-y-2">
                  <li>Use present tense ("Add feature" not "Added feature")</li>
                  <li>First line should be a summary (50 chars or less)</li>
                  <li>Reference issues (e.g., "Fixes #123")</li>
                  <li>Describe why changes were made, not just what</li>
                </ul>
              </div>
            </div>

            <div className="group relative">
              <div className="border-border bg-card relative h-full rounded-lg border p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="bg-secondary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md shadow-sm">
                  <FaBook className="text-foreground/80 h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-semibold">Documentation</h3>
                <p className="text-muted-foreground mb-4">
                  Document your code with proper JSDoc comments and update any relevant documentation files.
                </p>
                <ul className="text-muted-foreground list-inside list-disc space-y-2">
                  <li>Use JSDoc for functions/methods/classes</li>
                  <li>Include parameter types and return values</li>
                  <li>Add examples where helpful</li>
                  <li>Update README or docs for significant changes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Card className="border-border overflow-hidden shadow-lg">
              <div className="border-border/40 bg-secondary/30 border-b p-3">
                <div className="text-muted-foreground text-sm">JSDoc Example</div>
              </div>
              <CardContent className="bg-card p-4 font-mono text-sm">
                <pre className="text-muted-foreground overflow-x-auto">
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
      <section id="pull-requests" className="bg-secondary/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-border bg-card relative overflow-hidden rounded-lg border p-8 shadow-xl md:p-10">
            <div className="mb-8">
              <div className="bg-secondary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md shadow-sm">
                <GitPullRequest className="text-secondary-foreground h-6 w-6" />
              </div>
              <h2 className="text-foreground mb-4 text-3xl font-bold">Creating Pull Requests</h2>
              <p className="text-muted-foreground max-w-2xl">
                Creating a good pull request helps maintainers understand and review your changes quickly.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-foreground mb-4 text-xl font-semibold">What to Include</h3>
                <ul className="text-muted-foreground space-y-3">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-green-500">✓</div>
                    <div>
                      <strong className="text-foreground">Descriptive title</strong> - Clearly state what your PR does
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-green-500">✓</div>
                    <div>
                      <strong className="text-foreground">Issue references</strong> - Link to related issues (e.g.,
                      "Fixes #123")
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-green-500">✓</div>
                    <div>
                      <strong className="text-foreground">Screenshots</strong> - For UI changes, include before/after
                      images
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-green-500">✓</div>
                    <div>
                      <strong className="text-foreground">Test results</strong> - Mention what tests you've run
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <div className="border-border bg-card overflow-hidden rounded-lg border shadow-lg">
                  <div className="border-border flex items-center border-b px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-md bg-red-500"></div>
                      <div className="h-3 w-3 rounded-md bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-md bg-green-500"></div>
                    </div>
                    <div className="text-muted-foreground ml-3 text-xs">pull_request_template.md</div>
                  </div>
                  <div className="p-4 font-mono text-sm">
                    <div className="text-foreground/80 mb-2 font-bold">## Description</div>
                    <div className="text-muted-foreground mb-4">A clear description of what this PR does...</div>

                    <div className="text-foreground/80 mb-2 font-bold">## Related Issues</div>
                    <div className="text-muted-foreground mb-4">Fixes #123</div>

                    <div className="text-foreground/80 mb-2 font-bold">## Screenshots</div>
                    <div className="text-muted-foreground mb-4">If applicable, add screenshots to help explain...</div>

                    <div className="text-foreground/80 mb-2 font-bold">## Testing</div>
                    <div className="text-muted-foreground">Describe the tests you ran to verify your changes...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-border bg-card rounded-lg border p-8 text-center shadow-lg md:p-10">
            <h2 className="text-foreground mb-6 text-3xl font-bold sm:text-4xl">Ready to Contribute?</h2>

            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
              Join me in making BeatSync better. Your contributions help me learn and improve this project.
            </p>

            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <a
                href="https://github.com/devharshthakur/ht-beatsync/fork"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground border-primary hover:bg-primary/90 before:border-primary/30 after:border-primary/20 relative inline-flex w-full max-w-xs items-center justify-center space-x-2 rounded-md border-2 px-6 py-3 text-base font-medium shadow-lg transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-md before:border-2 before:content-[''] after:absolute after:inset-[-5px] after:-z-20 after:rounded-lg after:border-2 after:content-[''] sm:w-auto"
              >
                <FaCodeBranch className="h-5 w-5" />
                <span>Fork Repository</span>
              </a>
              <a
                href="https://github.com/devharshthakur/ht-beatsync"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-secondary-foreground border-primary/60 hover:bg-secondary/90 hover:border-primary before:border-primary/20 after:border-primary/10 relative inline-flex w-full max-w-xs items-center justify-center space-x-2 rounded-md border-2 px-6 py-3 text-base font-medium shadow-md transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-md before:border-2 before:content-[''] after:absolute after:inset-[-5px] after:-z-20 after:rounded-lg after:border-2 after:content-[''] sm:w-auto"
              >
                <FaGithub className="h-5 w-5" />
                <span>Star on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
