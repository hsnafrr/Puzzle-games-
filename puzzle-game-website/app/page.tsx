'use client';

import { useState } from 'react';
import { Landing } from '@/components/landing';
import { Game } from '@/components/game';

export default function Home() {
  const [isGameActive, setIsGameActive] = useState(false);

  return (
    <main className="min-h-screen w-full">
      {!isGameActive ? (
        <Landing onStartGame={() => setIsGameActive(true)} />
      ) : (
        <Game onBack={() => setIsGameActive(false)} />
      )}
    </main>
  );
}
