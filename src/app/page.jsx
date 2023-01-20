import { unstable_getServerSession } from "next-auth/next";
import clsx from "clsx";

import UserLoggedIn from "@/components/home/UserLoggedIn.jsx";
import UserLoggedOut from "@/components/home/UserLoggedOut.jsx";

const Home = async () => {
  const session = await unstable_getServerSession();

  return (
    <main className="flex flex-col items-center justify-center h-[100%]">
      <h1 className="font-bold text-3xl md:text-4xl text-center text-gray-900">
        Authentication project
      </h1>

      <h2
        className={clsx(
          "font-semibold text-2xl italic text-center",
          "mt-5 md:mt-3"
        )}
      >
        Next.js 13 and NextAuth.js
      </h2>

      {session && session?.user ? (
        <UserLoggedIn user={session?.user} />
      ) : (
        <UserLoggedOut />
      )}
    </main>
  );
};

export default Home;
