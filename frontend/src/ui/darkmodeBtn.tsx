'use client';

import { Icon } from '@iconify-icon/react';
export default function DarkModeBtn() {
  return (
    <>
      <div className="w-full h-16 flex justify-end items-center px-4">
        <button>
          <Icon icon="solar:moon-stars-bold" width="28" />
        </button>
      </div>
    </>
  );
}
