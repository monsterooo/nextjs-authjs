import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
  }

  interface Session {
    user?: User;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
  }
}
