import { redirect } from "next/navigation";

// The Code & Coffee invite lives at /join/cc. Keep this older link working.
export default function CodeAndCoffeeInviteRedirect() {
  redirect("/join/cc");
}
