'use client';

import { generateName } from '@/lib/randomNames';
import { useRoomStore } from '@/store/slices/room';
import { useEffect } from 'react';
import { Dashboard } from './dashboard';
import { WebSocketManager } from './WebSocketManager';

interface NewSyncerProps {
  roomId: string;
}

/**
 * Main component for the BeatSync room that manages WebSocket connections and renders the dashboard
 *
 * @component
 * @param {NewSyncerProps} props - Component props
 * @returns {JSX.Element} The rendered component
 */
export const NewSyncer = ({ roomId }: NewSyncerProps) => {
  const setUsername = useRoomStore(state => state.setUsername);
  const setRoomId = useRoomStore(state => state.setRoomId);
  const username = useRoomStore(state => state.username);

  // Generate a new random username when the component mounts
  useEffect(() => {
    setRoomId(roomId);
    if (!username) {
      setUsername(generateName());
    }
  }, [setUsername, username, roomId, setRoomId]);

  return (
    <div className="animate-fadeIn">
      {/* WebSocket connection manager (non-visual component) */}
      <WebSocketManager roomId={roomId} username={username} />

      {/* Main dashboard UI */}
      <Dashboard roomId={roomId} />
    </div>
  );
};
