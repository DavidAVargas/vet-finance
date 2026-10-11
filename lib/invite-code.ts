/** Random, hard-to-guess code without look-alike characters (no 0/O, 1/I/L). */
export function generateInviteCode(): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  const chars = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
  return `${chars.slice(0, 4)}-${chars.slice(4)}`;
}

/** Code & Coffee invites get the partner logo (matched on the label, e.g. "Code & Coffee · Oct 11"). */
export const isCodeAndCoffee = (label: string) => /code\s*(&|and)\s*coffee/i.test(label);
