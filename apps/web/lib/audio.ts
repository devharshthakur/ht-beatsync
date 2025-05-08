/**
 * @module Audio
 * @description This module provides functions to load and play audio files from a specified URL.
 */

import axios from 'axios';

/**
 * Loads an audio file from the specified URL and decodes it into an AudioBuffer.
 *
 * This function creates a new AudioContext, fetches the audio data from the provided URL,
 * and decodes it into an AudioBuffer that can be used for playback.
 *
 * @param {string} url - The URL of the audio file to load.
 * @returns {Promise<AudioBuffer>} A promise that resolves to the decoded AudioBuffer.
 *
 * @throws {Error} Throws an error if the audio file cannot be fetched or decoded.
 */
export const loadAudio = async (url: string): Promise<AudioBuffer> => {
  const audioContext = new AudioContext();
  // Fetch the audio file as an array buffer
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
  });
  // Decode the audio data into an AudioBuffer
  const audioBuffer: AudioBuffer = await audioContext.decodeAudioData(response.data);
  return audioBuffer;
};

/**
 * Plays an audio file from the specified URL.
 *
 * This function creates a new AudioContext, fetches the audio data from the provided URL,
 * decodes it, and plays the audio using a BufferSourceNode.
 *
 * @param {string} url - The URL of the audio file to play.
 * @returns {Promise<void>} A promise that resolves when the audio has started playing.
 *
 * @throws {Error} Throws an error if the audio file cannot be fetched or decoded.
 */
export async function playSound(url: string): Promise<void> {
  const audioContext = new AudioContext();
  // Fetch the audio file as an array buffer
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
  });
  // Decode the audio data into an AudioBuffer
  const audioBuffer = await audioContext.decodeAudioData(response.data);
  // Create a source node to play the audio
  const sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = audioBuffer;
  // Connect the source node to the audio context's destination (speakers)
  sourceNode.connect(audioContext.destination);
  // Start playback of the audio
  sourceNode.start();
}
