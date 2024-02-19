"use client";

import { signOut } from "next-auth/react";

export default function Denied() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <h1>Access denied, you are not admin :(</h1>
        <button
          className="btn-black mt-4"
          onClick={() =>
            signOut({
              callbackUrl: "/auth/login",
            })
          }
        >
          Logout
        </button>
      </div>
    </div>
  );
}
