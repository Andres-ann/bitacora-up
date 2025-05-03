'use client';

import { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
} from '@nextui-org/react';
import { Icon } from '@iconify-icon/react';

interface GifPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (gifUrl: string) => void;
}

const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

export default function GifPicker({
  isOpen,
  onClose,
  onSelect,
}: GifPickerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchGifs();
    }
  }, [isOpen]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchGifs(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchGifs = async (query = '') => {
    setLoading(true);
    try {
      const endpoint = query
        ? `https://api.giphy.com/v1/gifs/search?q=${query}&limit=20&api_key=${GIPHY_API_KEY}`
        : `https://api.giphy.com/v1/gifs/trending?limit=20&api_key=${GIPHY_API_KEY}`;
      const res = await fetch(endpoint);
      const { data } = await res.json();
      setGifs(data.map((gif: any) => gif.images.fixed_height.url));
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="rounded-lg">
      <ModalContent>
        <ModalHeader className="flex justify-between items-center text-lg font-semibold">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            <Icon icon="mdi:arrow-left" width={24} />
          </button>
          <span>Elegir un GIF</span>
          <div />
        </ModalHeader>

        <ModalBody>
          <Input
            placeholder="Buscar en GIPHY"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-3 rounded-md"
          />

          {loading ? (
            <p className="text-center text-gray-500">Cargando...</p>
          ) : (
            <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-96 p-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {gifs.map((gif, index) => (
                <div key={index} className="aspect-square">
                  <img
                    src={gif}
                    alt="GIF"
                    className="w-full h-full object-cover cursor-pointer rounded-md hover:opacity-75 transition"
                    onClick={() => {
                      onSelect(gif);
                      onClose();
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
