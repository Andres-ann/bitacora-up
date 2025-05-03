'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/components/ThemeProvider';
import EditarAvatar from '@/components/EditarAvatar';

import Header from '@/ui/header';
import Navbar from '@/ui/navbar';

import { Icon } from '@iconify-icon/react';
import { Divider, Input } from '@nextui-org/react';

export default function Profile() {
  const { user, logout, isLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    const res = await logout();
    router.push('/login');
  };

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col w-full h-screen overflow-hidden flex-1 overflow-y-auto scrollbar-hide pb-16">
        <div className="flex items-center justify-between">
          <Header title="Editar perfil" />
          <button onClick={handleLogout}>
            <Icon icon="mingcute:power-fill" width="20" className="me-6" />
          </button>
        </div>
        <Divider />
        {/* Avatar del usuario */}
        <div className="flex flex-col items-center">
          <EditarAvatar />
        </div>
        <Divider />

        <div className="p-4">
          <span className="text-xs text-gray-600">Mis datos</span>
        </div>
        <Divider />
        <div className="p-4">
          {/* Nombre de usuario */}
          <Input
            type="text"
            label="Nombre de usuario"
            name="username"
            value={user.username}
            className="w-full mb-4"
            variant="bordered"
            disabled
          />

          {/* Nombre y apellido */}
          <Input
            type="text"
            label="Nombre y Apellido"
            name="name"
            value={user.name}
            className="w-full"
            variant="bordered"
            disabled
          />
        </div>

        <Divider />

        <div className="p-4">
          <span className="text-xs text-gray-600">Modo oscuro</span>
        </div>
        <Divider />
        {/* Opción de cambio de tema */}
        <div className="flex items-center justify-center space-x-10 text-xs m-3">
          {/* Light Theme */}
          <label className="flex flex-col items-center space-y-2 cursor-pointer">
            <Image
              src="/light-mode.png"
              alt="Light Theme"
              width={120}
              height={120}
              className="rounded-xl"
            />
            <p>Claro</p>
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
            <Image
              src="/dark-mode.png"
              alt="Dark Theme"
              width={120}
              height={120}
              className="rounded-xl"
            />
            <p>Oscuro</p>
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === 'dark'}
              onChange={() => toggleTheme('dark')}
            />
          </label>
        </div>
      </div>
      <Navbar />
    </>
  );
}
