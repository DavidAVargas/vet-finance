import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminClient from "./AdminClient";

const ADMIN_EMAIL = "david.vargas024@gmail.com";

export default async function AdminPage() {
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  if (email !== ADMIN_EMAIL) redirect("/");

  const inviteCodes = await prisma.inviteCode.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <AdminClient inviteCodes={inviteCodes} />;
}
