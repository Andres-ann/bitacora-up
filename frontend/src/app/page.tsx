import Avatar from '@/ui/avatar';
import DarkModeBtn from '@/ui/darkmodeBtn';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <DarkModeBtn />
      <Avatar />
    </div>
  );
}
