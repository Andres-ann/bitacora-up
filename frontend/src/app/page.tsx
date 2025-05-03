'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Logo from '@/ui/logo';
import Navbar from '@/ui/navbar';
import UserAdd from '@/ui/userAdd';
import PostCard from '@/ui/postCard';

import { Frase } from '@/types/posts';
import { Divider } from '@nextui-org/react';

interface PaginatedResponse {
  docs: Frase[];
  hasNextPage: boolean;
  page: number;
}

export default function Home() {
  const [frases, setFrases] = useState<Frase[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement>(null);

  const fetchFrases = useCallback(async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/posts?page=${page + 1}`);
      if (!response.ok) throw new Error('Failed to fetch frases');
      const data: PaginatedResponse = await response.json();

      setFrases((prevFrases) => {
        const existingIds = new Set(prevFrases.map((f) => f._id));
        const newFrases = data.docs.filter(
          (frase) => !existingIds.has(frase._id)
        );
        return [...prevFrases, ...newFrases];
      });

      setHasMore(data.hasNextPage);
      setPage(data.page);
    } catch (error) {
      console.error('Error fetching frases:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, page]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting) {
        fetchFrases();
      }
    },
    [fetchFrases]
  );

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 0.5,
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [handleObserver]);

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
      <Logo />
      <UserAdd />
      <Divider />
      <div className="pb-16">
        {frases.map((frase) => (
          <PostCard key={frase._id} frase={frase} onLike={handleLike} />
        ))}

        <div
          ref={observerRef}
          className="w-full h-10 flex items-center justify-center">
          {isLoading && (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400" />
          )}
        </div>
      </div>
      <Navbar />
    </div>
  );
}
