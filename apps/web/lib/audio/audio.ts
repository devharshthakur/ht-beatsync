import axios from 'axios';

/**
 * Utility functions for audio file management
 */

/**
 * Loads an audio file from a given URL and returns a promise that resolves with the audio buffer.
 * @param {string} url - The URL of the audio file to load.
 * @returns {Promise<AudioBuffer>} - A promise that resolves with the loaded audio buffer.
 */
export const loadAudioFile = async (url: string): Promise<AudioBuffer> => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return await audioContext.decodeAudioData(response.data);
};

/**
 * Plays an audio buffer using the Web Audio API.
 * @param {AudioBuffer} audioBuffer - The audio buffer to play.
 * @returns {AudioBufferSourceNode} - The source node used to play the audio.
 */
export const playAudioBuffer = (audioBuffer: AudioBuffer): AudioBufferSourceNode => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start(0);
  return source;
};

/**
 * Stops an audio playback.
 * @param {AudioBufferSourceNode} source - The source node to stop.
 */
export const stopAudioPlayback = (source: AudioBufferSourceNode): void => {
  source.stop();
};
