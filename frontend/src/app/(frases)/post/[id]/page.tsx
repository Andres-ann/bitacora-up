'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useAuth } from '@/context/AuthContext';
import { Frase } from '@/types/posts';

import { Divider } from '@nextui-org/react';

import Header from '@/ui/header';
import PostCard from '@/ui/postCard';
import Comments from '@/ui/comments';
import AddComment from '@/ui/addComment';

export default function Post() {
  const router = useRouter();
  const params = useParams();
  const [frase, setFrase] = useState<Frase | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchFrase = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const postId = Array.isArray(params?.id) ? params.id[0] : params.id;
      if (!postId) return;

      const response = await fetch(`/api/posts/${postId}`);
      if (!response.ok) throw new Error('Error al obtener la frase');

      const data = await response.json();
      setFrase(data.docs);
      await addView(postId);
    } catch (error) {
      console.error('Error en fetchFrase:', error);
      setError('Error al cargar el post');
    } finally {
      setIsLoading(false);
    }
  };

  const addView = async (id: string) => {
    try {
      const response = await fetch(`/api/${id}/addview`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error adding view:', errorText);
        throw new Error('Failed to add view');
      }

      const data = await response.json();
      setFrase((prev) =>
        prev
          ? {
              ...prev,
              visualizaciones: data.views || data.frase?.visualizaciones,
            }
          : null
      );
    } catch (error) {
      console.error('Error registrando visualización:', error);
    }
  };

  const handleLike = async (id: string) => {
    try {
      const response = await fetch('/api/addlike', {
        method: 'POST',
        credentials: 'include',
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

  const handleAddCommentFocus = () => {
    if (!user) {
      router.push('/login');
      return;
    }
  };

  const addComment = async (content: string, gifUrl?: string) => {
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      const postId = Array.isArray(params?.id) ? params.id[0] : params.id;
      if (!postId) return;

      const response = await fetch(`/api/${postId}/addcomment`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comentario: content, gif: gifUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to add comment');
      }

      const data = await response.json();
      setFrase((prevFrase) =>
        prevFrase ? { ...prevFrase, comentarios: data.comentarios } : null
      );
    } catch (error) {
      console.error('Error adding comment:', error);
      setError(error instanceof Error ? error.message : 'Error adding comment');
      throw error;
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchFrase();
    }
  }, [params?.id]);

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
        ) : (
          frase && (
            <>
              <PostCard key={frase._id} frase={frase} onLike={handleLike} />
              <Comments comentarios={frase.comentarios} />
            </>
          )
        )}
      </div>
      <AddComment
        onSubmit={addComment}
        onFocus={handleAddCommentFocus}
        placeholder="Responder..."
      />
    </div>
  );
}
