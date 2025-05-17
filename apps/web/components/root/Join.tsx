/**
 * @fileoverview Join component for the BeatSync application.
 * Provides room joining and creation UI & functionality with user identification.
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRoomStore } from '@/store/slices/room';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { JoinFromSchema } from './schema/join.schema';
import { generateName } from '@/lib/randomNames';
import { Plus, RefreshCw } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@workspace/ui/components/input-otp';
import Spinner from './svg/Spinner';
import AlertCircle from './svg/AlertCircle';

interface ErrorDisplayProps {
  message: unknown;
}

const ErrorDisplay = ({ message }: ErrorDisplayProps): React.ReactElement => (
  <div className="text-destructive flex items-center text-sm font-medium" role="alert">
    <AlertCircle className="mr-1.5 h-4 w-4" />
    {typeof message === 'string' ? message : 'Invalid room code'}
  </div>
);

/**
 * @component
 * Provides UI for users to enter 6 digit otp to join an existing room or create a new room with a randomly generated code .
 * Users can also regereate their username
 */
export const Join = (): React.ReactElement => {
  const [isJoining, setIsJoining] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const username = useRoomStore(state => state.username);
  const setUsername = useRoomStore(state => state.setUsername);

  const form = useForm({
    defaultValues: {
      roomId: '',
    },
    onSubmit: async ({ value }) => {
      setIsJoining(true);
      router.replace(`/room?roomId=${value.roomId}&fromCreate=true`);
    },
  });

  useEffect(() => {
    if (!username) {
      setUsername(generateName());
    }
    sessionStorage.removeItem('creatingRoom');
  }, [username, setUsername]);

  const handleRegenerateName = (): void => {
    setUsername(generateName());
  };

  const handleCreateRoom = (): void => {
    setIsCreating(true);
    // Generate a 6-digit room ID
    const roomId = Math.floor(100000 + Math.random() * 900000).toString();
    router.replace(`/room?roomId=${roomId}&fromCreate=true`);
  };

  const isActionDisabled = isJoining || isCreating;

  return (
    <div className="mx-auto w-full max-w-2xl px-8">
      <h1 className="mb-2 text-center text-3xl font-bold">Join Beatsync</h1>
      <p className="text-muted-foreground mb-10 text-center">Enter a room code or create a new room</p>

      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-8 sm:space-y-10"
      >
        {form.Field({
          name: 'roomId',
          validators: {
            onChange: ({ fieldApi }) => fieldApi.parseValueWithSchema(JoinFromSchema.shape.roomId),
            onBlur: ({ fieldApi }) => fieldApi.parseValueWithSchema(JoinFromSchema.shape.roomId),
          },
          children: ({ state, handleChange, handleBlur }) => {
            const hasError = state.meta.errors?.length > 0;
            const errorMessage = hasError ? state.meta.errors[0] : undefined;

            return (
              <div className="flex flex-col items-center justify-center space-y-3">
                <InputOTP
                  maxLength={6}
                  value={state.value || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isJoining}
                  className="scale-110 transform-gpu gap-1.5 sm:gap-2.5"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                {errorMessage && <ErrorDisplay message={errorMessage} />}
              </div>
            );
          },
        })}

        <div className="flex items-center justify-center">
          <span className="text-muted-foreground text-xs">You'll join as</span>
          <span className="text-foreground ml-2 text-xs font-semibold">{username}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRegenerateName}
            className="hover:bg-primary/10 hover:text-primary ml-2 h-7 w-7 rounded-full"
            title="Regenerate username"
            disabled={isActionDisabled}
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <form.Subscribe selector={(state): boolean => state.values.roomId.length !== 6 || isJoining}>
            {isDisabled => (
              <Button
                type="submit"
                className="h-10 flex-1 items-center justify-center gap-2 border-2 border-zinc-400 shadow-sm sm:h-12"
                disabled={isDisabled}
              >
                {isJoining ? (
                  <span className="flex items-center">
                    <Spinner className="-ml-1 mr-2 h-4 w-4 animate-spin text-white" />
                    Joining...
                  </span>
                ) : (
                  <>Join room</>
                )}
              </Button>
            )}
          </form.Subscribe>

          <Button
            type="button"
            className="h-10 flex-1 items-center justify-center gap-2 border-2 border-neutral-800 sm:h-12"
            variant="outline"
            onClick={handleCreateRoom}
            disabled={isActionDisabled}
          >
            {isCreating ? (
              <span className="flex items-center">
                <Spinner className="-ml-1 mr-2 h-4 w-4 animate-spin" />
                Creating...
              </span>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span className="ml-1">Create new room</span>
              </>
            )}
          </Button>
        </div>
      </form>

      <p className="text-muted-foreground mt-10 text-center text-xs">
        Use native device speakers for the best experience.
      </p>
    </div>
  );
};
