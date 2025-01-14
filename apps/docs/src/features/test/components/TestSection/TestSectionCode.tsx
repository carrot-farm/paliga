"use client";
import Prism from "prismjs";
import { useEffect } from "react";

/** ===== Components ===== */
function TestSectionCode({ language = "tsx", children }: TestSectionCodeProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre>
      <code className={`language-${language} fotn-xs!`}>{children}</code>
    </pre>
  );
}
TestSectionCode.prototype.displayName = "TestSectionCode";

/** ===== Others ===== */

/** ===== Types ===== */
export type TestSectionCodeProps = {
  /** 코드 내용 */
  children?: string;
  /** language */
  language?: "typescript" | "tsx" | "html" | "css";
};

export default TestSectionCode;
