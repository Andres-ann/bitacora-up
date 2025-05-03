'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icon } from '@iconify-icon/react';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? 'text-foreground' : 'text-neutral-400';

  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:w-1/3 bg-background shadow-lg flex mx-auto justify-around items-center  border-gray-300 md:border-b md:border-l md:border-r md:rounded-b-3xl h-16">
      {/* Home */}
      <Link href="/">
        <button className={`${isActive('/')} hover:text-foreground`}>
          <Icon icon="fluent:home-32-filled" width="24" />
        </button>
      </Link>

      {/* Search */}
      <Link href="/search">
        <button className={`${isActive('/search')} hover:text-foreground`}>
          <Icon icon="iconamoon:search-bold" width="24" />
        </button>
      </Link>

      {/* Add */}
      <Link href="/add">
        <button className="bg-neutral-200 dark:bg-neutral-700 text-gray-500 hover:text-foreground pl-3 pr-3 pt-2 rounded-xl">
          <Icon icon="mynaui:plus-solid" width="24" />
        </button>
      </Link>

      {/* Random */}
      <Link href="/random">
        <button className={`${isActive('/random')} hover:text-foreground`}>
          <Icon icon="gg:pill" width="24" />
        </button>
      </Link>

      {/* Profile */}
      <Link href="/profile">
        <button className={`${isActive('/profile')} hover:text-foreground`}>
          <Icon icon="iconamoon:profile-bold" width="24" />
        </button>
      </Link>
    </nav>
  );
}
