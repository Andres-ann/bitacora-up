'use client';

import { Icon } from '@iconify-icon/react';
import { Avatar } from '@nextui-org/react';
import TweetActions from './tweetActions';

export default function TweetCard() {
  return (
    <div className="p-4">
      <div className="flex items-start space-x-4">
        {/* Avatar  */}
        <Avatar size="md" name="App" />

        {/* Información del usuario y tweet */}
        <div className="flex-1">
          <div className="flex items-center">
            <p className="text-sm font-semibold text-gray-900">
              Maria Laura Leone
            </p>
            <Icon
              icon="bitcoin-icons:verify-filled"
              width="16"
              className="text-blue-400 align-middle"
            />
          </div>
          <p className="text-xs text-gray-500">@nombredeusuario</p>
          <div className="p-4 mt-4 rounded-md border">
            <p className="text-sm text-gray-900">
              (Intendente) De que color es esta? (Noe) Negra (Intendente) A mi
              me gustan más las negras…
            </p>
            <p className="text-sm mt-6 text-gray-500">- Intendente</p>
          </div>
          {/* Botones de like, comentar y compartir */}
          <TweetActions />
        </div>
      </div>
    </div>
  );
}
