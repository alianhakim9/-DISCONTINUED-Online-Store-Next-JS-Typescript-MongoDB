"use client";

import { sidebarMenus } from "@/utils/menus";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

import SignOutDialog from "../shared/SignOutDialog";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div>
      <div className="self-start sticky top-0 col-span-1 bg-lime-950 h-[100vh]">
        <div className="flex flex-col gap-2 text-gray-400 p-10 items-start">
          <h1 className="font-bold text-3xl text-white">OLSHOP ADMIN</h1>
          {sidebarMenus.map((item, index) => (
            <Button
              variant={pathname === item.url ? "secondary" : "ghost"}
              className="mb-2"
              onClick={() => router.push(item.url)}
              key={index}
            >
              {item.title}
            </Button>
          ))}
          <SignOutDialog callbackUrl="/auth/login" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
