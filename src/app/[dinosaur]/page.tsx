'use client';

import { useEffect, useState } from 'react';
import { Dino } from '../types';
import Link from 'next/link';

type RouteParams = { params: Promise<{ dinosaur: string }> };

export default function Dinosaur({ params }: RouteParams) {
  const selectedDinosaur = params.then((params) => params.dinosaur);
  const [dinosaur, setDino] = useState<Dino>({ name: '', description: '' });

  useEffect(() => {
    (async () => {
      const resp = await fetch(`/api/dinosaurs/${await selectedDinosaur}`);
      const dino = (await resp.json()) as Dino;
      setDino(dino);
    })();
  }, []);

  return (
    <main className="text-center mt-20">
      <h1 className="mt-40 font-extrabold text-2xl">{dinosaur.name}</h1>
      <p className="m-10 text-rose-800">{dinosaur.description}</p>
      <Link href="/" className="mb-11">
        🠠 Back to all dinosaurs
      </Link>
    </main>
  );
}
