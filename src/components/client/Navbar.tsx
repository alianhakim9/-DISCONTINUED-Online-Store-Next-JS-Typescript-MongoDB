"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { guestNavbarMenus, isLoginNavbarMenus } from "@/utils/menus";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiCart } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "@/types";

const Navbar = () => {
  const isLoggedIn = false;
  const router = useRouter();

  const loading = (state: RootState) => state.loading;
  const cartItems = (state: RootState) => state.cartItems;

  const isLoading = useSelector(loading);
  const cart = useSelector(cartItems);

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
              {isLoading ? "0" : cart?.reduce((a, c) => a + 1, 0)}
            </Badge>
          </Button>
          {/* render if is logged in true */}
          {isLoggedIn &&
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
          {isLoggedIn && (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
          {/* render if is logged in false */}
          {!isLoggedIn &&
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
