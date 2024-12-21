'use client';

import { Icon } from '@iconify-icon/react/dist/iconify.mjs';

interface LoadMorePostBtnProps {
  onClick: () => void;
  isLoading: boolean;
}

export default function LoadMorePostBtn({
  onClick,
  isLoading,
}: LoadMorePostBtnProps) {
  return (
    <div className="w-full h-12 flex items-center justify-center text-neutral-400">
      <button
        className="flex items-center space-x-1"
        onClick={onClick}
        disabled={isLoading}>
        <Icon
          icon="simple-line-icons:reload"
          width="32"
          className={isLoading ? 'animate-spin' : ''}
        />
      </button>
    </div>
  );
}
