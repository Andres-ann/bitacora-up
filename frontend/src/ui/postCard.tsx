'use client';

import { Icon } from '@iconify-icon/react';
import { Avatar, Divider } from '@nextui-org/react';
import PostActions from '@/ui/postActions';
import Link from 'next/link';
import { PostCardProps } from '@/types';

export default function PostCard({ frase, onLike }: PostCardProps) {
  const usuario = {
    name: frase.usuarioId?.name || 'Bitacora UP',
    username: frase.usuarioId?.username || 'bitacoraup',
    avatar: frase.usuarioId?.avatar || 'https://i.ibb.co/ZNyjQ2g/favicon.jpg',
  };

  return (
    <>
      <div className="flex items-start space-x-4 p-4">
        {/* Avatar del usuario */}
        <Avatar
          size="md"
          className="shadow-lg"
          name={usuario.avatar}
          src={usuario.avatar}
        />

        {/* Contenido del post */}
        <div className="flex-1">
          <div className="flex items-center">
            <p className="font-medium text-gray-900">{usuario.name}</p>
            <Icon
              icon="bitcoin-icons:verify-filled"
              width="16"
              className="text-blue-400 align-middle"
            />
          </div>
          <p className="text-sm text-gray-500">@{usuario.username}</p>
          <div className="p-4 mt-4 rounded-md border">
            <Link href={`/post/${frase._id}`}>
              <p className="text-gray-900">{frase.frase}</p>
              <p className="mt-6 text-gray-500">- {frase.autor}</p>
            </Link>
          </div>
          {/* Botones de interacción */}
          <PostActions
            likes={frase.likes}
            comments={frase.comentarios?.length || 0}
            views={frase.visualizaciones}
            id={frase._id}
            onLike={onLike}
          />
        </div>
      </div>
      <Divider />
    </>
  );
}
