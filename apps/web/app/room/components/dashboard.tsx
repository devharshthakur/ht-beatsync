'use client';

import { useGlobalStore } from '@/store';
import { useRoomStore } from '@/store/slices/room';
import { useEffect, useState } from 'react';
import { PlayAudioParams, PauseAudioParams } from '@/store/types';

interface DashboardProps {
  roomId: string;
}

export const Dashboard = ({ roomId }: DashboardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Room state
  const username = useRoomStore(state => state.username);
  const userId = useRoomStore(state => state.userId);

  // Global state
  const connectedClients = useGlobalStore(state => state.connectedClients);
  const audioSources = useGlobalStore(state => state.audioSources);
  const selectedAudioId = useGlobalStore(state => state.selectedAudioId);
  const isPlaying = useGlobalStore(state => state.isPlaying);

  // Playback controls from global store
  const playAudio = useGlobalStore(state => state.playAudio);
  const pauseAudio = useGlobalStore(state => state.pauseAudio);
  const reuploadAudio = useGlobalStore(state => state.reuploadAudio);

  useEffect(() => {
    // Set loading to false once we have essential data
    if (userId && roomId) {
      setIsLoading(false);
    }
  }, [userId, roomId]);

  // Handler for play/pause button
  const handlePlayPause = () => {
    if (isPlaying) {
      pauseAudio({ when: 0 } as PauseAudioParams);
    } else {
      playAudio({ offset: 0, when: 0 } as PlayAudioParams);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Room: {roomId}</h1>
        <p className="text-muted-foreground">Connected as {username}</p>
      </header>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left column - Audio player and controls */}
          <div className="space-y-6">
            <div className="bg-muted rounded-lg p-4">
              <h2 className="mb-4 text-xl font-semibold">Now Playing</h2>
              {selectedAudioId ? (
                <div>
                  <div className="text-lg font-medium">
                    {audioSources.find(source => source.id === selectedAudioId)?.name || 'Unknown Track'}
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={handlePlayPause}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
                    >
                      {isPlaying ? 'Pause' : 'Play'}
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No track selected</p>
              )}
            </div>

            <div className="bg-muted rounded-lg p-4">
              <h2 className="mb-4 text-xl font-semibold">Library</h2>
              {audioSources.length > 0 ? (
                <ul className="space-y-2">
                  {audioSources.map(source => (
                    <li
                      key={source.id}
                      className={`cursor-pointer rounded-md p-3 ${selectedAudioId === source.id ? 'bg-primary/20' : 'hover:bg-muted-foreground/10'}`}
                      onClick={() => {
                        // Set as current audio
                        // This would be implemented in the actual application
                      }}
                    >
                      {source.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-4 text-center">
                  <p className="text-muted-foreground mb-4">No audio files available</p>
                  <button
                    onClick={() => reuploadAudio('', '')}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
                  >
                    Upload Audio
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right column - Connected users */}
          <div className="bg-muted rounded-lg p-4">
            <h2 className="mb-4 text-xl font-semibold">Connected Users</h2>
            {connectedClients && connectedClients.length > 0 ? (
              <ul className="space-y-2">
                {connectedClients.map(client => (
                  <li
                    key={client.clientId}
                    className={`rounded-md p-3 ${client.clientId === userId ? 'bg-primary/20 font-medium' : ''}`}
                  >
                    {client.username} {client.clientId === userId ? '(You)' : ''}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No users connected</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
