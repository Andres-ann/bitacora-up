'use client';

import Header from '@/ui/header';
import Avatar from '@/ui/avatar';
import Navbar from '@/ui/navbar';
import Link from 'next/link';
import { Divider, Input } from '@nextui-org/react';
import { Icon } from '@iconify-icon/react';

export default function Profile() {
  return (
    <>
      <div className="flex flex-col w-full h-screen overflow-hidden flex-1 overflow-y-auto scrollbar-hide pb-16">
        <span className="text-xs text-end text-gray-600 p-2">v2.0.0</span>

        <div className="flex items-center justify-between">
          <Header title="Editar perfil" />
          <Link href="/">
            <Icon icon="mingcute:power-fill" width="20" className="p-4" />
          </Link>
        </div>
        <Divider />
        <Avatar />
        <div className="text-center text-sm text-sky-500 font-semibold ">
          <a className="hover:underline">Editar avatar</a>
        </div>

        <div className="p-4">
          <Link href="/" className="space-y-6">
            <Input
              type="text"
              label="Nombre de usuario"
              name="username"
              value="usuario"
              className="w-full"
              variant="bordered"
              isRequired
              disabled
            />

            <Input
              type="text"
              label="Nombre y Apellido"
              name="name"
              value="nombre y apeliido"
              className="w-full"
              variant="bordered"
              isRequired
              disabled
            />
          </Link>
        </div>

        <div className="p-4 pt-0">
          <span className="text-xs text-gray-600">Modo oscuro</span>
        </div>
        <Divider />

        <div className="flex items-center justify-center space-x-10">
          {/* Light Theme */}
          <label className="flex flex-col items-center space-y-2 cursor-pointer">
            <Icon icon="iconoir:web-window" width="120" />
            <input type="radio" name="theme" value="light" checked />
          </label>

          {/* Dark Theme */}
          <label className="flex flex-col items-center space-y-2 cursor-pointer">
            <div>
              <Icon icon="iconoir:web-window-solid" width="120" />
            </div>
            <input type="radio" name="theme" value="dark" />
          </label>
        </div>

        <div className="p-4">
          <span className="text-xs text-gray-600 ">Seguridad</span>
        </div>
        <Divider />

        <div className="text-sm font-semibold flex items-center p-4 space-x-4 ">
          <Icon icon="mdi:secure-outline" width="20" />
          <a className="hover:underline">Cambiar contraseña</a>
        </div>
      </div>
      <Navbar />
    </>
  );
}
