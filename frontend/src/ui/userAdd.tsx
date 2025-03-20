'use client';

import { Avatar } from '@nextui-org/react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // Importar el contexto de autenticación
import { Button } from '@nextui-org/react';

export default function UserAdd() {
  const { user, isLoading } = useAuth(); // Obtener el estado del usuario desde el contexto

  if (isLoading) {
    return <p>Cargando...</p>; // Mostrar un indicador de carga mientras se verifica el estado de autenticación
  }

  return (
    <div className="flex items-center justify-between p-4">
      {user ? (
        // Si el usuario está logueado, mostrar sus datos
        <Link href="/add">
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            <Avatar size="md" src={user.avatar} name={user.name} />

            {/* Información del usuario */}
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">¿Qué novedades hay?</p>
            </div>
          </div>
        </Link>
      ) : (
        // Si el usuario no está logueado, mostrar un botón para iniciar sesión
        <div className="flex justify-end w-full">
          <Link href="/login">
            <Button
              className="w-full bg-black text-white dark:bg-white dark:text-black rounded-lg"
              size="sm"
              color="primary"
              type="submit"
              isLoading={isLoading}>
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
