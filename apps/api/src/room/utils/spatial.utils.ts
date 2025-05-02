/**
 * @fileoverview
 * Spatial utility functions for managing client positioning and audio gain calculations
 *
 * @Provides helper functions for:
 * - Positioning clients in a circular arrangement
 * - Calculating audio gain based on distance
 *
 * These utilities are crucial for creating a spatial audio experience
 * in a multi-client WebSocket environment.
 *
 * @module SpatialUtils
 */

import { ClientType, PositionType } from '../../utils/types/SharedTypes';

/**
 * Configuration options for client positioning in a spatial audio environment.
 * Allows customization of the circular arrangement of clients.
 *
 * @property {number} [radius=50] - The radius of the circle on which clients are positioned
 * @property {PositionType} [center={x: 0, y: 0}] - The center point of the circular arrangement
 */
interface PositioningOptions {
  radius?: number;
  center?: PositionType;
}

/**
 * Parameters required for calculating audio gain based on client and source positions.
 * Used to determine the volume attenuation for a client based on its distance from the audio source.
 *
 * @property {PositionType} client - The current position of the client in the spatial audio space
 * @property {PositionType} source - The position of the audio source
 * @property {number} [falloff] - Falloff factor affecting how quickly gain decreases with distance
 * @property {number} [minGain] - The minimum gain value, ensuring some audio is always audible
 * @property {number} [maxGain] - The maximum gain value for full volume
 */
interface GainParams {
  client: PositionType;
  source: PositionType;
  falloff?: number;
  minGain?: number;
  maxGain?: number;
}

/**
 * Calculates the Euclidean distance between two points
 *
 * @param {PositionType} point1 - First point coordinates
 * @param {PositionType} point2 - Second point coordinates
 * @returns {number} Distance between the two points
 */
const calculateDistance = (point1: PositionType, point2: PositionType): number => {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Positions clients in a circular arrangement
 *
 * Distributes clients evenly around a circle, ensuring equal spacing
 *
 * @param {Map<string, ClientType>} clients - Map of clients to position
 * @param {PositioningOptions} [options] - Optional configuration for positioning
 */
export function positionClientsInCircle(
  clients: Map<string, ClientType>,
  options: PositioningOptions = {},
): void {
  const { radius = 50, center = { x: 0, y: 0 } } = options;

  const clientsArray = Array.from(clients.values());
  const clientCount = clientsArray.length;

  if (clientCount <= 0) return;

  clientsArray.forEach((client, index) => {
    // Calculate position on circle based on index
    const angle = (index / clientCount) * 2 * Math.PI;
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);

    // Update client position
    client.position = { x, y };
    clients.set(client.clientId, client);
  });
}

/**
 * Main function to calculate gain based on distance between source and client
 * Delegates to the quadratic falloff algorithm by default
 *
 * @param {GainParams} params - Parameters for gain calculation
 * @returns {number} Calculated gain value between minGain and maxGain
 */
export const calculateGainFromDistanceToSource = (params: GainParams): number => {
  return gainFromDistanceQuadratic(params);
};

/**
 * Calculates audio gain with exponential falloff based on distance
 *
 * Gain decreases exponentially with distance, creating a more natural
 * sound attenuation model similar to real-world physics
 *
 * @param {GainParams} params - Parameters for gain calculation
 * @returns {number} Calculated gain value between minGain and maxGain
 */
export function gainFromDistanceExp({
  client,
  source,
  falloff = 0.05,
  minGain = 0.15,
  maxGain = 1.0,
}: GainParams): number {
  const distance = calculateDistance(client, source);
  const gain = maxGain * Math.exp(-falloff * distance);
  return Math.max(minGain, gain);
}

/**
 * Calculates audio gain with linear falloff based on distance
 *
 * Gain decreases linearly with distance, creating a simple
 * and predictable attenuation model
 *
 * @param {GainParams} params - Parameters for gain calculation
 * @returns {number} Calculated gain value between minGain and maxGain
 */
export function gainFromDistanceLinear({
  client,
  source,
  falloff = 0.01,
  minGain = 0.15,
  maxGain = 1.0,
}: GainParams): number {
  const distance = calculateDistance(client, source);
  // Linear falloff: gain decreases linearly with distance
  const gain = maxGain - falloff * distance;
  return Math.max(minGain, gain);
}

/**
 * Calculates audio gain with quadratic falloff based on distance
 *
 * Gain decreases with the square of distance, creating a more
 * aggressive attenuation for distant sources while maintaining
 * clarity for nearby sources
 *
 * @param {GainParams} params - Parameters for gain calculation
 * @returns {number} Calculated gain value between minGain and maxGain
 */
export function gainFromDistanceQuadratic({
  client,
  source,
  falloff = 0.001,
  minGain = 0.15,
  maxGain = 1.0,
}: GainParams): number {
  const distance = calculateDistance(client, source);
  // Quadratic falloff: gain decreases with square of distance
  const gain = maxGain - falloff * distance * distance;
  return Math.max(minGain, gain);
}
