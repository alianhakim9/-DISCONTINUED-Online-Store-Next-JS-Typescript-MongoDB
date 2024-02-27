"use client";

import { onSignOut } from "@/utils/helper";
import { sidebarMenus } from "@/utils/menus";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div>
      <div className="self-start sticky top-0 col-span-1 bg-black h-[100vh]">
        <div className="flex flex-col gap-2 text-gray-400 p-10 items-start">
          <h1 className="font-bold text-3xl text-yellow-400">OLSHOP ADMIN</h1>
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
          <Dialog>
            <DialogTrigger>
              <Button type="button">Logout</Button>
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
                <Button variant="destructive" onClick={() => onSignOut()}>
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
