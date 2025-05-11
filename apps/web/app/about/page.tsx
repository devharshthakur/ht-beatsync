'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  FaSync,
  FaUsers,
  FaClock,
  FaCode,
  FaServer,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import { SiTypescript, SiSocketdotio, SiNestjs, SiNextdotjs } from 'react-icons/si';

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full">
      {/* Header section */}
      <section className="bg-background py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="relative mb-4 h-24 w-24">
              <Image src="/icon.svg" alt="BeatSync Logo" width={96} height={96} className="drop-shadow-md" priority />
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              About{' '}
              <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
                BeatSync
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
              A modern web application for synchronizing music playback across multiple devices in real-time, allowing
              groups to listen together regardless of physical location.
            </p>
          </div>
        </div>
      </section>

      {/* Project Overview section */}
      <section className="bg-muted/10 py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex flex-col space-y-12">
            <div>
              <h2 className="mb-6 text-3xl font-semibold tracking-tight">Project Overview</h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  BeatSync is a modernized port of the original beatsync.gg platform, designed to demonstrate real-time
                  synchronization capabilities using modern web technologies. The project features a comprehensive
                  architecture with both client and server components.
                </p>
                <p>
                  This port implements improved architecture, comprehensive documentation, and advanced synchronization
                  capabilities leveraging WebSockets and precise time synchronization.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h2 className="mb-6 text-3xl font-semibold tracking-tight">Key Features</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="bg-card border-border hover:border-primary/30 rounded-lg border p-6 transition-colors">
                  <div className="mb-4 flex items-center">
                    <div className="bg-primary/10 mr-4 rounded-md p-3">
                      <FaSync className="text-primary h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-medium">Real-Time Sync</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Precisely synchronized playback across all connected devices using NTP-inspired time synchronization
                    protocols.
                  </p>
                </div>

                <div className="bg-card border-border hover:border-primary/30 rounded-lg border p-6 transition-colors">
                  <div className="mb-4 flex items-center">
                    <div className="bg-primary/10 mr-4 rounded-md p-3">
                      <FaUsers className="text-primary h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-medium">Collaborative Rooms</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Create and join private listening rooms to share music experiences with friends and family.
                  </p>
                </div>

                <div className="bg-card border-border hover:border-primary/30 rounded-lg border p-6 transition-colors">
                  <div className="mb-4 flex items-center">
                    <div className="bg-primary/10 mr-4 rounded-md p-3">
                      <FaClock className="text-primary h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-medium">Synchronized Controls</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Play, pause, and seek controls are synchronized across all participants for a seamless experience.
                  </p>
                </div>

                <div className="bg-card border-border hover:border-primary/30 rounded-lg border p-6 transition-colors">
                  <div className="mb-4 flex items-center">
                    <div className="bg-primary/10 mr-4 rounded-md p-3">
                      <FaCode className="text-primary h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-medium">Type-Safe Architecture</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Built with TypeScript throughout the entire stack ensuring type safety and improved developer
                    experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack section */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight">Technology Stack</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="bg-card border-border hover:border-primary/30 flex flex-col items-center rounded-lg border p-5 text-center transition-colors">
              <SiNestjs className="text-primary/80 mb-4 h-12 w-12" />
              <h3 className="mb-1 text-lg font-medium">NestJS</h3>
              <p className="text-muted-foreground text-sm">Backend Framework</p>
            </div>

            <div className="bg-card border-border hover:border-primary/30 flex flex-col items-center rounded-lg border p-5 text-center transition-colors">
              <SiNextdotjs className="text-primary/80 mb-4 h-12 w-12" />
              <h3 className="mb-1 text-lg font-medium">Next.js</h3>
              <p className="text-muted-foreground text-sm">Frontend Framework</p>
            </div>

            <div className="bg-card border-border hover:border-primary/30 flex flex-col items-center rounded-lg border p-5 text-center transition-colors">
              <SiTypescript className="text-primary/80 mb-4 h-12 w-12" />
              <h3 className="mb-1 text-lg font-medium">TypeScript</h3>
              <p className="text-muted-foreground text-sm">Programming Language</p>
            </div>

            <div className="bg-card border-border hover:border-primary/30 flex flex-col items-center rounded-lg border p-5 text-center transition-colors">
              <SiSocketdotio className="text-primary/80 mb-4 h-12 w-12" />
              <h3 className="mb-1 text-lg font-medium">WebSockets</h3>
              <p className="text-muted-foreground text-sm">Real-time Communication</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Information section */}
      <section className="bg-muted/10 py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight">Project Information</h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-card border-border rounded-lg border p-6">
              <h3 className="mb-4 text-xl font-medium">About the Implementation</h3>
              <div className="text-muted-foreground space-y-4">
                <p>
                  This project serves as a demonstration of real-time synchronization techniques and modern web
                  development practices. It incorporates a monorepo structure with clear separation of concerns between
                  frontend and backend.
                </p>
                <p>
                  The synchronization algorithm is based on network time protocol principles adapted for web
                  environments, allowing for precise playback coordination even with varying network latencies.
                </p>
              </div>
            </div>

            <div className="bg-card border-border rounded-lg border p-6">
              <h3 className="mb-4 text-xl font-medium">Get Involved</h3>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Interested in contributing to BeatSync or exploring the code? Check out the GitHub repository or try
                  the application.
                </p>
                <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                  <a
                    href="https://github.com/devharshthakur/ht-beatsync"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 border-border group relative inline-flex items-center justify-center overflow-hidden rounded-md border px-5 py-2.5 shadow-sm transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center">
                      <FaGithub className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                      <span className="font-medium">GitHub Repository</span>
                    </span>
                    <span className="bg-primary/10 absolute inset-0 origin-left scale-x-0 transform transition-transform duration-300 group-hover:scale-x-100"></span>
                  </a>
                  <Link
                    href="/"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 group relative inline-flex items-center justify-center overflow-hidden rounded-md px-5 py-2.5 shadow-sm transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center">
                      <FaExternalLinkAlt className="mr-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      <span className="font-medium">Try BeatSync</span>
                    </span>
                    <span className="absolute inset-0 origin-left scale-x-0 transform bg-white/10 transition-transform duration-300 group-hover:scale-x-100"></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
