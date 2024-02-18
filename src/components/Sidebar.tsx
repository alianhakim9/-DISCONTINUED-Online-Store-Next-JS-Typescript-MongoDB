"use client";

import { sidebarMenus } from "@/utils/menus";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2 text-gray-400 p-10">
      <h1 className="font-bold text-3xl text-lime-400">OLSHOP ADMIN</h1>
      <ul>
        {sidebarMenus.map((item, index) => (
          <li
            key={index}
            className={`${
              pathname === item.url && "text-white font-bold"
            } hover:text-lime-400`}
          >
            <Link href={item.url}>{item.title}</Link>
          </li>
        ))}
        <li className={` hover:text-lime-400`}>
          <button
            type="button"
            onClick={() => {
              signOut();
              router.push("/auth/login");
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
