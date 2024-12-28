import Header from '@/ui/header';
import Navbar from '@/ui/navbar';
import { Divider } from '@nextui-org/react';

export default function Search() {
  return (
    <>
      <div className="flex flex-col w-full h-screen overflow-hidden flex-1 overflow-y-auto scrollbar-hide">
        <Header title="Buscar" />
        <Divider />
        <Navbar />
      </div>
    </>
  );
}
