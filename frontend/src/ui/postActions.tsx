'use client';

import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import Link from 'next/link';
import { useState } from 'react';

interface TweetActionsProps {
  likes: number;
  comments: number;
  views: number;
  id: string;
  onLike: (id: string) => void;
}

export default function PostActions({
  likes = 0,
  comments = 0,
  views = 0,
  id,
  onLike,
}: TweetActionsProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(true);
    onLike(id);
  };

  const handleShare = async () => {
    const postUrl = `${window.location.origin}/post/${id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Compartir post',
          text: '¡Mira este nuevo post!',
          url: postUrl,
        });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error al compartir:', error);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(postUrl);
      } catch (error) {
        console.error('Error al copiar al portapapeles:', error);
      }
    }
  };

  return (
    <div className="text-tiny flex items-center space-x-5 mt-2 mb-4 text-neutral-500">
      <button onClick={handleLike} className="flex items-center space-x-1">
        <Icon
          icon={isLiked ? 'mdi:heart' : 'iconoir:heart'}
          width="16"
          className={`${isLiked ? 'text-red-600' : ''}`}
        />
        <span>{likes}</span>
      </button>
      <Link href={`/post/${id}`} className="flex items-center space-x-1">
        <Icon
          icon="lineicons:comment-1"
          width="16"
          style={{ transform: 'scaleX(-1)' }}
        />
        <span>{comments}</span>
      </Link>
      <button className="flex items-center space-x-1 pointer-events-none">
        <Icon icon="ant-design:bar-chart-outlined" width="16" />
        <span>{views}</span>
      </button>
      <button onClick={handleShare} className="flex items-center">
        <Icon icon="lsicon:send-outline" width="16" />
      </button>
    </div>
  );
}
