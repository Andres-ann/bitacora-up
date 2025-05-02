'use client';

import { Avatar, Input, Image, Button } from '@nextui-org/react';
import { Icon } from '@iconify-icon/react';
import { useState } from 'react';
import GifPicker from '@/components/GifPicker';
import { useAuth } from '@/context/AuthContext';

interface AddCommentProps {
  onSubmit: (content: string, gifUrl?: string) => Promise<void>;
  placeholder?: string;
  onFocus?: () => void;
}

export default function AddComment({
  onSubmit,
  placeholder = 'Responder...',
  onFocus,
}: AddCommentProps) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState('');
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [isGifPickerOpen, setIsGifPickerOpen] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() && !gifUrl) return;

    try {
      setIsSubmitting(true);
      await onSubmit(content, gifUrl || undefined);
      resetForm();
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGifSelect = (url: string) => {
    setGifUrl(url);
    setIsGifPickerOpen(false);
  };

  const removeGif = () => setGifUrl(null);

  const resetForm = () => {
    setContent('');
    setGifUrl(null);
  };

  return (
    <div className="fixed left-0 right-0 lg:w-1/3 mx-auto ps-3 pe-3 bottom-0 bg-white dark:bg-[#171717] sm:border-s-1 sm:border-e-1">
      <div className="flex flex-col rounded-lg shadow-md px-2 py-3">
        <div className="flex items-center w-full">
          <Avatar
            size="sm"
            className="shadow-lg mr-2"
            src={user?.avatar || 'https://i.ibb.co/ZNyjQ2g/favicon.jpg'}
          />

          <div className="flex-1">
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={onFocus}
              classNames={{
                base: 'w-full',
                input: 'text-small',
                inputWrapper:
                  'h-full font-normal bg-default-100 hover:bg-default-200',
              }}
              placeholder={placeholder}
              size="sm"
              isDisabled={isSubmitting}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          <div className="flex space-x-1 ml-2 mt-1">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || (!content.trim() && !gifUrl)}
              className="focus:outline-none">
              <Icon
                icon="fluent:send-20-regular"
                width={24}
                className={`${isSubmitting ? 'text-default-300' : 'text-default-400 hover:text-default-500'} cursor-pointer`}
              />
            </button>

            <button
              className="focus:outline-none"
              onClick={() => setIsGifPickerOpen(true)}>
              <Icon
                icon={
                  gifUrl
                    ? 'solar:sticker-smile-square-bold'
                    : 'solar:sticker-smile-square-linear'
                }
                width={20}
                className={`${gifUrl ? 'text-gray-500' : 'text-default-400 hover:text-default-500'} cursor-pointer`}
              />
            </button>
          </div>
        </div>

        {gifUrl && (
          <div className="relative mt-2 ml-10 w-[96px] h-[96px]">
            <Image
              src={gifUrl}
              alt="GIF seleccionado"
              className="w-full h-full object-cover rounded-md"
              removeWrapper
            />
            <Button
              isIconOnly
              size="sm"
              className="absolute -top-2 -right-10 bg-black/70 rounded-full p-1"
              onPress={removeGif}>
              <Icon icon="mdi:close" width={16} className="text-white" />
            </Button>
          </div>
        )}
      </div>

      <GifPicker
        isOpen={isGifPickerOpen}
        onClose={() => setIsGifPickerOpen(false)}
        onSelect={handleGifSelect}
      />
    </div>
  );
}
