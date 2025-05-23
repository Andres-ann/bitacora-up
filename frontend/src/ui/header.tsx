'use client';

import Link from 'next/link';
import { NavbarProps } from '@/types/layout';
import { Icon } from '@iconify-icon/react/dist/iconify.mjs';

export default function Navbar({ title }: NavbarProps) {
  return (
    <div className="w-full mt-4 ms-2 mb-4 flex items-center space-x-4 px-4">
      <button className="flex-shrink-0">
        <Link href="/">
          <Icon icon="solar:arrow-left-linear" width="26" />
        </Link>
      </button>
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
}
