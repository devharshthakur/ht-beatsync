import Link from 'next/link';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background/50 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-2 md:flex-row md:space-y-0">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-3">
            <Image
              src="/icon.svg"
              alt="BeatSync Icon"
              width={24}
              height={24}
              className="opacity-70 transition-opacity hover:opacity-100"
            />
            <span className="text-muted-foreground text-sm">© {new Date().getFullYear()} BeatSync</span>
          </div>

          {/* Social and Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/devharshthakur/ht-beatsync"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground flex items-center transition-colors"
              aria-label="GitHub Repository"
            >
              <FaGithub className="h-4 w-4" />
            </a>
            <a
              href="https://beatsync.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground flex items-center transition-colors"
              aria-label="Original Project"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
