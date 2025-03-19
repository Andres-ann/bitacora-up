'use client';

import Header from '@/ui/header';
import AvatarImg from '@/ui/avatar';
import Navbar from '@/ui/navbar';
import Link from 'next/link';
import Image from 'next/image';
import { Divider, Input } from '@nextui-org/react';
import { Icon } from '@iconify-icon/react';
import { useTheme } from '@/components/ThemeProvider';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function Profile() {
  const { user, isLoading, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
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
        <span className="text-xs text-end text-gray-600 p-2">v3.0.0</span>
        <div className="flex items-center justify-between">
          <Header title="Editar perfil" />
          <button onClick={handleLogout}>
            <Icon icon="mingcute:power-fill" width="20" className="p-4" />
          </button>
        </div>
        <Divider />
        {/* Avatar del usuario */}
        <AvatarImg src={user.avatar} />
        {/* Pasar la URL del avatar del usuario */}
        <div className="text-center text-sm text-sky-500 font-semibold ">
          <a className="hover:underline">Editar avatar</a>
        </div>
        <div className="p-4">
          <Link href="/" className="space-y-6">
            {/* Nombre de usuario */}
            <Input
              type="text"
              label="Nombre de usuario"
              name="username"
              value={user.username}
              className="w-full"
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
          </Link>
        </div>
        <div className="p-4 pt-0">
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
