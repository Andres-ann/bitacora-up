'use client';

import Link from 'next/link';
import { Icon } from '@iconify-icon/react';
import { Avatar, Divider } from '@nextui-org/react';
import { PostCardProps } from '@/types/posts';

import PostActions from '@/ui/postActions';

export default function PostCard({ frase, onLike }: PostCardProps) {
  const baseUser = {
    name: frase.usuarioId?.name || 'Bitacora UP',
    username: frase.usuarioId?.username || 'bitacoraup',
    avatar: frase.usuarioId?.avatar || 'https://i.ibb.co/ZNyjQ2g/favicon.jpg',
  };

  return (
    <>
      <div className="flex items-start space-x-4 p-4">
        <Avatar
          size="md"
          className="shadow-lg"
          name={frase.usuarioId?.avatar}
          src={baseUser.avatar}
        />

        <div className="flex-1">
          <div className="flex items-center">
            <p className="font-medium ">{baseUser.name}</p>
            <Icon
              icon="bitcoin-icons:verify-filled"
              width="16"
              className="text-blue-400 align-middle"
            />
          </div>
          <p className="text-sm text-gray-500">@{baseUser.username}</p>
          <div className="p-4 pt-2 mt-2 rounded-md border border-gray-300/70">
            <Link href={`/post/${frase._id}`}>
              <p>{frase.frase}</p>
              {frase.gif && (
                <img
                  src={frase.gif}
                  alt="GIF"
                  className="mt-2 rounded-lg shadow-md"
                />
              )}
              <p className="mt-4 text-sm text-gray-500">- {frase.autor}</p>
            </Link>
          </div>

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
