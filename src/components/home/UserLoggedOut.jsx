"use client";

import Link from "next/link";

import Button from "@mui/material/Button";

const UserLoggedOut = () => {
  return (
    <div className="flex gap-4">
      <Button variant="outlined" color="primary" className="mt-[60px]">
        <Link href="/signin">Login</Link>
      </Button>

      <Button variant="outlined" color="primary" className="mt-[60px]">
        <Link href="/signup">Register</Link>
      </Button>
    </div>
  );
};

export default UserLoggedOut;
