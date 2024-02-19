"use client";

import { onSignOut } from "@/utils/helper";

export default function Denied() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <h1>Access denied, you are not admin :(</h1>
        <button className="btn-black mt-4" onClick={() => onSignOut()}>
          Logout
        </button>
      </div>
    </div>
  );
}
