import Avatar from '@/ui/avatar';
import DarkModeBtn from '@/ui/darkmodeBtn';
import LoadMorePostBtn from '@/ui/loadMorePostBtn';
import PostCard from '@/ui/postCard';
import UserAdd from '@/ui/userAdd';
import { Divider } from '@nextui-org/react';

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <DarkModeBtn />
      <Avatar />
      <UserAdd />
      <Divider />
      <div className="pb-16 flex-1 overflow-y-auto scrollbar-hide">
        <PostCard />
        <LoadMorePostBtn />
      </div>
    </div>
  );
}
