'use client';

import { useEffect, useState } from 'react';
import { Dino } from './types';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  const [dinosaurs, setDinosaurs] = useState<Dino[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/dinosaurs`);
      const allDinosaurs = (await response.json()) as Dino[];
      setDinosaurs(allDinosaurs);
    })();
  }, []);

  return (
    <main className="text-center m-10">
      <h1 className="text-3xl">Welcome to the Dinosaur app</h1>
      <p>Click on a dinosaur below to learn more.</p>
      <ul>
        {dinosaurs.map((dinosaur: Dino) => {
          return (
            <li key={dinosaur.name}>
              <Link href={`/${dinosaur.name.toLowerCase()}`}>{dinosaur.name}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
