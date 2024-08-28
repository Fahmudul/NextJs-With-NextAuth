"use client";
import React from "react";
// import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
const CreateUser = () => {
  const { data: session } = useSession();
 
  // const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      This is admin page
      <button className="btn ml-5" onClick={() => signOut({ callbackUrl: "/sign-in" })}>
        Sign out
      </button>
    </div>
  );
};

export default CreateUser;
