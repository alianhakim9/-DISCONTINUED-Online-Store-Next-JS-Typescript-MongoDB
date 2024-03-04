"use client";

import { sidebarMenus } from "@/utils/menus";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { onSignOut } from "@/utils/helper";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div>
      <div className="self-start sticky top-0 col-span-1 bg-lime-950 h-[100vh]">
        <div className="flex flex-col gap-2 p-10 items-start">
          <h1 className="font-bold text-3xl text-white">OLSHOP ADMIN</h1>
          {sidebarMenus.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className={`${
                item.url === pathname ? "text-white font-bold" : "text-gray-400"
              }`}
            >
              {item.title}
            </Link>
          ))}
          <Dialog>
            <DialogTrigger>
              <p className="text-gray-400">Logout</p>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. You must login again to access
                  this page
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={() => onSignOut("/auth/login")}
                >
                  Logout
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
