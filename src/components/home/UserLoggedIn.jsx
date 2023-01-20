"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

import Button from "@mui/material/Button";

const UserLoggedIn = ({ user }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center mt-5 text-xl">Hello {user.name} !</h2>

      <div className="flex gap-4">
        <Button variant="outlined" color="primary" className="mt-14">
          <Link href="/dashboard">Dashboard</Link>
        </Button>

        <Button variant="outlined" color="primary" className="mt-14">
          <Link href="/profile">Profile</Link>
        </Button>
      </div>

      <Button
        variant="outlined"
        color="secondary"
        className="mt-[60px]"
        onClick={signOut}
      >
        Sign-out
      </Button>
    </div>
  );
};

export default UserLoggedIn;
