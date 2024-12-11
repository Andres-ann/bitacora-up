'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify-icon/react';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? 'text-black' : 'text-gray-600';

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center h-16">
      {/* Home */}
      <Link href="/">
        <button className={`${isActive('/')} hover:text-black`}>
          <Icon icon="fluent:home-32-filled" width="24" />
        </button>
      </Link>

      {/* Random */}
      <Link href="/random">
        <button className={`${isActive('/random')} hover:text-black`}>
          <Icon icon="gg:pill" width="24" />
        </button>
      </Link>

      {/* Add */}
      <Link href="/add">
        <button className="bg-gray-200 text-gray-500 hover:text-black pl-3 pr-3 pt-2 rounded-xl">
          <Icon icon="mynaui:plus-solid" width="24" />
        </button>
      </Link>

      {/* Search */}
      <Link href="/search">
        <button className={`${isActive('/search')} hover:text-black`}>
          <Icon icon="iconamoon:search-bold" width="24" />
        </button>
      </Link>

      {/* Profile */}
      <Link href="/profile">
        <button className={`${isActive('/profile')} hover:text-black`}>
          <Icon icon="iconamoon:profile-bold" width="24" />
        </button>
      </Link>
    </nav>
  );
}
