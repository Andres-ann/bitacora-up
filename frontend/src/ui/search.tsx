'use client';

import { useState } from 'react';
import { Input } from '@nextui-org/react';
import { Icon } from '@iconify-icon/react';

export default function Search({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      onSearch(e.target.value);
    }, 500);
    setTimeoutId(newTimeoutId);
  };

  return (
    <div className="p-4 flex items-center w-full">
      <Input
        value={query}
        onChange={handleChange}
        classNames={{
          base: 'max-w-full h-10',
          mainWrapper: 'h-full',
          input: 'text-small',
          inputWrapper:
            'h-full font-normal bg-default-100 hover:bg-default-200',
        }}
        placeholder="Buscar..."
        size="sm"
        startContent={
          <div className="text-gray-500 pointer-events-none flex items-center p-2">
            <Icon icon="iconamoon:search-bold" width="16" />
          </div>
        }
        type="text"
      />
    </div>
  );
}
