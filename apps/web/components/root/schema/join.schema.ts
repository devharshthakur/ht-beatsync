/**
 * @file join.schema.ts
 * @description This file contains the zod schema definition for joining a room.
 * Validates that roomId is a string of exactly 6 digits.
 */

import { z } from 'zod';

/**
 * Schema for validating the data required to join a room.
 * This schema ensures that the roomId is a string of exactly 6 digits.
 */
export const JoinFromSchema = z.object({
  roomId: z
    .string()
    .min(6, 'Room code must be exactly 6 characters long.')
    .max(6, 'Room code must be exactly 6 characters long.')
    .refine(val => /^\d{6}$/.test(val), 'Room code should only contain digits.'), // Validates that roomId consists only of digits
});

export type JoinFromData = z.infer<typeof JoinFromSchema>;
