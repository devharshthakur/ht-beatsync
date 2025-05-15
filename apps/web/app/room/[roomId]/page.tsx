'use client';

import React from 'react';
import { ThemeToggle } from '@workspace/ui/components/theme-toggle';
import { Sparkles, Music2, Users2 } from 'lucide-react';

const RoomPage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-zinc-100 to-zinc-200 font-mono text-zinc-800 transition-all duration-300 dark:from-zinc-900 dark:to-zinc-950 dark:text-zinc-200">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <div className="absolute right-6 top-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="relative flex flex-1 items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-5xl space-y-16">
          {/* Header/Message Section with enhanced typography and animation */}
          <div className="space-y-8 text-center">
            <div className="inline-flex items-center justify-center space-x-2 rounded-md border-2 border-zinc-900/10 bg-zinc-900/5 px-4 py-1.5 text-sm font-medium backdrop-blur-sm dark:border-zinc-50/10 dark:bg-zinc-50/5">
              <Sparkles className="h-4 w-4" />
              <span>Coming Soon</span>
            </div>
            <h1 className="mb-6 bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl lg:text-7xl dark:from-zinc-50 dark:to-zinc-400">
              Room Dashboard
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-zinc-600 sm:text-2xl dark:text-zinc-400">
              We're crafting an immersive experience where music brings people together. Stay tuned for something
              extraordinary.
            </p>
          </div>

          {/* Feature Sections with improved visual design */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Feature 1 */}
            <div className="group relative overflow-hidden rounded-2xl border-2 border-zinc-200/50 bg-white/20 p-8 ring-1 ring-zinc-900/5 backdrop-blur-sm transition-all duration-300 hover:border-zinc-300 hover:shadow-xl dark:border-zinc-700/50 dark:bg-zinc-800/20 dark:ring-white/10 dark:hover:border-zinc-600">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-100/50 to-zinc-50/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-zinc-800/50 dark:to-zinc-900/30" />
              <div className="relative">
                <div className="mb-4 w-fit rounded-xl border border-zinc-900/10 bg-zinc-900/5 p-3 dark:border-zinc-50/10 dark:bg-zinc-50/5">
                  <Music2 className="h-6 w-6" />
                </div>
                <h3 className="mb-4 text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
                  Advanced Music Controls
                </h3>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Seamless playback controls, collaborative playlists, and real-time music synchronization across all
                  participants.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative overflow-hidden rounded-2xl border-2 border-zinc-200/50 bg-white/20 p-8 ring-1 ring-zinc-900/5 backdrop-blur-sm transition-all duration-300 hover:border-zinc-300 hover:shadow-xl dark:border-zinc-700/50 dark:bg-zinc-800/20 dark:ring-white/10 dark:hover:border-zinc-600">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-100/50 to-zinc-50/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-zinc-800/50 dark:to-zinc-900/30" />
              <div className="relative">
                <div className="mb-4 w-fit rounded-xl border border-zinc-900/10 bg-zinc-900/5 p-3 dark:border-zinc-50/10 dark:bg-zinc-50/5">
                  <Users2 className="h-6 w-6" />
                </div>
                <h3 className="mb-4 text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
                  Real-time Collaboration
                </h3>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Connect with friends, share music preferences, and create unforgettable listening experiences
                  together.
                </p>
              </div>
            </div>
          </div>

          {/* Footer with improved styling */}
          <div className="space-y-4 text-center">
            <div className="mx-auto h-px w-full max-w-sm bg-gradient-to-r from-transparent via-zinc-500/20 to-transparent" />
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              © {currentYear} BeatSync. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
