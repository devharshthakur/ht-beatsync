'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Zap, Loader2 } from 'lucide-react';
import { cn } from '@/lib/util';

interface RoomSyncProps {
  roomId: string;
}

interface SyncStepProps {
  step: number;
  currentStep: number;
  label: string;
}

const SyncStep = ({ step, currentStep, label }: SyncStepProps) => {
  const isComplete = currentStep > step;
  const isActive = currentStep === step;

  return (
    <div className="flex items-center space-x-3">
      <div
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500',
          isComplete
            ? 'bg-primary text-primary-foreground'
            : isActive
              ? 'bg-primary/20 text-primary border-primary border'
              : 'bg-muted text-muted-foreground',
        )}
      >
        {isComplete ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : isActive ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <span className="text-xs font-medium">{step + 1}</span>
        )}
      </div>
      <span
        className={cn(
          'text-sm font-medium transition-colors',
          isComplete ? 'text-primary' : isActive ? 'text-foreground' : 'text-muted-foreground',
        )}
      >
        {label}
      </span>
    </div>
  );
};

export const RoomSync = ({ roomId }: RoomSyncProps) => {
  const [progress, setProgress] = useState<number>(0);
  const [syncPhase, setSyncPhase] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter();

  // Sync phases text
  const syncPhases = [
    'Initializing audio parameters',
    'Calibrating beat detection',
    'Establishing secure connection',
    'Syncing devices',
  ];

  useEffect(() => {
    setIsClient(true);

    const duration = 10000; // 10 seconds
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
            setSyncPhase(index + 1);
          }
        });

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            sessionStorage.removeItem('creatingRoom');
            router.replace(`/room/${roomId}?direct=true`);
          }, 800);
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [roomId, router]);

  return (
    <div className="bg-card flex min-h-[320px] w-full max-w-3xl flex-col items-center justify-center rounded-xl border p-8 shadow-lg">
      <div className="w-full space-y-8">
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

        {/* Progress indicator */}
        <div className="w-full space-y-6">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{Math.round(progress)}% Complete</p>
            </div>
            <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
              <div
                className="bg-primary h-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Sync steps */}
          {isClient && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {syncPhases.map((phase, index) => (
                <SyncStep key={index} step={index} currentStep={syncPhase} label={phase} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomSync;
