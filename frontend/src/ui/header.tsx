'use client';

import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import Link from 'next/link';

interface NavbarProps {
  title: string;
}

export default function Navbar({ title }: NavbarProps) {
  return (
    <div className="w-full h-16 flex items-center space-x-4 px-4">
      <button className="flex-shrink-0">
        <Link href="/">
          <Icon icon="solar:arrow-left-linear" width="26" />
        </Link>
      </button>
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
}
