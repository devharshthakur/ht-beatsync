'use client';

import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { Code2, Zap, Layers, ChevronRight, ExternalLink, Server, Database, BookOpen } from 'lucide-react';
import { useGlobalStore } from '@/store';
import { useRoomStore } from '@/store/slices/room';
import { useEffect } from 'react';
import { Join } from './components/Join';

export default function Home() {
  const resetGlobalStore = useGlobalStore(state => state.resetStore);
  const resetRoomStore = useRoomStore(state => state.reset);

  useEffect(() => {
    console.log('Resetting stores');
    resetGlobalStore();
    resetRoomStore();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <Join />
    </div>
  );
}
