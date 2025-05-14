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
import { useEffect, useState, useRef } from 'react';
import { useForm } from '@tanstack/react-form';
import { JoinFromData, JoinFromSchema } from '../schema/join.schema';
import { generateName } from '@/lib/randomNames';
import { Plus, RefreshCw } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import Spinner from '../svg/Spinner';
import AlertCircle from '../svg/AlertCircle';

/**
 * Props for the OTP Input component
 *
 * @interface OtpInputProps
 * @property {string} value - Current value of the OTP input
 * @property {function} onChange - Callback function when value changes
 * @property {function} [onBlur] - Optional callback function for blur event
 * @property {string} [error] - Optional error message to display
 * @property {boolean} [disabled=false] - Whether the input is disabled
 */
interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
}

/**
 * OTP Input component for entering a 6-digit verification code
 *
 * @component
 * @param {OtpInputProps} props - The component props
 * @returns {JSX.Element} Rendered OTP input component
 */
const OtpInput = ({ value = '', onChange, onBlur, error, disabled = false }: OtpInputProps) => {
  const length = 6;
  const valueArray = value.split('');
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = Array(length).fill(null);
  }, [length]);

  // Fill the array with empty strings if needed
  while (valueArray.length < length) {
    valueArray.push('');
  }

  /**
   * Handles input for each digit of the OTP
   *
   * @param {number} index - The index of the digit being changed
   * @param {string} digit - The new value of the digit
   * @returns {void}
   */
  const handleDigitChange = (index: number, digit: string): void => {
    if (!/^[0-9]?$/.test(digit)) return;

    const newValue = [...valueArray];
    newValue[index] = digit;

    // Update the form with the complete string value
    onChange(newValue.join('').substring(0, length));

    // Auto-focus next input if digit was entered
    if (digit && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /**
   * Handles keyboard navigation between OTP input fields
   *
   * @param {number} index - The index of the current input field
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event
   * @returns {void}
   */
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Backspace' && !valueArray[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex w-full flex-col space-y-3">
      <div className="flex items-center justify-center gap-2 md:gap-3">
        {valueArray.map((digit, index) => (
          <input
            key={index}
            ref={el => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleDigitChange(index, e.target.value)}
            onBlur={onBlur}
            onKeyDown={e => handleKeyDown(index, e)}
            disabled={disabled}
            className={`md:h-18 md:w-18 h-16 w-16 rounded-lg border-[1.5px] bg-transparent text-center text-2xl font-medium transition-all duration-200 ${
              error ? 'border-destructive text-destructive shadow-destructive/5' : 'border-border text-foreground'
            } focus:border-primary focus:shadow-primary/10 focus:ring-primary/20 hover:border-primary/50 disabled:hover:border-border outline-none focus:shadow-md focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50`}
            autoFocus={index === 0}
          />
        ))}
      </div>
      {error && (
        <div className="text-destructive flex items-center justify-center text-sm font-medium" role="alert">
          <AlertCircle className="mr-1.5" />
          {error}
        </div>
      )}
    </div>
  );
};

/**
 * Join component for the BeatSync application
 *
 * This component provides UI for users to enter a 6-digit room code to join
 * an existing room or create a new room with a randomly generated code.
 * Users can also regenerate their username.
 *
 * @component
 * @returns {JSX.Element} Rendered Join component
 */
export const Join = () => {
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const router = useRouter();

  // Room store hooks
  const setUsername = useRoomStore(state => state.setUsername);
  const username = useRoomStore(state => state.username);

  /**
   * Form configuration with validation and submission handling
   */
  const form = useForm({
    validators: {
      onSubmit: JoinFromSchema,
    },
    defaultValues: {
      roomId: '',
    },
    onSubmit: async ({ value }: { value: JoinFromData }): Promise<void> => {
      setIsJoining(true);
      router.push(`/room/${value.roomId}`);
    },
  });

  /**
   * Generates a random username when the component mounts
   */
  useEffect(() => {
    setUsername(generateName());
  }, [setUsername]);

  /**
   * Handles creation of a new room with a random ID
   *
   * @returns {void}
   */
  const handleCreateRoom = (): void => {
    setIsCreating(true);
    const newRoomId = Math.floor(100000 + Math.random() * 900000).toString();
    router.push(`/room/${newRoomId}`);
  };

  /**
   * Regenerates a random username for the user
   *
   * @returns {void}
   */
  const handleRegenerateName = (): void => {
    setUsername(generateName());
  };

  return (
    <div className="w-full max-w-2xl px-8">
      <h1 className="mb-2 text-center text-3xl font-bold">Join Beatsync</h1>
      <p className="text-muted-foreground mb-10 text-center">Enter a room code or create a new room</p>

      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-10"
      >
        {/* OTP Input Field */}
        <div className="flex justify-center">
          {form.Field({
            name: 'roomId',
            children: ({ state, handleChange, handleBlur }) => {
              // Fix for accurate form state updates
              const handleOtpChange = (value: string) => {
                handleChange(value);

                // Add console log to debug the form state
                console.log('Current OTP value:', value);
              };

              return (
                <OtpInput
                  value={state.value || ''}
                  onChange={handleOtpChange}
                  onBlur={handleBlur}
                  error={typeof state.meta.errors?.[0] === 'string' ? state.meta.errors[0] : undefined}
                  disabled={isJoining}
                />
              );
            },
          })}
        </div>

        {/* Username Display */}
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
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <form.Subscribe
            selector={state => {
              const roomId = state.values.roomId as string;
              return !roomId || roomId.length !== 6 || isJoining;
            }}
          >
            {isDisabled => (
              <Button
                type="submit"
                className="h-12 flex-1 items-center justify-center gap-2 border-2 border-zinc-400 shadow-sm"
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
            className="h-12 flex-1 items-center justify-center gap-2 border-2 border-neutral-800"
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
