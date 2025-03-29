'use client';

import { Avatar, Input } from '@nextui-org/react';
import { Icon } from '@iconify-icon/react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AddCommentProps {
  onSubmit: (value: string) => Promise<void>;
  placeholder?: string;
}

export default function AddComment({
  onSubmit,
  placeholder = 'Responder...',
}: AddCommentProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;
    if (!user && !isLoading) {
      router.push('/login');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(inputValue);
      setInputValue('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="fixed left-0 right-0 lg:w-1/3 mx-auto bottom-0 ps-3 pe-3 bg-white dark:bg-[#171717] md:border-r md:border-l transition-transform duration-300">
      <div className="flex items-center rounded-lg shadow-md px-2 py-3">
        <Avatar
          size="sm"
          className="shadow-lg mr-2"
          name={user?.name}
          src={user?.avatar || 'https://i.ibb.co/ZNyjQ2g/favicon.jpg'}
        />

        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
          isDisabled={isLoading || isSubmitting}
        />

        <div className="flex space-x-1">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !inputValue.trim()}
            className="focus:outline-none ms-2">
            <Icon
              icon="carbon:send"
              width={24}
              className={`${isSubmitting ? 'text-default-300' : 'text-default-400 hover:text-default-500'} cursor-pointer`}
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
