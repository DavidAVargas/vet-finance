import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const FOUNDER_EMAIL = "david.vargas024@gmail.com";

export default async function CoursesLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  const isFounder = email === FOUNDER_EMAIL;

  if (!isFounder && !user?.publicMetadata?.activated) {
    redirect("/onboarding");
  }

  return <>{children}</>;
}
