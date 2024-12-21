'use client';

import { useState, useEffect } from 'react';
import DarkModeBtn from '@/ui/darkmodeBtn';
import Avatar from '@/ui/avatar';
import UserAdd from '@/ui/userAdd';
import PostCard from '@/ui/postCard';
import Navbar from '@/ui/navbar';
import LoadMorePostBtn from '@/ui/loadMorePostBtn';
import { Divider } from '@nextui-org/react';

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

interface PaginatedResponse {
  docs: Frase[];
  hasNextPage: boolean;
  page: number;
}

export default function Home() {
  const [frases, setFrases] = useState<Frase[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFrases = async (pageNum: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/frases?page=${pageNum}`);
      if (!response.ok) throw new Error('Failed to fetch frases');
      const data: PaginatedResponse = await response.json();

      if (pageNum === 1) {
        setFrases(data.docs);
      } else {
        setFrases((prev) => [...prev, ...data.docs]);
      }

      setHasMore(data.hasNextPage);
    } catch (error) {
      console.error('Error fetching frases:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFrases(1);
  }, []);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchFrases(nextPage);
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
    <div className="flex flex-col w-full h-screen overflow-hidden flex-1 overflow-y-auto scrollbar-hide">
      <DarkModeBtn />
      <Avatar />
      <UserAdd />
      <Divider />
      <div className="pb-16">
        {frases.map((frase) => (
          <PostCard key={frase._id} frase={frase} onLike={handleLike} />
        ))}
        {hasMore && (
          <LoadMorePostBtn onClick={handleLoadMore} isLoading={isLoading} />
        )}
      </div>
      <Navbar />
    </div>
  );
}
