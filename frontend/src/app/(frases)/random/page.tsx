'use client';

import { useState, useEffect } from 'react';
import Header from '@/ui/header';
import PostCard from '@/ui/postCard';
import Comments from '@/ui/comments';
import { Divider } from '@nextui-org/react';
import AddComment from '@/ui/addComment';
import Navbar from '@/ui/navbar';

interface Usuario {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
}

export default function Random() {
  const [frase, setFrase] = useState<Frase | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFrase = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/random');
      if (!response.ok) throw new Error('Failed to fetch frase');
      const data: Frase = await response.json();
      setFrase(data);
    } catch (error) {
      console.error('Error fetching frase:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (id: string) => {
    try {
      const response = await fetch('/api/addlike', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to like the frase');

      setFrase((prevFrase) =>
        prevFrase ? { ...prevFrase, likes: prevFrase.likes + 1 } : null
      );
    } catch (error) {
      console.error('Error liking frase:', error);
    }
  };

  useEffect(() => {
    fetchFrase();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden flex-1 overflow-y-auto scrollbar-hide">
      <Header title="Post random" />
      <Divider />
      <div className="pb-16">
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400" />
          </div>
        ) : (
          frase && (
            <PostCard key={frase._id} frase={frase} onLike={handleLike} />
          )
        )}
        <Comments comentarios={frase?.comentarios || []} />
        <AddComment
          onSubmit={(value) => console.log('Reply:', value)}
          placeholder="Responder..."
        />
      </div>
      <Navbar />
    </div>
  );
}
