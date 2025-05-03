'use client';

import { Avatar } from '@nextui-org/avatar';
import { Spinner } from '@nextui-org/spinner';
import { AvatarImgProps } from '@/types/layout';

export default function AvatarImg({ src, isLoading = false }: AvatarImgProps) {
  return (
    <div className="relative w-12 h-12">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner size="sm" color="primary" />
        </div>
      ) : (
        <Avatar size="lg" src={src} className="shadow-lg" isBordered />
      )}
    </div>
  );
}
