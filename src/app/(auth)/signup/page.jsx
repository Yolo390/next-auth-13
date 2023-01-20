import { redirect } from "next/navigation";
import { unstable_getServerSession } from "next-auth/next";

import SignUpForm from "@/components/form/SignUpForm.jsx";

const Signup = async () => {
  const session = await unstable_getServerSession();

  // If already connected, can not access to `/signin`.
  if (session?.user) redirect("/");

  return (
    <main className="flex flex-col justify-center items-center h-[100%]">
      <SignUpForm />
    </main>
  );
};

export default Signup;
