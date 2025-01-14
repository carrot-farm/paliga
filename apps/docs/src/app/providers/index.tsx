"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

/** ===== Components ===== */
function Providers({ children }: ProvidersProps) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

/** ===== Others ===== */

/** ===== Types ===== */
export type ProvidersProps = {
  children: ReactNode;
};

export default Providers;
