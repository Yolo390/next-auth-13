import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/lib/prisma/utils/prismaClient.js";
import { signIn } from "@/lib/prisma/utils/users.js";

const authHandler = async (req, res) => {
  return await NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        async authorize(credentials, req) {
          if (req.method === "POST") {
            try {
              const { user, error } = await signIn(credentials);

              if (error) throw new Error(error);

              return user;
            } catch (error) {
              return res.status(500).json({ error: error.message });
            }
          }

          res.setHeader("Allow", ["POST"]);
          res.status(405).end(`Method ${req.method} is not allowed.`);
        },
      }),
    ],
    adapter: PrismaAdapter(prisma),
    pages: {
      signIn: "/signin",
    },
    session: {
      strategy: "jwt", // JSON Web Token
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
};

export default authHandler;
