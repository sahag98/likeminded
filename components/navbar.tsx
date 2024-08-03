import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full fixed h-20 border-b p-3 flex items-center justify-between px-40">
      <Link className="font-bold text-lg" href={"/"}>
        LikeMinded
      </Link>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Navbar;
