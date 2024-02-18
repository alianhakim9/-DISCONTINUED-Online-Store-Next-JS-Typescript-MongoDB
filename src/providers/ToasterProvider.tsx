"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

interface Props {
  session: Session | null;
  children: React.ReactNode;
}

const ToasterProvider = ({ session, children }: Props) => {
  return (
    <SessionProvider session={session}>
      {children}
      <Toaster />
    </SessionProvider>
  );
};

export default ToasterProvider;
