'use client';

import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import { Avatar } from '@nextui-org/react';
import { Divider } from '@nextui-org/divider';
import { CommentsProps } from '@/types/posts';

export default function Comments({ comentarios }: CommentsProps) {
  const baseuser = {
    name: 'Bitacora UP',
    username: 'bitacoraup',
    avatar: 'https://i.ibb.co/ZNyjQ2g/favicon.jpg',
  };

  if (!comentarios?.length) {
    return (
      <>
        <div className="w-full p-4 font-medium text-gray-500">
          <p>Respuestas</p>
        </div>
        <Divider />
        <div className="p-4 font-light text-center text-gray-500">
          No hay respuestas aún
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-full p-4 font-medium text-gray-500">
        <p>Respuestas</p>
      </div>
      <Divider />
      {comentarios.map((comentario) => {
        const usuario = { ...baseuser, ...comentario.usuarioId };
        return (
          <div key={comentario._id}>
            <div className="flex items-start space-x-4 p-4">
              <Avatar
                size="md"
                className="shadow-lg"
                name={usuario.name}
                src={usuario.avatar}
              />

              <div className="flex-1">
                <div className="flex items-center">
                  <p className="font-medium">{usuario.name}</p>
                  <Icon
                    icon="bitcoin-icons:verify-filled"
                    width="16"
                    className="text-blue-400 align-middle"
                  />
                </div>
                <p className="text-sm text-gray-500">@{usuario.username}</p>
              </div>
            </div>
            <div className="ms-9 mb-4 ps-8 pe-8 border-s-1 border-gray-300/50">
              <p>{comentario.comentario}</p>
              {comentario.gif && (
                <img
                  src={comentario.gif}
                  alt="GIF"
                  className="mt-2 rounded-lg shadow-md"
                />
              )}
            </div>
            <Divider />
          </div>
        );
      })}
    </>
  );
}
