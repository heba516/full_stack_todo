import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";
import React from "react";
import { ModeToggle } from "./ModeToggle";

const Nav = () => {
  return (
    <div className="w-3/4 pt-4 m-auto flex items-center justify-between">
      <ModeToggle />
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
};

export default Nav;
