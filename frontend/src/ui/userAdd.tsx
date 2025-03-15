'use client';
import { Avatar } from '@nextui-org/react';
import Link from 'next/link';

export default function UserAdd() {
  return (
    <Link href="/add">
      <div className="flex items-center space-x-4 p-4">
        {/* Avatar */}
        <Avatar size="md" name="App" />

        {/* Información del usuario */}
        <div>
          <p className="font-medium">Nombre Apellido</p>
          <p className="text-sm text-gray-500">¿Qué novedades hay?</p>
        </div>
      </div>
    </Link>
  );
}
