/**
 * @fileOverview This module defines foundational schemas and constants related to
 * positions and grid settings used throughout the application. It includes
 * the position schema for defining coordinates within a grid and constants
 * for grid dimensions.
 */

import { z } from 'zod';

/**
 * Constants for grid settings.
 * @constant {Object} GRID
 * @property {number} SIZE - The size of the grid.
 * @property {number} ORIGIN_X - The X coordinate of the grid's origin.
 * @property {number} ORIGIN_Y - The Y coordinate of the grid's origin.
 * @property {number} CLIENT_RADIUS - The radius of the client.
 */
export const GRID = {
  SIZE: 100,
  ORIGIN_X: 50,
  ORIGIN_Y: 50,
  CLIENT_RADIUS: 25,
} as const;

/**
 * Schema for defining a position within the grid.
 */
export const PositionSchema = z.object({
  x: z.number().min(0).max(GRID.SIZE),
  y: z.number().min(0).max(GRID.SIZE),
});

/**
 * Type inferred from the PositionSchema.
 * @typedef {PositionType}
 */
export type PositionType = z.infer<typeof PositionSchema>;
