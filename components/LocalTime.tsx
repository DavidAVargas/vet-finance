"use client";

import { useSyncExternalStore } from "react";

/** Formats a timestamp in the viewer's own time zone, rendered only in the browser. */
export function LocalTime({ iso, options }: { iso: string; options?: Intl.DateTimeFormatOptions }) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  if (!mounted) return null;
  return <>{new Date(iso).toLocaleString("en-US", options)}</>;
}
