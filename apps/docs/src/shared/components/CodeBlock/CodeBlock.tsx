"use client";
import Prism from "prismjs";
import { useEffect } from "react";

/** ===== Components ===== */
function CodeBlock({ language = "tsx", children }: CodeBlockProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre>
      <code className={`language-${language} fotn-xs!`}>{children}</code>
    </pre>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type CodeBlockProps = {
  /** 코드 내용 */
  children?: string;
  /** language */
  language?: "typescript" | "tsx" | "html" | "css";
};

export default CodeBlock;
