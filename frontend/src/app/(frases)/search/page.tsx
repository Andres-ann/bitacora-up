'use client';

import { useState } from 'react';
import Header from '@/ui/header';
import Search from '@/ui/search';
import Navbar from '@/ui/navbar';
import { Divider } from '@nextui-org/react';
import PostCard from '@/ui/postCard';
import { Frase } from '@/types';

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<Frase[]>([]);
  const [query, setQuery] = useState('');

  const handleSearch = async (query: string) => {
    setQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`/api/search?query=${query}`);

      if (!response.ok) {
        if (response.status === 404) {
          setSearchResults([]);
          return;
        }
        throw new Error('Failed to fetch search results');
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching:', error);
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

      setSearchResults((prevFrases) =>
        prevFrases.map((frase) =>
          frase._id === id ? { ...frase, likes: frase.likes + 1 } : frase
        )
      );
    } catch (error) {
      console.error('Error liking frase:', error);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden flex-1 pb-6 overflow-y-auto scrollbar-hide">
      <Header title="Buscar" />
      <Divider />
      <Search onSearch={handleSearch} />
      <div className="p-4">
        {searchResults.length === 0 && query.trim() !== '' ? (
          <div className="p-4 font-light text-center text-gray-500">
            No se encontraron resultados
          </div>
        ) : (
          searchResults.map((frase) => (
            <PostCard key={frase._id} frase={frase} onLike={handleLike} />
          ))
        )}
      </div>
      <Navbar />
    </div>
  );
}
