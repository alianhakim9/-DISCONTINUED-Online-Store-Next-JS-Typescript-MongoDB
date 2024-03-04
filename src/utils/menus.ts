import { BiHeart } from "react-icons/bi";

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
    url: "/sign-in",
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
    title: "favourite",
    url: "/favourite",
    icon: BiHeart,
  },
];

export const footerMenus = {
  items1: [
    {
      title: "About us",
      url: "/",
    },
    {
      title: "Hak Kekayaan Intelektual",
      url: "/",
    },
    {
      title: "Karir",
      url: "/",
    },
    {
      title: "Blog",
      url: "/",
    },
    {
      title: "Bridestory",
      url: "/",
    },
    {
      title: "Mitra Blog",
      url: "/",
    },
    {
      title: "Olshop Affiliate Program",
      url: "/",
    },
    {
      title: "Olshop B2B Digital",
      url: "/",
    },
    {
      title: "Olshop Marketing Solutions",
      url: "/",
    },
    {
      title: "Kalkulator Indeks Masa Tubuh",
      url: "/",
    },
    {
      title: "Olshop Farma",
      url: "/",
    },
    {
      title: "Ramadan Ekstra Seru",
      url: "/",
    },
  ],
  items2: [
    {
      title: "Tagihan & Top Up",
      url: "/",
    },
    {
      title: "Tukar Tambah Handphone",
      url: "/",
    },
    {
      title: "Olshop COD",
      url: "/",
    },
  ],
};
