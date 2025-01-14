"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { ProgressTest1 } from "../../features/progress/components/ProgressTest1";

/** ===== Components ===== */
function ProgressPage({}: Props) {
  return (
    <Accordion
      selectionMode="multiple"
      defaultExpandedKeys={Array.from({ length: 3 }, (_, i) => String(i))}
      // defaultExpandedKeys={["1"]}
    >
      <AccordionItem title="기본 사용법" key="0">
        <ProgressTest1 />
      </AccordionItem>
    </Accordion>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type Props = {};

export default ProgressPage;
