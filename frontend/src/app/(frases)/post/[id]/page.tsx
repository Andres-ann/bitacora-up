'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/ui/header';
import PostCard from '@/ui/postCard';
import Respuestas from '@/ui/comments';
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

export default function Post() {
  const params = useParams();
  const postId = params.id as string;
  const [frase, setFrase] = useState<Frase | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFrase = async () => {
    if (!postId) return;

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/posts/${postId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch frase');
      }

      const json = await response.json();
      setFrase(json.data);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Error al cargar el post');
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

      if (!response.ok) {
        throw new Error('Failed to like the frase');
      }

      setFrase((prevFrase) =>
        prevFrase ? { ...prevFrase, likes: prevFrase.likes + 1 } : null
      );
    } catch (error) {
      console.error('Error liking frase:', error);
    }
  };

  useEffect(() => {
    fetchFrase();
  }, [postId]);

  if (error) {
    return (
      <div className="flex flex-col w-full h-screen">
        <Header title="Error" />
        <div className="flex items-center justify-center h-48">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden flex-1 overflow-y-auto scrollbar-hide">
      <Header title="Frase random" />
      <Divider />
      <div className="pb-16">
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400" />
          </div>
        ) : (
          frase && (
            <>
              <PostCard key={frase._id} frase={frase} onLike={handleLike} />
              <Respuestas />
              <AddComment
                onSubmit={(value) => console.log('Reply:', value)}
                placeholder="Responder..."
              />
            </>
          )
        )}
      </div>
      <Navbar />
    </div>
  );
}
