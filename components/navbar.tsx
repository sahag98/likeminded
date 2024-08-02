import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full fixed h-20 border-b p-3 flex items-center justify-between px-40">
      <h1>LikeMinded</h1>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Navbar;
