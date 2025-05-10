import Link from 'next/link';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink, BookOpen, Code2, GitPullRequest, Server, Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-border bg-card/50 border-t py-16 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative h-10 w-10">
                <div className="from-primary/80 to-primary/60 absolute inset-0 rounded-lg bg-gradient-to-r"></div>
                <div className="bg-background absolute inset-[2px] flex items-center justify-center rounded-md">
                  <Image src="/icon.svg" alt="BeatSync Icon" width={20} height={20} className="text-primary" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight">
                  <span className="from-primary/80 to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
                    BeatSync
                  </span>
                  <span className="bg-primary/10 text-primary ml-2 rounded-md px-2 py-0.5 text-xs font-medium">
                    PORT
                  </span>
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              My student project to create a modern port of beatsync.gg with NestJS, improved architecture, and better
              documentation.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/devharshthakur/ht-beatsync"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <FaGithub className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-foreground text-sm font-semibold uppercase tracking-wider">Resources</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center transition-colors"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  My Documentation
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/devharshthakur/ht-beatsync#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center transition-colors"
                >
                  <Code2 className="mr-2 h-4 w-4" />
                  README
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/devharshthakur/ht-beatsync/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center transition-colors"
                >
                  <GitPullRequest className="mr-2 h-4 w-4" />
                  Issues
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-foreground text-sm font-semibold uppercase tracking-wider">Connect</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://github.com/devharshthakur/ht-beatsync"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center transition-colors"
                >
                  <FaGithub className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://beatsync.gg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Original Project
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-foreground text-sm font-semibold uppercase tracking-wider">Technologies</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://nestjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center transition-colors"
                >
                  <Server className="mr-2 h-4 w-4" />
                  NestJS
                </a>
              </li>
              <li>
                <a
                  href="https://socket.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center transition-colors"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  WebSockets
                </a>
              </li>
              <li>
                <a
                  href="https://www.typescriptlang.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center transition-colors"
                >
                  <Code2 className="mr-2 h-4 w-4" />
                  TypeScript
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border mt-12 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <p className="text-muted-foreground/80 mb-4 text-sm md:mb-0">
            Based on{' '}
            <a
              href="https://beatsync.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              beatsync.gg
            </a>{' '}
            by Freeman Jiang
          </p>

          <p className="text-muted-foreground/60 text-sm">
            © {new Date().getFullYear()} BeatSync Port. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
