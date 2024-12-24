'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/ui/header';
import PostCard from '@/ui/postCard';
import Comments from '@/ui/comments';
import { Divider } from '@nextui-org/react';
import AddComment from '@/ui/addComment';

// Importamos la interfaz Usuario del PostCard o la definimos igual
interface Usuario {
  name: string;
  username: string;
  avatar?: string;
}

// Esta interfaz es para uso interno del componente Post
interface ComentarioExtendido {
  _id: string;
  comentario: string;
  usuarioId: Usuario;
  createdAt: string;
}

// Esta interfaz debe coincidir exactamente con la de PostCard
interface FraseParaCard {
  _id: string;
  frase: string;
  autor: string;
  likes: number;
  visualizaciones: number;
  comentarios: []; // Mantenemos esto como array vacío para coincidir con PostCard
  usuarioId?: Usuario;
}

// Esta interfaz es para uso interno y extiende la información
interface FraseCompleta extends Omit<FraseParaCard, 'comentarios'> {
  comentarios: ComentarioExtendido[];
  createdAt: string;
  updatedAt: string;
}

export default function Post() {
  const params = useParams();
  const postId = params.id as string;
  const [frase, setFrase] = useState<FraseCompleta | null>(null);
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
      <Header title="Post" />
      <Divider />
      <div className="pb-16">
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400" />
          </div>
        ) : frase ? (
          <>
            <PostCard
              key={frase._id}
              frase={{
                ...frase,
                comentarios: [],
              }}
              onLike={handleLike}
            />
            <Comments comentarios={frase.comentarios} />
            <AddComment
              onSubmit={(value) => console.log('Reply:', value)}
              placeholder="Responder..."
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
