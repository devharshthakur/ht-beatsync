import React, { useEffect, useState } from 'react';
import { Button } from '@workspace/ui/components/button';
import { useRouter } from 'next/navigation';
import { Music, CheckCircle2, Zap } from 'lucide-react';

interface RoomSyncProps {
  roomId: string;
}

interface WaveformBarProps {
  index: number;
  progress: number;
  isActive: boolean;
}

const WaveformBar: React.FC<WaveformBarProps> = ({ index, progress, isActive }) => {
  const [height, setHeight] = useState<string>('40%');

  useEffect(() => {
    const updateHeight = () => {
      const newHeight = `${Math.max(15, Math.sin((Date.now() / (600 + index * 50)) % Math.PI) * 60 + 40)}%`;
      setHeight(newHeight);
      requestAnimationFrame(updateHeight);
    };

    const animationId = requestAnimationFrame(updateHeight);
    return () => cancelAnimationFrame(animationId);
  }, [index]);

  return (
    <div
      className="bg-primary h-full w-2 rounded-full opacity-70"
      style={{
        height,
        animation: `pulse 1.5s ease-in-out ${index * 0.1}s infinite`,
        opacity: isActive ? '1' : '0.2',
      }}
    />
  );
};

export const RoomSync: React.FC<RoomSyncProps> = ({ roomId }) => {
  const [progress, setProgress] = useState(0);
  const [isSynced, setIsSynced] = useState(false);
  const [syncPhase, setSyncPhase] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Sync phases text
  const syncPhaseText = [
    'Initializing audio parameters...',
    'Calibrating beat detection...',
    'Establishing secure connection...',
    'Syncing devices...',
  ];

  useEffect(() => {
    setIsClient(true);

    const duration = 6000; // 6 seconds
    const interval = 50; // Update every 50ms
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
          setTimeout(() => setIsSynced(true), 800); // Slightly longer delay for better UX
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-card flex min-h-[320px] w-full max-w-3xl flex-col items-center justify-center space-y-6 rounded-xl border p-8 shadow-lg">
      {!isSynced ? (
        <>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                <Zap className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">Calibrating Room</h2>
            </div>
            <div className="bg-secondary/50 rounded-lg px-3 py-1">
              <p className="text-secondary-foreground text-sm font-medium">Room: {roomId}</p>
            </div>
          </div>

          {/* Animated waveform - now with hydration-safe implementation */}
          <div className="flex h-16 w-full items-center justify-center space-x-2">
            {isClient
              ? Array.from({ length: 16 }).map((_, i) => (
                  <WaveformBar key={i} index={i} progress={progress} isActive={progress > (i / 16) * 100} />
                ))
              : // Static placeholder for server-side rendering
                Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="bg-primary h-full w-2 rounded-full opacity-20" style={{ height: '40%' }} />
                ))}
          </div>

          <div className="w-full space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{Math.round(progress)}% Complete</p>
                <p className="text-muted-foreground text-xs">{syncPhase}/4</p>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div
                  className="bg-primary h-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <p className="text-muted-foreground text-center text-sm">{syncPhaseText[syncPhase - 1]}</p>
          </div>
        </>
      ) : (
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-5">
          <div className="flex flex-col items-center justify-center space-y-4 md:col-span-2">
            <div className="animate-bounce-subtle">
              <div className="bg-primary/10 text-primary flex h-20 w-20 items-center justify-center rounded-full">
                <CheckCircle2 className="h-10 w-10" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center space-y-6 md:col-span-3">
            <div className="space-y-2">
              <h2 className="from-primary via-primary/80 to-primary/60 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                Room Synced!
              </h2>
              <p className="text-muted-foreground max-w-md">
                Your room is calibrated and ready for music synchronization. Get ready for an immersive experience!
              </p>
            </div>

            <div className="flex items-center">
              <Music className="mr-2 h-4 w-4 opacity-70" />
              <p className="text-muted-foreground text-sm font-medium">
                Room Code: <span className="text-foreground">{roomId}</span>
              </p>
            </div>

            <Button
              size="lg"
              className="px-8 font-medium"
              onClick={() => {
                router.push(`/room/${roomId}`);
              }}
            >
              Enter Room
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomSync;
