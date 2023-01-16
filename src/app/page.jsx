"use client";

import Link from "next/link";

import Button from "@mui/material/Button";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center h-[100%]">
      <h1 className="font-bold text-[40px] text-gray-900 ml-[20px] mr-[20px]">
        Authenticate project with Next.js 13
      </h1>

      <Button variant="outlined" color="primary" className="mt-[60px]">
        <Link href="/signin">Sign-in</Link>
      </Button>
    </main>
  );
};

export default Home;
