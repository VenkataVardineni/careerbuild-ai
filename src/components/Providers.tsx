"use client";

import { ApplyModalProvider } from "./ApplyModalProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApplyModalProvider>{children}</ApplyModalProvider>;
}
