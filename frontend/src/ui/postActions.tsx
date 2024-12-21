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
      <Link href="/post" className="flex items-center space-x-1">
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
      <button className="flex items-center">
        <Icon icon="lsicon:send-outline" width="16" />
      </button>
    </div>
  );
}
