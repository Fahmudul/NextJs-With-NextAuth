import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header>
      <nav className="flex justify-between items-center w-full px-10 py-4 bg-gray-500/50">
        <div>My site</div>
        <div className="flex gap-10">
          <Link href="/">Home</Link>
          <Link href="/create-user">Create User</Link>
          <Link href="/client-member">Client Member</Link>
          <Link href="/member">Member</Link>
          <Link href="/public">Public</Link>
          {session?.user ? (
            <button>Sign Out</button>
          ) : (
            <Link href="/sign-in">Sign In</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
