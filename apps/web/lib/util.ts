/**
 * @module Util
 * @description This module provides utility functions for class name manipulation and time formatting.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import pathParse from 'path-parse';

/**
 * Merges class names using clsx and tailwind-merge.
 *
 * This function takes any number of class names as input and merges them into a single string,
 * ensuring that Tailwind CSS classes are correctly combined.
 *
 * @param {...ClassValue[]} inputs - The class names to merge.
 * @returns {string} The merged class name string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a given time in seconds into a string of the format MM:SS.
 *
 * If the input is not a valid number or is zero, it returns '00:00'.
 *
 * @param {number} seconds - The time in seconds to format.
 * @returns {string} The formatted time string in MM:SS format.
 */
export function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) {
    return '00:00';
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formatedTime: string = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  return formatedTime;
}

/**
 * Trims the file name from a given file path.
 *
 * This function extracts the name of the file from the provided file path,
 * removing any directory structure and file extension.
 *
 * @param {string} fileName - The full file path to trim.
 * @returns {string} The trimmed file name without extension.
 */
export function trimFileName(fileName: string): string {
  const trimedFileName = pathParse(fileName).name;
  return trimedFileName;
}
