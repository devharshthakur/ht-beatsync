import { create } from 'zustand';

interface RoomStateValues {
  roomId: string;
  username: string;
  userId: string;
  isLoadingRoom: boolean;
}

interface RoomState extends RoomStateValues {
  setRoomId: (roomId: string) => void;
  setUsername: (username: string) => void;
  setUserId: (userId: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  reset: () => void;
}

const initialState: RoomStateValues = {
  roomId: '',
  username: '',
  userId: '',
  isLoadingRoom: false,
};

export const useRoomStore = create<RoomState>()(set => ({
  ...initialState,
  setRoomId: roomId => set({ roomId }),
  setUsername: username => set({ username }),
  setUserId: userId => set({ userId }),
  setIsLoading: isLoading => set({ isLoadingRoom: isLoading }),

  reset: () =>
    set(state => ({
      ...initialState,
      username: state.username,
    })),
}));
