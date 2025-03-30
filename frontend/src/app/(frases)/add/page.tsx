'use client';

import Header from '@/ui/header';
import { useAuth } from '@/context/AuthContext';
import { Divider, Input, Button, Textarea } from '@nextui-org/react';
import { Avatar } from '@nextui-org/react';
import { Icon } from '@iconify-icon/react';
import { useState } from 'react';
import GifPicker from '@/components/GifPicker';

export default function Add() {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [isGifPickerOpen, setIsGifPickerOpen] = useState(false);

  const handleGifSelect = (url: string) => {
    setGifUrl(url);
    setIsGifPickerOpen(false);
  };

  const removeGif = () => setGifUrl(null);

  const handleSubmit = async () => {
    console.log('Publicando:', { content, gifUrl });
    setContent('');
    setGifUrl(null);
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <Header title="Nuevo post" />
      <Divider />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Avatar size="md" src={user?.avatar} isBordered />
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-gray-500">@{user?.username}</p>
            </div>
          </div>
        </div>

        <div className="ms-14 ps-4 pe-8 relative">
          <Textarea
            placeholder="¿Qué dijeron?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            classNames={{
              input: 'text-xs pb-8',
              base: 'relative',
            }}
            fullWidth
            minRows={5}
          />
          <div className="absolute bottom-3 right-12 z-10">
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
          <div className="relative mt-4 ml-16 ps-4 w-[200px] h-[200px]">
            <img
              src={gifUrl}
              alt="GIF seleccionado"
              className="w-full h-full object-cover rounded-md"
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

        <div className="ms-14 mb-4 ps-4 pe-8 mt-4">
          <Input
            placeholder="¿Quién lo dijo?"
            classNames={{
              input: 'text-xs',
            }}
            fullWidth
          />
        </div>
      </div>

      <div className="fixed left-0 right-0 lg:w-1/3 mx-auto bottom-0 bg-white dark:bg-[#171717] sm:border-s-1 sm:border-e-1">
        <div className="flex justify-end">
          <Button
            radius="full"
            onPress={handleSubmit}
            isDisabled={!content.trim() && !gifUrl}
            className="text-sm bg-black text-white dark:bg-white dark:text-black ps-8 pe-8 mb-4 me-4">
            Publicar
          </Button>
        </div>
      </div>

      <GifPicker
        isOpen={isGifPickerOpen}
        onClose={() => setIsGifPickerOpen(false)}
        onSelect={handleGifSelect}
      />
    </div>
  );
}
