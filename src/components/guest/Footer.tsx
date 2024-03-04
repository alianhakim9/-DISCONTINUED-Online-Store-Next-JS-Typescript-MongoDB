import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import ImageLoad from "./ImageLoad";
import { footerMenus } from "@/utils/menus";

const Footer = () => {
  return (
    <div className="bg-lime-950 p-20 h-min-[200px]">
      <div className="container text-white grid grid-cols-4">
        <div>
          <h1 className="uppercase text-2xl font-semibold">Online Store</h1>
          {footerMenus.items1.map((item, index) => (
            <Link
              href={item.url}
              key={index}
              className="text-sm block my-2 text-gray-400 hover:text-white"
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <h3 className="uppercase text-1xl font-semibold">Beli</h3>
            {footerMenus.items2.map((item, index) => (
              <Link
                href={item.url}
                key={index}
                className="text-sm block my-2 text-gray-400 hover:text-white"
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div>
            <h3 className="uppercase text-1xl font-semibold">Jual</h3>
            {footerMenus.items2.map((item, index) => (
              <Link
                href={item.url}
                key={index}
                className="text-sm block my-2 text-gray-400 hover:text-white"
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div>
            <h3 className="uppercase text-1xl font-semibold">
              Bantuan dan Panduan
            </h3>
            {footerMenus.items2.map((item, index) => (
              <Link
                href={item.url}
                key={index}
                className="text-sm block my-2 text-gray-400 hover:text-white"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <h3 className="uppercase text-1xl font-semibold">
              Keamanan dan Privasi
            </h3>
            {footerMenus.items2.map((item, index) => (
              <Link
                href={item.url}
                key={index}
                className="text-sm block my-2 text-gray-400 hover:text-white"
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div>
            <h3 className="uppercase text-1xl font-semibold">Ikuti Kami</h3>
            <div className="flex gap-2 items-center mt-3">
              <FaFacebook size={24} color="white" />
              <FaTwitter size={24} color="white" />
              <FaInstagram size={24} color="white" />
              <FaWhatsapp size={24} color="white" />
            </div>
          </div>
        </div>

        <div>
          <ImageLoad
            className="h-96 w-96"
            src="/images/footer-img.png"
            alt="footer-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
