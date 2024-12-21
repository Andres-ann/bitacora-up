'use client';

import { useState, useEffect } from 'react';
import PostCard from '@/ui/postCard';

interface Usuario {
  name: string;
  username: string;
  avatar?: string;
}

interface Frase {
  _id: string;
  frase: string;
  autor: string;
  likes: number;
  visualizaciones: number;
  comentarios: [];
  usuarioId?: Usuario;
}

export default function FraseList() {
  const [frases, setFrases] = useState<Frase[]>([]);

  useEffect(() => {
    const fetchFrases = async () => {
      try {
        const response = await fetch('/api/frases');
        if (!response.ok) throw new Error('Failed to fetch frases');
        const data = await response.json();
        setFrases(data.docs);
      } catch (error) {
        console.error('Error fetching frases:', error);
      }
    };

    fetchFrases();
  }, []);

  const handleLike = async (id: string) => {
    try {
      const response = await fetch('/api/addlike', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to like the frase');

      setFrases((prevFrases) =>
        prevFrases.map((frase) =>
          frase._id === id ? { ...frase, likes: frase.likes + 1 } : frase
        )
      );
    } catch (error) {
      console.error('Error liking frase:', error);
    }
  };

  return (
    <>
      {frases.map((frase) => (
        <PostCard key={frase._id} frase={frase} onLike={handleLike} />
      ))}
    </>
  );
}
