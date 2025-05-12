/**
 * @fileoverview Join component for the BeatSync application.
 * Provides room joining and creation functionality with user identification.
 *
 * @module BeatSync/Join
 * @requires next/navigation
 * @requires react
 * @requires @tanstack/react-form
 * @requires @workspace/ui
 */

'use client';

import { useRoomStore } from '@/store/slices/room';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { JoinFromData, JoinFromSchema } from '../schema/join.schema';
import { generateName } from '@/lib/randomNames';
import { ArrowLeft, Plus, RefreshCw } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { OtpInput } from './FormInput';
import Spinner from '../svg/Spinner';

/**
 * Join component for entering or creating BeatSync rooms.
 *
 * @component
 * @description Provides a form interface for users to join existing rooms by entering
 * a 6-digit room code or to create a new room. Users are assigned random usernames
 * which they can regenerate. The component handles loading states during join/create operations.
 *
 * @example
 * ```tsx
 * <Join />
 * ```
 *
 * @returns {JSX.Element} The Join component
 */
export const Join = () => {
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<string>('');

  const setUsername = useRoomStore(state => state.setUsername);
  const username = useRoomStore(state => state.username);
  const router = useRouter();

  /**
   * Generates a random username on component mount.
   *
   * @effect
   * @dependency {Function} setUsername - Function to set the username in the room store
   */
  useEffect(() => {
    const generatedUserName: string = generateName();
    setUsername(generatedUserName);
  }, [setUsername]);

  const form = useForm({
    validators: {
      onSubmit: JoinFromSchema,
    },
    defaultValues: {
      roomId: '',
    },
  });

  /**
   * Handles room creation process.
   * Generates a random 6-digit room code and navigates to the room.
   *
   * @async
   * @function
   */
  const handleCreateRoom = async () => {
    setIsCreating(true);
    const newRoomId: string = Math.floor(100000 + Math.random() * 900000).toString();
    router.push(`/room/${newRoomId}`);
  };

  /**
   * Regenerates a random username for the user.
   *
   * @async
   * @function
   */
  const handleRegenerateName = async () => {
    const newName: string = generateName();
    setUsername(newName);
  };

  return (
    <div className="w-full max-w-2xl px-8">
      <h1 className="mb-2 text-center text-3xl font-bold">Join Beatsync</h1>
      <p className="text-muted-foreground mb-10 text-center">Enter a room code or create a new room</p>

      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit({
            onSuccess: async (values: JoinFromData) => {
              setIsJoining(true);
              router.push(`/room/${values.roomId}`);
            },
          });
        }}
        className="space-y-10"
      >
        <div className="flex justify-center">
          {form.Field({
            name: 'roomId',
            children: ({ state, handleChange, handleBlur }) => (
              <OtpInput
                value={otpValue}
                onChange={value => {
                  setOtpValue(value);
                  handleChange(value);
                }}
                onBlur={handleBlur}
                error={typeof state.meta.errors?.[0] === 'string' ? state.meta.errors[0] : undefined}
                length={6}
                disabled={isJoining}
              />
            ),
          })}
        </div>

        <div className="flex items-center justify-center">
          <span className="text-muted-foreground text-sm">You'll join as</span>
          <span className="text-foreground ml-2 font-semibold">{username}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRegenerateName}
            className="hover:bg-primary/10 hover:text-primary ml-2 h-7 w-7 rounded-full"
            title="Regenerate username"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <Button
            type="submit"
            className="h-12 flex-1 items-center justify-center gap-2 shadow-sm"
            disabled={otpValue.length !== 6 || isJoining}
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
          <Button
            type="button"
            className="h-12 flex-1 items-center justify-center gap-2"
            variant="outline"
            onClick={handleCreateRoom}
            disabled={isCreating}
          >
            {isCreating ? (
              <span className="flex items-center">
                <Spinner className="-ml-1 mr-2 h-4 w-4 animate-spin" />
                Creating...
              </span>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Create new room
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
