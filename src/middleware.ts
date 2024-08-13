import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

export const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  // Your middleware logic here
});
