'use client';

import Header from '@/ui/header';
import Avatar from '@/ui/avatar';
import Navbar from '@/ui/navbar';
import Link from 'next/link';
import { Divider, Input } from '@nextui-org/react';
import { Icon } from '@iconify-icon/react';
import { useTheme } from '@/components/ThemeProvider';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
    });
    router.push('/login');
  };

  return (
    <>
      <div className="flex flex-col w-full h-screen overflow-hidden flex-1 overflow-y-auto scrollbar-hide pb-16">
        <span className="text-xs text-end text-gray-600 p-2">v2.0.0</span>

        <div className="flex items-center justify-between">
          <Header title="Editar perfil" />
          <button onClick={handleLogout}>
            <Icon icon="mingcute:power-fill" width="20" className="p-4" />
          </button>
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
              disabled
            />

            <Input
              type="text"
              label="Nombre y Apellido"
              name="name"
              value="nombre y apellido"
              className="w-full"
              variant="bordered"
              disabled
            />
          </Link>
        </div>

        <div className="p-4 pt-0">
          <span className="text-xs text-gray-600">Modo oscuro</span>
        </div>
        <Divider />

        {/* Opción de cambio de tema */}
        <div className="flex items-center justify-center space-x-10">
          {/* Light Theme */}
          <label className="flex flex-col items-center space-y-2 cursor-pointer">
            <Icon icon="iconoir:web-window" width="120" />
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === 'light'}
              onChange={() => toggleTheme('light')}
            />
          </label>

          {/* Dark Theme */}
          <label className="flex flex-col items-center space-y-2 cursor-pointer">
            <Icon icon="iconoir:web-window-solid" width="120" />
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === 'dark'}
              onChange={() => toggleTheme('dark')}
            />
          </label>
        </div>

        <div className="p-4">
          <span className="text-xs text-gray-600">Seguridad</span>
        </div>
        <Divider />

        <div className="text-sm font-semibold flex items-center p-4 space-x-4">
          <Icon icon="mdi:secure-outline" width="20" />
          <a className="hover:underline">Cambiar contraseña</a>
        </div>
      </div>
      <Navbar />
    </>
  );
}
