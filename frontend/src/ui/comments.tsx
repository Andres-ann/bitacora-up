'use client';

import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import { Divider } from '@nextui-org/divider';
import { Avatar } from '@nextui-org/react';

interface CommentsProps {
  comentarios: Array<{
    _id: string;
    comentario: string;
    gif?: string;
    usuarioId: {
      name?: string;
      username?: string;
      avatar?: string;
    };
    createdAt: string;
  }>;
}

export default function Comments({ comentarios }: CommentsProps) {
  const usuarioDefault = {
    name: 'Bitacora UP',
    username: 'bitacoraup',
    avatar: 'https://i.ibb.co/ZNyjQ2g/favicon.jpg',
  };

  if (!comentarios?.length) {
    return (
      <>
        <div className="w-full p-4 font-medium text-gray-900">
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
      <div className="w-full p-4 font-medium text-gray-900">
        <p>Respuestas</p>
      </div>
      <Divider />
      {comentarios.map((comentario) => {
        const usuario = { ...usuarioDefault, ...comentario.usuarioId }; // Combinar usuario con valores predeterminados

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
                  <p className="font-medium text-gray-900">{usuario.name}</p>
                  <Icon
                    icon="bitcoin-icons:verify-filled"
                    width="16"
                    className="text-blue-400 align-middle"
                  />
                </div>
                <p className="text-sm text-gray-500">@{usuario.username}</p>
                <div className="mt-2">
                  <p className="text-gray-900">{comentario.comentario}</p>
                  {comentario.gif && (
                    <img
                      src={comentario.gif}
                      alt="GIF"
                      className="mt-2 rounded-lg shadow-md"
                    />
                  )}
                </div>
              </div>
            </div>
            <Divider />
          </div>
        );
      })}
    </>
  );
}
