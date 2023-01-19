"use client";

import { SessionProvider } from "next-auth/react";

const Session = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Session;
