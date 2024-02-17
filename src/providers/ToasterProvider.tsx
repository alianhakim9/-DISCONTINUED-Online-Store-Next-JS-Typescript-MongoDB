"use client";

import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

const ToasterProvider = ({ children }: Props) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default ToasterProvider;
