'use client';

import { Avatar } from '@nextui-org/avatar';

export default function AvatarImg() {
  return (
    <>
      <div className="w-full h-12 mt-6 mb-6 flex items-center justify-center">
        <Avatar
          size="lg"
          name="App"
          src="https://i.ibb.co/ZNyjQ2g/favicon.jpg"
          className="shadow-lg"
        />
      </div>
    </>
  );
}
