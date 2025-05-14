/**
 * OtpInput component for entering a one-time password (OTP).
 *
 * @component
 * @param {OtpInputProps} props - The properties for the OtpInput component.
 * @param {string} props.value - The current value of the OTP input.
 * @param {(value: string) => void} props.onChange - Callback function to handle value changes.
 * @param {() => void} [props.onBlur] - Optional callback function for blur event.
 * @param {string} [props.error] - Optional error message to display.
 * @param {number} [props.length=6] - The number of input slots for the OTP.
 * @param {boolean} [props.disabled=false] - Flag to disable the input.
 * @returns {JSX.Element} The rendered OtpInput component.
 *
 * @example
 * <OtpInput value={otpValue} onChange={setOtpValue} />
 */
import React, { useCallback, useMemo } from 'react';
import { useRef } from 'react';
import AlertCircle from '../svg/AlertCircle';
import { el } from '@faker-js/faker';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  length?: number;
  disabled?: boolean;
}

/**
 * OtpInput component for entering a one-time password (OTP).
 *
 * This component renders a series of input fields for users to enter their OTP.
 * It handles input changes, focus management, and displays error messages if needed.
 *
 * @param {OtpInputProps} props - The properties for the OtpInput component.
 * @returns {JSX.Element} The rendered OtpInput component.
 */
export const OtpInput: React.FC<OtpInputProps> = ({ value, onChange, onBlur, error, length = 6, disabled = false }) => {
  const slots = useMemo(() => Array.from({ length }, (_, i) => value[i] || ''), [value, length]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(length).fill(null));

  const handleSlotChange = useCallback(
    (slotIndex: number, char: string) => {
      if (!/^[0-9a-zA-Z]?$/.test(char)) return;

      const chars = value.split('');
      chars[slotIndex] = char;
      const newValue = chars.join('').slice(0, length);
      onChange(newValue);

      if (char && slotIndex < length - 1) {
        const nextInputRef = inputRefs.current[slotIndex + 1];
        nextInputRef?.focus();
      }
    },
    [value, length, onChange, inputRefs],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
      if (e.key === 'Backspace' && !slots[idx] && idx > 0) {
        const prevInputRef = inputRefs.current[idx - 1];
        prevInputRef?.focus();
      }
    },
    [slots, inputRefs],
  );

  return (
    <div className="flex w-full flex-col space-y-3">
      <div className="flex items-center justify-center gap-2 md:gap-3">
        {slots.map((char, idx) => (
          <input
            key={idx}
            id={`otp-slot-${idx}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={char}
            onChange={e => handleSlotChange(idx, e.target.value)}
            onBlur={onBlur}
            onKeyDown={e => handleKeyDown(e, idx)}
            disabled={disabled}
            ref={el => {
              inputRefs.current[idx] = el;
            }}
            className={`md:h-18 md:w-18 h-16 w-16 rounded-lg border-[1.5px] bg-transparent text-center text-2xl font-medium transition-all duration-200 ${
              error ? 'border-destructive text-destructive shadow-destructive/5' : 'border-border text-foreground'
            } focus:border-primary focus:shadow-primary/10 focus:ring-primary/20 hover:border-primary/50 disabled:hover:border-border outline-none focus:shadow-md focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50`}
            autoFocus={idx === 0}
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
