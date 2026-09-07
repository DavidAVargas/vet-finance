import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CoursesLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  if (!user?.publicMetadata?.activated) {
    redirect("/onboarding");
  }

  return <>{children}</>;
}
