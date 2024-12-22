'use client';

import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import { Divider } from '@nextui-org/divider';
import { Avatar } from '@nextui-org/react';

export default function Respuestas() {
  return (
    <>
      <div className="w-full p-4 text-sm font-medium text-gray-900">
        <p>Respuestas</p>
      </div>
      <Divider />
      <div className="flex items-start space-x-4 p-4">
        {/* Avatar del usuario */}
        <Avatar
          size="md"
          className="shadow-lg"
          name="App"
          //src={usuario.avatar}
        />

        {/* Contenido del post */}
        <div className="flex-1">
          <div className="flex items-center">
            <p className="text-sm font-medium text-gray-900">
              Nombre de usuario
            </p>
            <Icon
              icon="bitcoin-icons:verify-filled"
              width="16"
              className="text-blue-400 align-middle"
            />
          </div>
          <p className="text-xs text-gray-500">@Username</p>
          <div className="mt-2 text-sm font-light ">
            <p className="text-gray-900">respuesta</p>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
}
