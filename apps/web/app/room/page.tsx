'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThemeToggle } from '@workspace/ui/components/theme-toggle';
import { CheckCircle2, Zap, ArrowRight, Building } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { WaveformBar } from '@/components/room/WaveformBar';
import { validateFullRoomId } from '@/lib/room';

function RoomSyncContent() {
  const [progress, setProgress] = useState<number>(0);
  const [isSynced, setIsSynced] = useState<boolean>(false);
  const [syncPhase, setSyncPhase] = useState<number>(1);
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId') || '000000';

  const syncPhaseText = [
    'Initializing audio parameters...',
    'Calibrating beat detection...',
    'Establishing secure connection...',
    'Syncing devices...',
  ];

  useEffect(() => {
    setIsClient(true);
    const currentRoomId = searchParams.get('roomId');
    if (!currentRoomId || !validateFullRoomId(currentRoomId)) {
      router.replace('/');
      return;
    }

    const duration = 10000; // 10 seconds
    const interval = 80; // Update every 80ms
    const steps = duration / interval;
    const increment = 100 / steps;

    // Phase change points
    const phaseThresholds = [25, 50, 75];

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = Math.min(prev + increment, 100);

        // Update phase based on progress
        phaseThresholds.forEach((threshold, index) => {
          if (prev < threshold && next >= threshold) {
            setSyncPhase(index + 2); // +2 because we start at phase 1
          }
        });

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsSynced(true), 800);
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [searchParams, router]);

  return (
    <div className="from-background to-background/80 min-h-screen w-full bg-gradient-to-b">
      {/* Abstract background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <div className="absolute right-6 top-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main content */}
      <div className="container relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-16">
        {!isSynced ? (
          <div className="w-full max-w-4xl">
            {/* Header with room info */}
            <div className="mb-16 flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Calibrating Room</h1>
                  <p className="text-muted-foreground mt-1">Preparing your audio experience</p>
                </div>
              </div>
              <div className="mt-6 flex w-full items-center justify-center">
                <div className="border-primary/20 bg-secondary/30 flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
                  <div className="bg-primary h-2 w-2 animate-pulse rounded-full"></div>
                  <p className="text-secondary-foreground text-sm font-medium">
                    Room <span className="font-mono font-bold tracking-wider">{roomId}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Animated waveform - full width */}
            <div className="relative mb-16 h-32 w-full">
              <div className="absolute inset-0 flex items-center justify-evenly">
                {isClient
                  ? Array.from({ length: 32 }).map((_, i) => (
                      <WaveformBar key={i} index={i} progress={progress} isActive={progress > (i / 32) * 100} />
                    ))
                  : // Static placeholder for server-side rendering
                    Array.from({ length: 32 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-primary h-full w-1 rounded-full opacity-20"
                        style={{ height: '40%' }}
                      />
                    ))}
              </div>
            </div>

            {/* Progress tracking */}
            <div className="mx-auto w-full max-w-2xl space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium">{Math.round(progress)}% Complete</p>
                <p className="bg-primary/10 text-primary rounded px-2 py-0.5 text-sm font-medium">
                  Phase {syncPhase}/4
                </p>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200/50 backdrop-blur-sm dark:bg-zinc-800/50">
                <div
                  className="bg-primary h-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="text-muted-foreground mt-4 text-center text-base">{syncPhaseText[syncPhase - 1]}</p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            <div className="mb-16 flex flex-col items-center text-center">
              <div className="animate-bounce-subtle mb-6">
                <div className="bg-primary/10 text-primary flex h-20 w-20 items-center justify-center rounded-full">
                  <CheckCircle2 className="h-10 w-10" strokeWidth={1.5} />
                </div>
              </div>
              <h1 className="from-primary via-primary/80 to-primary/60 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                Room Synced Successfully
              </h1>
              <p className="text-muted-foreground mt-4 max-w-xl text-lg">
                Your room is calibrated and ready for music synchronization. Get ready for an immersive experience!
              </p>
            </div>

            {/* Audio waves visualization */}
            <div className="relative mb-16 h-24 w-full overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-evenly">
                {isClient &&
                  Array.from({ length: 32 }).map((_, i) => (
                    <WaveformBar key={i} index={i} progress={100} isActive={true} />
                  ))}
              </div>
            </div>

            {/* Success state room code badge */}
            <div className="mb-8 flex w-full items-center justify-center">
              <div className="border-primary/20 bg-secondary/20 flex items-center gap-3 rounded-full border px-5 py-2.5 backdrop-blur-sm">
                <Building className="text-primary h-5 w-5" />
                <p className="text-secondary-foreground text-sm font-medium">
                  Room <span className="font-mono font-bold tracking-wider">{roomId}</span>
                </p>
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <Button
                size="lg"
                className="from-primary to-primary/90 group flex items-center space-x-3 bg-gradient-to-r px-12 py-6 text-lg font-medium shadow-lg transition-all hover:translate-y-[-2px] hover:shadow-xl"
                onClick={() => {
                  router.push(`/room/${roomId}`);
                }}
              >
                <Building className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="mx-2">Enter Room</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RoomSyncPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen w-full items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <Zap className="h-6 w-6" />
            </div>
            <p className="text-lg">Loading room...</p>
          </div>
        </div>
      }
    >
      <RoomSyncContent />
    </Suspense>
  );
}
