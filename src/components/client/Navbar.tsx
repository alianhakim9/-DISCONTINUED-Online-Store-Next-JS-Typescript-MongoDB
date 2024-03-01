"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState } from "@/types";
import { guestNavbarMenus, isLoginNavbarMenus } from "@/utils/menus";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiCart } from "react-icons/bi";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SignOutDialog from "../shared/SignOutDialog";
import { onSignOut } from "@/utils/helper";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { loading, cartItems } = useSelector((state: RootState) => state.cart);

  return (
    <div className="bg-white border border-gray-100 p-5 top-0 z-50 fixed w-full ">
      <div className="container flex justify-between items-center gap-5 ">
        <Link href="/">
          <h4 className="font-bold text-black text-3xl">OLSHOP</h4>
        </Link>
        <Input placeholder="Search product..." />
        <div className="flex items-center gap-2 justify-end">
          <Button
            variant="ghost"
            size="default"
            className="rounded-full flex gap-2"
            onClick={() => router.push("/cart")}
          >
            <BiCart size={28} />
            <Badge variant="default">
              {loading ? 0 : cartItems?.reduce((a, c) => a + 1, 0)}
            </Badge>
          </Button>
          {/* render if is logged in true */}
          {session &&
            isLoginNavbarMenus.map((menu, index) => (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                key={index}
                onClick={() => router.push(menu.url)}
              >
                {<menu.icon size={24} />}
              </Button>
            ))}
          {session && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Button variant="link">Account</Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button variant="link">My Order</Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button variant="link" onClick={() => onSignOut()}>
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {/* render if is logged in false */}
          {!session &&
            guestNavbarMenus.map((menu, index) => (
              <div
                key={index}
                className="flex items-center justify-end w-min-[200px]"
              >
                <Button
                  variant={menu.variant ? "default" : "outline"}
                  size="sm"
                  onClick={() => router.push(menu.url)}
                  className="rounded-lg"
                >
                  {menu.title}
                </Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
