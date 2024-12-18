'use client';

import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import { useState } from 'react';

interface TweetActionsProps {
  likes: number;
  comments: number;
  views: number;
  id: string; // Recibe el ID de la frase
  onLike: (id: string) => void; // Función para manejar el like
}

export default function TweetActions({
  likes = 0,
  comments = 0,
  views = 0,
  id,
  onLike,
}: TweetActionsProps) {
  const [isLiked, setIsLiked] = useState(false); // Estado para manejar si está "likeado"

  const handleLike = () => {
    setIsLiked(true); // Cambiar estado a 'likeado'
    onLike(id); // Llamar a la función para manejar el like
  };

  return (
    <div className="text-tiny flex items-center space-x-4 mt-2 mb-4 text-neutral-500">
      <button onClick={handleLike} className="flex items-center space-x-1">
        <Icon
          icon={isLiked ? 'mdi:heart' : 'iconoir:heart'} // Cambia el icono según el estado
          width="14"
          className={`${isLiked ? 'text-red-600' : ''}`} // Aplica el color rojo solo cuando está likeado
        />
        <span>{likes}</span>
      </button>
      <button className="flex items-center space-x-1">
        <Icon
          icon="lineicons:comment-1"
          width="14"
          style={{ transform: 'scaleX(-1)' }}
        />
        <span>{comments}</span>
      </button>
      <button className="flex items-center space-x-1">
        <Icon icon="ant-design:bar-chart-outlined" width="14" />
        <span>{views}</span>
      </button>
      <button className="flex items-center">
        <Icon icon="lsicon:send-outline" width="14" />
      </button>
    </div>
  );
}
