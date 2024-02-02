import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials) return null;

        const user = {
          id: credentials.id,
          email: credentials.email,
          name: credentials.username,
        } as User;

        return user;
      },
    }),
  ],
});
