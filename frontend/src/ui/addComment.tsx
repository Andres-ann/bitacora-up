'use client';

import { Avatar, Input } from '@nextui-org/react';
import { Icon } from '@iconify-icon/react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AddCommentProps {
  onSubmit: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function AddComment({
  onSubmit,
  placeholder = 'Responder...',
  className = '',
}: AddCommentProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scroll hacia abajo
        setVisible(false);
      } else {
        // Scroll hacia arriba
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!user && !isLoading) {
      router.push('/login');
      return;
    }

    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      onSubmit(target.value);
      target.value = '';
    }
  };

  const handleInputClick = () => {
    if (!user && !isLoading) {
      router.push('/login');
    }
  };

  return (
    <div
      className={`fixed left-0 right-0 lg:w-1/3 mx-auto bottom-0 p-4 bg-white dark:bg-[#171717] md:border-r md:border-l transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      } ${className}`}>
      <div className="flex items-center rounded-lg shadow-md px-2 py-3">
        <Avatar
          size="sm"
          className="shadow-lg mr-2"
          name={user?.avatar}
          src={user?.avatar || 'https://i.ibb.co/ZNyjQ2g/favicon.jpg'}
        />

        <Input
          classNames={{
            base: 'flex-1 w-full',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper:
              'h-full font-normal bg-default-100 hover:bg-default-200',
          }}
          placeholder={placeholder}
          size="sm"
          onKeyPress={handleKeyPress}
          onClick={handleInputClick}
          isDisabled={isLoading}
        />

        <div className="flex space-x-1">
          <button className="focus:outline-none ms-2">
            <Icon
              icon="carbon:send"
              width={24}
              className="text-default-400 hover:text-default-500 cursor-pointer"
            />
          </button>
          <button className="focus:outline-none">
            <Icon
              icon="material-symbols:gif-box"
              width={24}
              className="text-default-400 hover:text-default-500 cursor-pointer"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
