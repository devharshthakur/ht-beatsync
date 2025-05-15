/**
 * @fileoverview Service for loading local audio files
 *
 * This file provides utilities for loading audio files from the public directory
 * and converting them to the format required by the audio player.
 */

import { RawAudioSource } from './localTypes';

/**
 * Interface for a local song with metadata
 */
interface LocalSong {
  id: string;
  name: string;
  path: string;
}

/**
 * Generate a unique ID for a song
 *
 * @param {string} name - Song name
 * @param {number} index - Index in the list
 * @returns {string} A unique ID
 */
const generateUniqueId = (name: string, index: number): string => {
  // Create a hash from the song name and index to ensure uniqueness
  const hash = Math.abs(
    name.split('').reduce((acc, char, i) => {
      return acc + char.charCodeAt(0) * (i + 1);
    }, 0) + index,
  ).toString(16);

  return `song-${hash}-${index}`;
};

/**
 * Lists all available songs in the public/songs directory
 *
 * @returns {LocalSong[]} Array of songs with their metadata
 */
export const getLocalSongs = (): LocalSong[] => {
  // These songs are in /public/songs/
  // Based on the folder contents from the attached files
  const songs = [
    { name: 'Jacob Tillberg - Feel You', path: '/songs/Jacob Tillberg - Feel You.mp3' },
    { name: 'Black Coast - TRNDSTTR (Lucian Remix)', path: '/songs/trndsttr.mp3' },
    { name: "STVCKS - Don't Be Scared", path: "/songs/STVCKS - Don't Be Scared.mp3" },
    { name: 'INZO x ILLUSIO - Just A Mirage', path: '/songs/INZO x ILLUSIO - Just A Mirage.mp3' },
    {
      name: 'Tom Reev, Assix & Jason Gewalt - Where It Hurts',
      path: '/songs/Tom Reev, Assix & Jason Gewalt - Where It Hurts.mp3',
    },
    {
      name: 'DROELOE x San Holo - Lines of the Broken (ft. CUT)',
      path: '/songs/DROELOE x San Holo - Lines of the Broken (ft. CUT).mp3',
    },
    { name: 'joyful - chess (slowed)', path: '/songs/joyful - chess (slowed).mp3' },
    { name: 'Illenium - Fractures (feat. Nevve)', path: '/songs/Illenium - Fractures (feat. Nevve).mp3' },
    { name: 'chess', path: '/songs/chess.mp3' },
    { name: 'wonder', path: '/songs/wonder.mp3' },
  ];

  // Add unique IDs to each song
  return songs.map((song, index) => ({
    ...song,
    id: generateUniqueId(song.name, index),
  }));
};

/**
 * Loads a song file from the public directory
 *
 * @param {LocalSong} song - Song metadata to load
 * @returns {Promise<RawAudioSource>} Promise resolving to the loaded audio source
 */
export const loadSongFile = async (song: LocalSong): Promise<RawAudioSource> => {
  try {
    console.log(`Fetching song: ${song.name} from path: ${song.path}`);

    // Use absolute path starting with origin to ensure correct path resolution
    const absolutePath = window.location.origin + song.path;
    const response = await fetch(absolutePath);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${absolutePath}: ${response.status} ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    console.log(`Successfully loaded song: ${song.name}, size: ${arrayBuffer.byteLength} bytes`);

    return {
      name: song.name,
      audioBuffer: arrayBuffer,
      id: song.id,
    };
  } catch (error) {
    console.error(`Error loading song ${song.name}:`, error);
    throw error;
  }
};

/**
 * Loads all available songs from the public directory
 *
 * @returns {Promise<RawAudioSource[]>} Promise resolving to an array of loaded audio sources
 */
export const loadAllLocalSongs = async (): Promise<RawAudioSource[]> => {
  const songs = getLocalSongs();
  console.log(`Attempting to load ${songs.length} songs`);

  try {
    // Load songs sequentially to avoid overwhelming the browser
    const loadedSongs: RawAudioSource[] = [];

    for (const song of songs) {
      try {
        const loadedSong = await loadSongFile(song);
        loadedSongs.push(loadedSong);
      } catch (error) {
        console.error(`Failed to load song: ${song.name}`, error);
        // Continue with the next song instead of failing the entire process
      }
    }

    console.log(`Successfully loaded ${loadedSongs.length} out of ${songs.length} songs`);
    return loadedSongs;
  } catch (error) {
    console.error('Error loading all songs:', error);
    // Return any songs that loaded successfully instead of failing completely
    return [];
  }
};
