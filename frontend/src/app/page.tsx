import Avatar from '@/ui/avatar';
import DarkModeBtn from '@/ui/darkmodeBtn';
import PostCard from '@/ui/postCard';
import UserAdd from '@/ui/userAdd';
import { Divider } from '@nextui-org/react';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <DarkModeBtn />
      <Avatar />
      <UserAdd />
      <Divider />
      <PostCard />
      <Divider />
    </div>
  );
}
