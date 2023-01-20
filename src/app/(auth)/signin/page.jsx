import { redirect } from "next/navigation";
import { unstable_getServerSession } from "next-auth/next";

import SignInForm from "@/components/form/SignInForm.jsx";

const Signin = async () => {
  const session = await unstable_getServerSession();

  // If already connected, can not access to `/signin`.
  if (session?.user) redirect("/");

  return (
    <main className="flex flex-col justify-center items-center h-[100%]">
      <SignInForm />
    </main>
  );
};

export default Signin;
