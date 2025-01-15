"use client";

import { cn } from "@nextui-org/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

/** ===== Components ===== */
function SectionTitle({ hash, className, children }: SectionTitleProps) {
  return (
    <h2 id={hash} className={cn("text-lg font-semibold", className)}>
      {hash ? (
        <Link color="foreground" to={`#installation`} className="group [&>span]:opacity-0">
          {children}
          <span className="pl-1 transition-opacity group-hover:opacity-100">#</span>
        </Link>
      ) : (
        <>{children}</>
      )}
    </h2>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type SectionTitleProps = {
  /** class */
  className?: string;
  /** hash link */
  hash?: string;
  /** children */
  children?: ReactNode;
};

export default SectionTitle;
