import Avatar from '@/ui/avatar';
import DarkModeBtn from '@/ui/darkmodeBtn';
import LoadMorePostBtn from '@/ui/loadMorePostBtn';
import PostList from '@/ui/postList';
import UserAdd from '@/ui/userAdd';
import { Divider } from '@nextui-org/react';

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen overflow-hidden flex-1 overflow-y-auto scrollbar-hide">
      <DarkModeBtn />
      <Avatar />
      <UserAdd />
      <Divider />
      <div className="pb-16">
        <PostList />
        <LoadMorePostBtn />
      </div>
    </div>
  );
}
