"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Dashboard</h1>
      {session && (
        <div>
          <h3>Welcome back, {session.user.name}</h3>
        </div>
      )}
    </div>
  );
}
