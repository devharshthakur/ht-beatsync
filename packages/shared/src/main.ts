/**
 * @module export
 *
 * This module exports various utility functions and schema definitions used throughout the application.
 *
 * @exports epochNow - A function that returns the current time in milliseconds since the epoch.
 */

export * from './schemas/index';
export const epochNow = () => performance.timeOrigin + performance.now();
