'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Avatar } from '@nextui-org/react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@nextui-org/react';

export default function UserAdd() {
  const { user } = useAuth();

  const [isButtonLoading, setIsButtonLoading] = useState(false);

  return (
    <div className="flex items-center justify-between m-4">
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
          <Button
            className="w-full bg-black text-white dark:bg-white dark:text-black rounded-lg"
            as={Link}
            href="/login"
            size="sm"
            color="primary"
            isLoading={isButtonLoading}>
            Iniciar sesión
          </Button>
        </div>
      )}
    </div>
  );
}
