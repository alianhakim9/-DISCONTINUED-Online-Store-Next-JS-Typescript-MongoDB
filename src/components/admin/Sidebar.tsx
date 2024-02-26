"use client";

import { onSignOut } from "@/utils/helper";
import { sidebarMenus } from "@/utils/menus";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="self-start sticky top-0 col-span-1 bg-black h-[100vh]">
      <div className="flex flex-col gap-2 text-gray-400 p-10">
        <h1 className="font-bold text-3xl text-yellow-400">OLSHOP ADMIN</h1>
        <ul>
          {sidebarMenus.map((item, index) => (
            <li
              key={index}
              className={`${
                pathname === item.url && "text-white font-bold"
              } hover:text-yellow-400`}
            >
              <Link href={item.url}>{item.title}</Link>
            </li>
          ))}
          <li className={` hover:text-yellow-400`}>
            <button type="button" onClick={() => onSignOut()}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
