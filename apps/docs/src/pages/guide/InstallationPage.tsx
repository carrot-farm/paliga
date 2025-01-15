"use client";

import { GUIDE_CODES } from "../../features/guilde/constants/guideCodes";
import { CodeBlock } from "../../shared/components/CodeBlock";
import { SectionTitle } from "../../shared/components/SectionTitle";

/** ===== Components ===== */
function InstallationPage({}: InstallationPageProps) {
  return (
    <>
      <SectionTitle hash="installation">Installation</SectionTitle>
      <CodeBlock>npm install @paliga/core</CodeBlock>

      <SectionTitle hash="usage" className="mt-14">
        Usage
      </SectionTitle>

      <CodeBlock>{GUIDE_CODES["usage_1"]}</CodeBlock>
      <p>or</p>
      <CodeBlock>{GUIDE_CODES["usage_2"]}</CodeBlock>
    </>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type InstallationPageProps = {};

export default InstallationPage;
