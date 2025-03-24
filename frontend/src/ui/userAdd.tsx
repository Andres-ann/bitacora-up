'use client';

import { useState } from 'react';
import { Avatar } from '@nextui-org/react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@nextui-org/react';

export default function UserAdd() {
  const { user } = useAuth();

  // Estado local para manejar la carga del botón
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  return (
    <div className="flex items-center justify-between p-4">
      {user ? (
        <Link href="/add" className="w-full">
          <div className="flex items-center space-x-4">
            <Avatar size="md" src={user.avatar} name={user.name} isBordered />
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">¿Qué novedades hay?</p>
            </div>
          </div>
        </Link>
      ) : (
        <div className="w-full">
          <Link href="/login" className="w-full">
            <Button
              className="w-full bg-black text-white dark:bg-white dark:text-black rounded-lg"
              size="sm"
              color="primary"
              isLoading={isButtonLoading}>
              Iniciar sesión
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
