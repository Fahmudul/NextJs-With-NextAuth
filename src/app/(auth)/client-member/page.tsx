"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user?.email}
      Client member page
    </div>
  );
};

export default Dashboard;
