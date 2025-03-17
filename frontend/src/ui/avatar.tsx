'use client';

import { Avatar } from '@nextui-org/avatar';

type AvatarImgProps = {
  src: string;
};

export default function AvatarImg({ src }: AvatarImgProps) {
  return (
    <div className="w-full h-12 mt-6 mb-6 flex items-center justify-center">
      <Avatar size="lg" src={src} className="shadow-lg" />
    </div>
  );
}
