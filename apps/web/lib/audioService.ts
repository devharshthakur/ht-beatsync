import { v4 as uuidv4 } from 'uuid';
import { RawAudioSource } from './localTypes';

// Define a song metadata interface
export interface SongMetadata {
  id: string;
  name: string;
  path: string;
}

/**
 * Get a list of all available songs in the public directory
 *
 * @returns {SongMetadata[]} Array of song metadata
 */
export const getAvailableSongs = (): SongMetadata[] => {
  // These are the songs in the public/songs directory
  const songFiles = [
    'wonder.mp3',
    'trndsttr.mp3',
    'joyful - chess (slowed).mp3',
    'chess.mp3',
    'Tom Reev, Assix & Jason Gewalt - Where It Hurts.mp3',
    "STVCKS - Don't Be Scared.mp3",
    'Jacob Tillberg - Feel You.mp3',
    'Illenium - Fractures (feat. Nevve).mp3',
    'INZO x ILLUSIO - Just A Mirage.mp3',
    'DROELOE x San Holo - Lines of the Broken (ft. CUT).mp3',
  ];

  return songFiles.map(filename => ({
    id: uuidv4(), // Generate a unique ID for each song
    name: formatSongName(filename),
    path: `/songs/${filename}`,
  }));
};

/**
 * Format a song filename to a more readable name
 *
 * @param {string} filename - The raw filename
 * @returns {string} Formatted song name
 */
export const formatSongName = (filename: string): string => {
  // Remove the file extension
  return filename.replace(/\.[^.]+$/, '');
};

/**
 * Load a song from a URL and convert it to a raw audio source
 *
 * @param {SongMetadata} song - The song metadata
 * @returns {Promise<RawAudioSource>} The raw audio source
 */
export const loadSong = async (song: SongMetadata): Promise<RawAudioSource> => {
  try {
    const response = await fetch(song.path);

    if (!response.ok) {
      throw new Error(`Failed to fetch song: ${response.status} ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    return {
      id: song.id,
      name: song.name,
      audioBuffer: arrayBuffer,
    };
  } catch (error) {
    console.error(`Error loading song ${song.name}:`, error);
    throw error;
  }
};

/**
 * Load multiple songs at once
 *
 * @param {SongMetadata[]} songs - Array of song metadata
 * @param {Function} onProgress - Optional callback for progress updates
 * @returns {Promise<RawAudioSource[]>} Array of raw audio sources
 */
export const loadSongs = async (
  songs: SongMetadata[],
  onProgress?: (loaded: number, total: number) => void,
): Promise<RawAudioSource[]> => {
  const total = songs.length;
  const results: RawAudioSource[] = [];

  for (let i = 0; i < songs.length; i++) {
    try {
      const song = await loadSong(songs[i]!);
      results.push(song);

      // Call progress callback if provided
      if (onProgress) {
        onProgress(i + 1, total);
      }
    } catch (error) {
      console.error(`Failed to load song ${songs[i]!.name}:`, error);
      // Continue loading other songs even if one fails
    }
  }

  return results;
};
