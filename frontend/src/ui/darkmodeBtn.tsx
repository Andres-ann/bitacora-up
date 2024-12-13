'use client';

import { Icon } from '@iconify-icon/react';
export default function DarkModeBtn() {
  return (
    <div className="w-full h-16 flex items-center justify-end">
      <button className="mr-4">
        <Icon icon="solar:moon-stars-bold" width="28" />
      </button>
    </div>
  );
}
