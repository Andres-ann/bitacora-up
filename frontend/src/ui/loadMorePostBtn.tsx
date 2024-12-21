'use client';

import { Icon } from '@iconify-icon/react/dist/iconify.mjs';

export default function LoadMorePostBtn() {
  return (
    <>
      <div className="w-full h-12 flex items-center justify-center text-neutral-400">
        <button className="flex items-center space-x-1">
          <Icon icon="simple-line-icons:reload" width="32" />
        </button>
      </div>
    </>
  );
}
