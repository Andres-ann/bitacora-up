'use client';

import { Icon } from '@iconify-icon/react';
import { Avatar, Divider } from '@nextui-org/react';
import PostActions from '@/ui/postActions';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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

export default function PostCard() {
  const [frases, setFrases] = useState<Frase[]>([]);

  useEffect(() => {
    const fetchFrases = async () => {
      try {
        const response = await fetch('/api/frases');
        const data = await response.json();
        setFrases(data.docs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchFrases();
  }, []);

  const handleLike = async (id: string) => {
    try {
      const res = await fetch('/api/addlike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error('Failed to like the frase');
      }

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
      {frases.map((frase) => {
        const usuario = {
          name: frase.usuarioId?.name || 'Bitacora UP',
          username: frase.usuarioId?.username || 'bitacoraup',
          avatar:
            frase.usuarioId?.avatar || 'https://i.ibb.co/ZNyjQ2g/favicon.jpg',
        };

        return (
          <div key={frase._id} className="p-4">
            <div className="flex items-start space-x-4">
              {/* Avatar */}
              <Avatar
                size="md"
                className="shadow-lg"
                name={usuario.avatar}
                src={usuario.avatar}
              />

              {/* Información del usuario y post */}
              <div className="flex-1">
                <div className="flex items-center">
                  <p className="text-sm font-medium text-gray-900">
                    {usuario.name}
                  </p>
                  <Icon
                    icon="bitcoin-icons:verify-filled"
                    width="16"
                    className="text-blue-400 align-middle"
                  />
                </div>
                <p className="text-xs text-gray-500">@{usuario.username}</p>
                <div className="p-4 mt-4 text-sm font-light rounded-md border">
                  <Link href="/post">
                    <p className="text-gray-900">{frase.frase}</p>
                    <p className=" mt-6 text-gray-500">- {frase.autor}</p>
                  </Link>
                </div>
                {/* Botones de like, comentar y compartir */}
                <PostActions
                  likes={frase.likes}
                  comments={frase.comentarios.length}
                  views={frase.visualizaciones}
                  id={frase._id}
                  onLike={handleLike}
                />
              </div>
            </div>
            <Divider />
          </div>
        );
      })}
    </>
  );
}
