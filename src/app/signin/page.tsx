import { redirect } from "next/navigation";
import { providerMap } from "@/lib/auth.config";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { env } from "@/env";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default async function SignInPage() {
  return (
    <div className="flex flex-col gap-2 h-screen items-center justify-center">
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            "use server";
            try {
              await signIn(provider.id, {
                redirectTo: "/",
              });
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                return redirect(
                  `${env.NEXT_PUBLIC_APP_URL}/signin?error=${error.type}`
                );
              }

              // Otherwise if a redirects happens NextJS can handle it
              // so you can just re-thrown the error and let NextJS handle it.
              // Docs:
              // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              throw error;
            }
          }}
        >
          <Button type="submit" className="flex gap-2 text-base">
            <Github />
            <span>Sign in with {provider.name}</span>
          </Button>
        </form>
      ))}
    </div>
  );
}
