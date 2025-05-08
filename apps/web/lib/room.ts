/**
 * @module Room
 * @description This module provides functions to validate room IDs and create user IDs.
 */

/**
 * Validates a partial room ID.
 *
 * A partial room ID is considered valid if it consists only of digits (0-9).
 *
 * @param {string} roomId - The room ID to validate.
 * @returns {boolean} True if the room ID is valid, false otherwise.
 */
export function validatePartialRoomId(roomId: string): boolean {
  return /^\d*$/.test(roomId);
}

/**
 * Validates a full room ID.
 *
 * A full room ID is considered valid if it consists of exactly 6 digits (0-9).
 *
 * @param {string} roomId - The room ID to validate.
 * @returns {boolean} True if the room ID is valid, false otherwise.
 */
export function validateFullRoomId(roomId: string): boolean {
  return /^[0-9]{6}$/.test(roomId);
}

/**
 * Creates a unique user ID.
 *
 * This function generates a user ID using the `crypto.randomUUID` method if available.
 * If not, it falls back to generating a random string using Math.random.
 *
 * @returns {string} A unique user ID.
 */
export function createUserId(): string {
  if (window.crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  } else {
    // Fallback for insecure contexts
    const randomUserId: string =
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return randomUserId;
  }
}
