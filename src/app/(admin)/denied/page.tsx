"use client";

import { Button } from "@/components/ui/button";
import { onSignOut } from "@/utils/helper";
import { useRouter } from "next/navigation";

export default function Denied() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <h1>Error 401, Access denied</h1>
        <Button
          onClick={() => {
            onSignOut("/");
          }}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
}
