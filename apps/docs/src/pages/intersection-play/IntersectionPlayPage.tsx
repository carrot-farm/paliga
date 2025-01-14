"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { IntersectionPlayTest1 } from "../../features/intersectionPlay/components/IntersectionPlayTest1";
import { IntersectionPlayTest2 } from "../../features/intersectionPlay/components/IntersectionPlayTest2";

/** ===== Components ===== */
function IntersectionPlayPage({}: Props) {
  return (
    <Accordion
      selectionMode="multiple"
      defaultExpandedKeys={Array.from({ length: 3 }, (_, i) => String(i))}
      // defaultExpandedKeys={["1"]}
    >
      <AccordionItem title="기본 사용법" key="0">
        <IntersectionPlayTest1 />
      </AccordionItem>

      <AccordionItem title="옵션" key="1">
        <IntersectionPlayTest2 />
      </AccordionItem>
    </Accordion>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type Props = {};

export default IntersectionPlayPage;
