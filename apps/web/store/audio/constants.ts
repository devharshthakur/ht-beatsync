/**
 * @fileoverview Audio constants and static data
 *
 * This file contains constants related to audio playback, including
 * the list of static audio sources available in the application.
 */

import { StaticAudioSource } from '../types';

/**
 * List of static audio sources available in the application
 * These are pre-loaded and always available for playback
 *
 * @type {StaticAudioSource[]}
 */
export const STATIC_AUDIO_SOURCES: StaticAudioSource[] = [
  {
    name: 'Jacob Tillberg - Feel You',
    url: '/Jacob Tillberg - Feel You.mp3',
    id: 'static-0',
  },
  {
    name: 'Black Coast - TRNDSTTR (Lucian Remix)',
    url: '/trndsttr.mp3',
    id: 'static-1',
  },
  {
    name: "STVCKS - Don't Be Scared",
    url: "/STVCKS - Don't Be Scared.mp3",
    id: 'static-2',
  },
  {
    name: 'INZO x ILLUSIO - Just A Mirage',
    url: '/INZO x ILLUSIO - Just A Mirage.mp3',
    id: 'static-3',
  },
  {
    name: 'Tom Reev, Assix & Jason Gewalt - Where It Hurts',
    url: '/Tom Reev, Assix & Jason Gewalt - Where It Hurts.mp3',
    id: 'static-4',
  },
  {
    name: 'DROELOE x San Holo - Lines of the Broken (ft. CUT)',
    url: '/DROELOE x San Holo - Lines of the Broken (ft. CUT).mp3',
    id: 'static-5',
  },
  {
    name: 'joyful - chess (slowed)',
    url: '/joyful - chess (slowed).mp3',
    id: 'static-6',
  },
];
