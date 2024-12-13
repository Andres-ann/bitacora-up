'use client';

import { Icon } from '@iconify-icon/react/dist/iconify.mjs';

export default function TweetActions() {
  return (
    <div className="text-tiny flex items-center space-x-4 mt-2 text-neutral-500">
      <button className="flex items-center space-x-1">
        <Icon icon="iconoir:heart" width="14" />
        <span>12</span>
      </button>
      <button className="flex items-center space-x-1">
        <Icon
          icon="lineicons:comment-1"
          width="14"
          style={{ transform: 'scaleX(-1)' }}
        />
        <span>123</span>
      </button>
      <button className="flex items-center space-x-1">
        <Icon icon="ant-design:bar-chart-outlined" width="14" />
        <span>17</span>
      </button>
      <button className="flex items-center">
        <Icon icon="lsicon:send-outline" width="14" />
      </button>
    </div>
  );
}
