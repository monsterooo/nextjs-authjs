import NextAuth, { NextAuthConfig } from "next-auth";
import type { Provider } from "next-auth/providers";
import GitHub from "next-auth/providers/github";

export const providers: Provider[] = [GitHub];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const authConfig = {
  providers,
  session: { strategy: "jwt" }, // Use JWT strategy for edge functions
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    jwt: ({ token, user, trigger }) => {
      // Save id to JWT
      if (user && user.id) {
        token.id = user.id;
      }
      // You can send welcome emails to new users
      if (trigger === "signUp" && user.email) {
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
