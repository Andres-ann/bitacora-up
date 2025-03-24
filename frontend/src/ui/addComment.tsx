'use client';

import { Avatar, Input } from '@nextui-org/react';
import { Icon } from '@iconify-icon/react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

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
      className={`fixed bottom-0 left-0 right-0 mb-16 p-4 flex items-center w-full ${className}`}>
      <Input
        classNames={{
          base: 'max-w-full h-10',
          mainWrapper: 'h-full',
          input: 'text-small',
          inputWrapper:
            'h-full font-normal bg-default-100 hover:bg-default-200',
        }}
        placeholder={placeholder}
        size="sm"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">
              <Avatar
                size="sm"
                className="shadow-lg"
                name={user?.avatar}
                src={user?.avatar || 'https://i.ibb.co/ZNyjQ2g/favicon.jpg'}
              />
            </span>
          </div>
        }
        endContent={
          <button className="focus:outline-none">
            <Icon
              icon="material-symbols:gif-box"
              width={24}
              className="text-default-400 hover:text-default-500 cursor-pointer"
            />
          </button>
        }
        type="text"
        onKeyPress={handleKeyPress}
        onClick={handleInputClick}
        isDisabled={isLoading}
      />
    </div>
  );
}
