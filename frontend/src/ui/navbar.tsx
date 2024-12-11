'use client';

import { Icon } from '@iconify-icon/react';

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center h-16">
      <button className="text-gray-500 hover:text-black">
        <Icon icon="fluent:home-32-filled" width="24" />
      </button>
      <button className="text-gray-500 hover:text-black">
        <Icon icon="gg:pill" width="24" />
      </button>
      <button className="bg-gray-200 text-gray-500 hover:text-black pl-3 pr-3 pt-2 rounded-xl">
        <Icon icon="mynaui:plus-solid" width="24" />
      </button>
      <button className="text-gray-500 hover:text-black">
        <Icon icon="iconamoon:search-bold" width="24" />
      </button>
      <button className="text-gray-500 hover:text-black">
        <Icon icon="iconamoon:profile-bold" width="24" />
      </button>
    </nav>
  );
}
