'use client';
import { RawAudioSource } from '@/lib/localTypes';
import { trimFileName } from '@/lib/util';
import { useGlobalStore } from '@/store';
import { useRoomStore } from '@/store/slices/room';
import { NTPMeasurement, processNTPResponse } from '@/utils/ntp';
import { epochNow, NTPResponseMessageType, WSResponseSchema } from '@repo/shared';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface WebSocketManagerProps {
  roomId: string; // Unique identifier for the room
  username: string; // Username of the connected user
}

/**
 * WebSocketManager component that manages the WebSocket connection for the room.
 *
 * @param {WebSocketManagerProps} props - The properties for the WebSocketManager component.
 * @returns {null} This component does not render any visual output.
 */
export const WebSocketManager = ({ roomId, username }: WebSocketManagerProps) => {
  // Room state
  const isLoadingRoom = useRoomStore(state => state.isLoadingRoom);
  const setUserId = useRoomStore(state => state.setUserId);

  // WebSocket and audio state
  const setSocket = useGlobalStore(state => state.setSocket);
  const socket = useGlobalStore(state => state.socket);
  const schedulePlay = useGlobalStore(state => state.schedulePlay);
  const schedulePause = useGlobalStore(state => state.schedulePause);
  const processSpatialConfig = useGlobalStore(state => state.processSpatialConfig);
  const sendNTPRequest = useGlobalStore(state => state.sendNTPRequest);
  const addNTPMeasurement = useGlobalStore(state => state.addNTPMeasurement);
  const addAudioSource = useGlobalStore(state => state.addAudioSource);
  const hasDownloadedAudio = useGlobalStore(state => state.hasDownloadedAudio);
  const setConnectedClients = useGlobalStore(state => state.setConnectedClients);
  const isSpatialAudioEnabled = useGlobalStore(state => state.isSpatialAudioEnabled);
  const setIsSpatialAudioEnabled = useGlobalStore(state => state.setIsSpatialAudioEnabled);
  const processStopSpatialAudio = useGlobalStore(state => state.processStopSpatialAudio);

  // Effect to manage WebSocket connection once the room has loaded
  useEffect(() => {
    // Ensure the effect runs only when the room is loaded and valid credentials are provided
    if (isLoadingRoom || !roomId || !username) return;

    console.log('Connecting to websocket');

    // Prevent creating a new connection if one already exists
    if (socket) {
      return;
    }

    const SOCKET_URL = `${process.env.NEXT_PUBLIC_WS_URL}?roomId=${roomId}&username=${username}`;
    console.log('Creating new socket to', SOCKET_URL);
    const ws = new WebSocket(SOCKET_URL);
    setSocket(ws);

    // WebSocket event handlers
    ws.onopen = () => {
      console.log('Websocket onopen fired.');
      // Initiate NTP request for synchronization
      sendNTPRequest();
    };

    ws.onclose = () => {
      console.log('Websocket onclose fired.');
    };

    ws.onmessage = async msg => {
      const response = WSResponseSchema.parse(JSON.parse(msg.data));

      // Handle different types of responses from the server
      if (response.type === 'NTP_RESPONSE') {
        const ntpMeasurement = processNTPResponse(response);
        addNTPMeasurement(ntpMeasurement);

        // Schedule the next NTP request after a short delay
        setTimeout(() => {
          sendNTPRequest();
        }, 30); // 30ms delay to avoid overwhelming the server
      } else if (response.type === 'ROOM_EVENT') {
        const { event } = response;
        console.log('Room event:', event);

        // Handle client changes and new audio sources
        if (event.type === 'CLIENT_CHANGE') {
          setConnectedClients(event.clients);
        } else if (event.type === 'NEW_AUDIO_SOURCE') {
          console.log('Received new audio source:', response);
          const { title, id } = event;

          // Skip fetching if the audio file is already downloaded
          if (hasDownloadedAudio(id)) {
            console.log(`Audio file ${id} already downloaded, skipping fetch`);
            return;
          }

          // Fetch the new audio source
          toast.promise(
            axios
              .get(`/api/audio/${id}`, { responseType: 'blob' })
              .then(async response => {
                const blob = response.data;
                console.log('Audio fetched successfully:', id);
                try {
                  const arrayBuffer = await blob.arrayBuffer();
                  console.log('ArrayBuffer created successfully');
                  const audioSource: RawAudioSource = {
                    name: trimFileName(title),
                    audioBuffer: arrayBuffer,
                    id: id,
                  };
                  return addAudioSource(audioSource);
                } catch (error) {
                  console.error('Error processing audio data:', error);
                  throw new Error('Failed to process audio data');
                }
              })
              .catch(error => {
                console.error('Error fetching audio:', error);
                throw error;
              }),
            {
              loading: 'Loading audio...',
              success: `Added: ${title}`,
              error: 'Failed to load audio',
            },
          );
        }
      } else if (response.type === 'SCHEDULED_ACTION') {
        // Handle scheduled actions from the server
        console.log('Received scheduled action:', response);
        const { scheduledAction, serverTimeToExecute } = response;

        // Execute the appropriate action based on the type
        if (scheduledAction.type === 'PLAY') {
          schedulePlay({
            trackTimeSeconds: scheduledAction.trackTimeSeconds,
            targetServerTime: serverTimeToExecute,
            audioId: scheduledAction.audioId,
          });
        } else if (scheduledAction.type === 'PAUSE') {
          schedulePause({
            targetServerTime: serverTimeToExecute,
          });
        } else if (scheduledAction.type === 'SPATIAL_CONFIG') {
          processSpatialConfig(scheduledAction);
          if (!isSpatialAudioEnabled) {
            setIsSpatialAudioEnabled(true);
          }
        } else if (scheduledAction.type === 'STOP_SPATIAL_AUDIO') {
          processStopSpatialAudio();
        }
      } else if (response.type === 'SET_CLIENT_ID') {
        setUserId(response.clientId);
      } else {
        console.log('Unknown response type:', response);
      }
    };

    // Cleanup function to close the WebSocket connection on unmount or dependency change
    return () => {
      console.log('Running cleanup for WebSocket connection');
      ws.close();
    };
    // Note: Not including socket in the dependency array to prevent triggering close when it's set
  }, [isLoadingRoom, roomId, username]);

  return null; // This component does not render any visual output
};
