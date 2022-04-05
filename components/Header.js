import Image from "next/image";

import HeaderIcon from "./HeaderIcon";
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
function Header() {
  const { data: session } = useSession();

  return (
    <div className="shadow-md p-2 top-0 z-50 bg-white flex items-center lg:px-5">
      <div className="flex items-center">
        <Image
          src={"https://links.papareact.com/5me"}
          height={40}
          width={40}
          layout="fixed"
          className=" "
        />
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className="hidden lg:inline-flex  ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink"
            type={"text"}
            placeholder="Search Facebook"
          />
        </div>
      </div>
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>
      <div className="flex items-center sm:space-x-2 ">
        <Image
          onClick={signOut}
          className="rounded-full cursor-pointer"
          src={session?.user?.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <p className="font-semibold  whitespace-nowrap">{session.user.name}</p>
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
    </div>
  );
}
export default Header;
