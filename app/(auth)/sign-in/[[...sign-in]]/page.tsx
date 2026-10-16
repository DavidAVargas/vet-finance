import { SignIn } from "@clerk/nextjs";
import { cookies } from "next/headers";

/**
 * Members sign back in here. Only people who came through an invite link (or the admin) can
 * create a new account from this page: for everyone else, signing in with Google/Apple/GitHub
 * using an email we don't know does NOT create an account, and the "Sign up" link is hidden.
 */
export default async function SignInPage() {
  const jar = await cookies();
  const canSignUp = jar.has("vf-invite") || jar.has("vf-admin-gate");

  return (
    <SignIn
      transferable={canSignUp}
      appearance={canSignUp ? undefined : { elements: { footerAction: { display: "none" } } }}
    />
  );
}
