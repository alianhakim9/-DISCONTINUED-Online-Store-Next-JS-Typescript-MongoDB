import { BiCart } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";

export const sidebarMenus = [
  {
    title: "Product",
    url: "/dashboard/products",
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
  },
  {
    title: "Users",
    url: "/dashboard/users",
  },
];

export const guestNavbarMenus = [
  {
    title: "Login",
    url: "/login",
    variant: true,
  },
  {
    title: "Sign Up",
    url: "/sign-up",
    variant: false,
  },
];

export const isLoginNavbarMenus = [
  {
    title: "Notification",
    url: "/notifications",
    icon: IoNotificationsOutline,
  },
  {
    title: "cart",
    url: "/cart",
    icon: BiCart,
  },
];
