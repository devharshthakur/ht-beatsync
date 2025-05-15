'use client';

import { useGlobalStore } from '@/store';
import { useRoomStore } from '@/store/slices/room';
import { useEffect } from 'react';
import { Join } from '../../components/root/Join';

export default function Home() {
  const resetGlobalStore = useGlobalStore(state => state.resetStore);
  const resetRoomStore = useRoomStore(state => state.reset);

  useEffect(() => {
    console.log('Resetting stores');
    resetGlobalStore();
    resetRoomStore();
  }, [resetGlobalStore, resetRoomStore]);

  return (
    <main className="from-background to-background/95 min-h-screen bg-gradient-to-b">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10">
        <Join />
      </div>
    </main>
  );
}
